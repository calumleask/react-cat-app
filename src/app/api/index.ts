import AxiosStatic, { AxiosError } from "axios";

const axios = AxiosStatic.create({
  baseURL: "https://api.thecatapi.com/v1"
});

const headers = {
  "x-api-key": process.env.THE_CAT_API_KEY
};

const getErrorMessage = (err: AxiosError): string => {
  try {
    const message = err.response.data.message;
    return message;
  }
  catch (e) {
    return err.message;
  }
};

export const uploadImage = async (file: File): Promise<TheCatApi.PostImagesUploadResponseBody> => {
  const formData = new FormData();
  formData.append("file", file);
  return new Promise((resolve, reject) => {
    axios.post<TheCatApi.PostImagesUploadResponseBody>("/images/upload", formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      console.log("POST /images/upload");
      console.log(response);
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      reject(getErrorMessage(err));
    });
  });
};

const formatGetImagesRequestParams = (options: Partial<TheCatApi.GetImagesRequestParams>): TheCatApi.GetImagesRequestParams => ({
  sub_id: "sub_id" in options ? options.sub_id : "",
  limit: "limit" in options ? options.limit : 100,
  page: "page" in options ? options.page : 0,
  order: "order" in options ? options.order : "DESC",
  original_filename: "original_filename" in options ? options.original_filename : "",
  format: "format" in options ? options.format : "json",
  include_vote: "include_vote" in options ? options.include_vote : 0,
  include_favourite: "include_favourite" in options ? options.include_favourite : 0
});

export const getImages = async (options: Partial<TheCatApi.GetImagesRequestParams> = {}): Promise<TheCatApi.GetImagesResponseData> => {
  return new Promise((resolve, reject) => {
    axios.get<TheCatApi.GetImagesResponseData>("/images", {
      headers,
      params: formatGetImagesRequestParams(options)
    })
    .then((response) => {
      console.log("GET /images");
      console.log(response);
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      reject(getErrorMessage(err));
    });
  });
};

const formatGetFavouritesRequestParams = (options: Partial<TheCatApi.GetFavouritesRequestParams>): TheCatApi.GetFavouritesRequestParams => ({
  sub_id: "sub_id" in options ? options.sub_id : "",
  limit: "limit" in options ? options.limit : 1000,
  page: "page" in options ? options.page : 0
});

export const getFavourites = async (options: Partial<TheCatApi.GetFavouritesRequestParams> = {}): Promise<TheCatApi.GetFavouritesResponseData> => {
  return new Promise((resolve, reject) => {
    axios.get<TheCatApi.GetFavouritesResponseData>("/favourites", {
      headers,
      params: formatGetFavouritesRequestParams(options)
    })
    .then((response) => {
      console.log("GET /favourites");
      console.log(response);
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      reject(getErrorMessage(err));
    });
  });
};

export const favouriteImage = async (imageId: string, subId?: string): Promise<TheCatApi.PostFavouritesResponseData> => {
  const body: TheCatApi.PostFavouritesRequestBody = { image_id: imageId, sub_id: subId };
  return new Promise((resolve, reject) => {
    axios.post<TheCatApi.PostFavouritesResponseData>("/favourites", body, {
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log("POST /favourites");
      console.log(response);
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      reject(getErrorMessage(err));
    });
  });
};

export const unfavouriteImage = async (favouriteId: string): Promise<TheCatApi.DeleteFavouritesResponseData> => {
  return new Promise((resolve, reject) => {
    axios.delete<TheCatApi.DeleteFavouritesResponseData>(`/favourites/${favouriteId}`, {
      headers
    })
    .then((response) => {
      console.log("DELETE /favourites");
      console.log(response);
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      reject(getErrorMessage(err));
    });
  });
};

export const vote = async (imageId: string, value: TheCatApi.VoteValue, subId: string, ): Promise<TheCatApi.PostVotesResponseData> => {
  const body: TheCatApi.PostVotesRequestBody = { image_id: imageId, sub_id: subId, value };
  return new Promise((resolve, reject) => {
    axios.post<TheCatApi.PostVotesResponseData>("/votes", body, {
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log("POST /votes");
      console.log(response);
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      reject(getErrorMessage(err));
    });
  });
};

const formatGetVotesRequestParams = (options: Partial<TheCatApi.GetVotesRequestParams>): TheCatApi.GetVotesRequestParams => ({
  sub_id: "sub_id" in options ? options.sub_id : "",
  limit: "limit" in options ? options.limit : 1000,
  page: "page" in options ? options.page : 0
});

export const getVotes = async (options: Partial<TheCatApi.GetVotesRequestParams> = {}): Promise<TheCatApi.GetVotesResponseData> => {
  return new Promise((resolve, reject) => {
    axios.get<TheCatApi.GetVotesResponseData>("/votes", {
      headers,
      params: formatGetVotesRequestParams(options)
    })
    .then((response) => {
      console.log("GET /votes");
      console.log(response);
      resolve(response.data);
    })
    .catch((err: AxiosError) => {
      reject(getErrorMessage(err));
    });
  });
};
