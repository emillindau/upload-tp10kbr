package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/emillindau/upload-tp10kbr/server/controller"
	"github.com/gorilla/mux"
)

type App struct {
	Port string
}

type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// prepend the path with the path to the static dir
	path = filepath.Join(h.staticPath, path)

	// check if a file exists at the given path
	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		// file does not exists, serve index.html
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// otherwise, serve the static dir
	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func (a *App) Start() {
	r := mux.NewRouter()
	r.HandleFunc("/api/upload", controller.UploadFile).Methods("POST")

	spa := spaHandler{staticPath: "../client/build", indexPath: "index.html"}
	r.PathPrefix("/").Handler(spa)

	addr := fmt.Sprintf(":%s", a.Port)
	log.Printf("Starting on %s", addr)
	log.Fatal(http.ListenAndServe(addr, r))
}

func main() {
	server := App{
		Port: "8081",
	}
	server.Start()
}
