import AxiosStatic from "axios";

const axios = AxiosStatic.create({
  baseURL: "https://api.thecatapi.com/v1"
});

const headers = {
  "x-api-key": process.env.THE_CAT_API_KEY
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
    .catch(err => {
      reject(err);
    });
  });
};

const formatGetImagesRequestParams = (options: TheCatApi.GetImagesRequestParams): TheCatApi.GetImagesRequestParams => ({
  limit: options.limit,
  page: options.page,
  order: options.order,
  sub_id: options.sub_id,
  breed_ids: options.breed_ids,
  category_ids: options.category_ids,
  original_filename: options.original_filename,
  format: options.format,
  include_vote: options.include_vote,
  include_favourite: options.include_favourite
});

export const getImages = async (options: TheCatApi.GetImagesRequestParams): Promise<TheCatApi.GetImagesResponseData> => {
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
    .catch(err => {
      reject(err);
    });
  });
};

const formatGetFavouritesRequestParams = (options: TheCatApi.GetFavouritesRequestParams): TheCatApi.GetFavouritesRequestParams => ({
  limit: options.limit,
  page: options.page,
  sub_id: options.sub_id,
});

export const getFavourites = async (options: TheCatApi.GetFavouritesRequestParams): Promise<TheCatApi.GetFavouritesResponseData> => {
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
    .catch(err => {
      reject(err);
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
    .catch(err => {
      reject(err);
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
    .catch(err => {
      reject(err);
    });
  });
};

export const vote = async (imageId: string, value: TheCatApi.VoteValue, subId?: string, ): Promise<TheCatApi.PostVotesResponseData> => {
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
    .catch(err => {
      reject(err);
    });
  });
};

const formatGetVotesRequestParams = (options: TheCatApi.GetVotesRequestParams): TheCatApi.GetVotesRequestParams => ({
  sub_id: options.sub_id,
  limit: options.limit,
  page: options.page
});

export const getVotes = async (options: TheCatApi.GetVotesRequestParams): Promise<TheCatApi.GetVotesResponseData> => {
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
    .catch(err => {
      reject(err);
    });
  });
};
