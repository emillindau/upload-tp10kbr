package controller

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func UploadFile(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 10<<10)
	// Parse multipart, max upload of 10kb
	r.ParseMultipartForm(10 << 10)

	file, handler, err := r.FormFile("myFile")
	if err != nil {
		fmt.Println("Error retrieving file")
		fmt.Println(err)
		// http.Error(w, err.Error(), http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]bool{"ok": false})
		return
	}

	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	// create temporary file
	tempFile, err := ioutil.TempFile("temp-uploads", "upload-*.js")
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()

	// read all of the contents to a byte array
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}

	// write byte arr to temp file
	tempFile.Write(fileBytes)

	// return that it was successful
	tempFile.Write(fileBytes)

	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}
