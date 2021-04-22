import React, { useState } from "react";
import classNames from "classnames";
import { useMutation } from "react-query";
import { uploadFile } from "../service/api";
import { FakeLoading } from "./Loading";

export const Upload = () => {
  const [file, setFile] = useState(null);
  const { isLoading, isError, isSuccess, mutate } = useMutation(
    (formData) => uploadFile(formData),
    {
      onSettled: () => {
        setFile(null);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("myFile", file);
      mutate(formData);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitButtonClassNames = classNames("nes-btn", {
    "is-primary": !!file,
    "is-disabled": !file,
  });

  return (
    <div>
      <div
        style={{ marginBottom: "20px" }}
        className="nes-container is-rounded"
      >
        <p>
          Please submit your file before the time is up! The file has to be less
          than 10kb but you knew that right?
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="nes-btn">
          <span>Select your file</span>
          <input type="file" name="myFile" onChange={handleChange} />
        </label>

        {!isLoading && (
          <button type="submit" className={submitButtonClassNames}>
            Upload
          </button>
        )}
      </form>
      <div>
        {isLoading && <FakeLoading />}
        {isError && (
          <span className="nes-text is-error">Something went wrong</span>
        )}
        {isSuccess && (
          <span className="nes-text is-success">You did it! Well done!</span>
        )}
      </div>
    </div>
  );
};
