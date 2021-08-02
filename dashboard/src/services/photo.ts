import axios from "axios";
import { GET_PHOTOS, UPLOAD_PHOTOS } from "src/constants/endpoints";
import { IImage } from "src/types/IImage";
import { getToken } from "src/services/auth";

const getAll = async () => axios.get<{ images: IImage[] }>(GET_PHOTOS);

const upload = async (data: FormData) =>
  axios.post<{ images: IImage[] }>(UPLOAD_PHOTOS, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getToken()}`,
    },
  });

export { getAll, upload };
