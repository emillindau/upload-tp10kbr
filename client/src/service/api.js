import { post } from "axios";

const API_URL = "http://localhost:8081/api";

export const uploadFile = (formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  return post(`${API_URL}/upload`, formData, config);
};
