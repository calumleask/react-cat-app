import AxiosStatic from "axios";

const axios = AxiosStatic.create({
  baseURL: "https://api.thecatapi.com/v1"
});

const headers = {
  "x-api-key": process.env.THE_CAT_API_KEY
};

export const uploadImage = async (file: any, sub_id?: string): Promise<void> => {
  const body: TheCatApi.PostImagesUploadRequestBody = { file, sub_id };
  return new Promise((resolve, reject) => {
    axios.post("/images/upload", body, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      console.log("POST /images/upload");
      console.log(response);
      resolve();
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

export const favouriteImage = async (image_id: string, sub_id?: string): Promise<TheCatApi.PostFavouritesResponseData> => {
  const body: TheCatApi.PostFavouritesRequestBody = { image_id, sub_id };
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

export const unfavouriteImage = async (favourite_id: string): Promise<TheCatApi.DeleteFavouritesResponseData> => {
  return new Promise((resolve, reject) => {
    axios.delete<TheCatApi.DeleteFavouritesResponseData>(`/favourites/${favourite_id}`, {
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

const vote = async (image_id: string, value: number, sub_id?: string, ): Promise<TheCatApi.PostVotesResponseData> => {
  const body: TheCatApi.PostVotesRequestBody = { image_id, sub_id, value };
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

export const voteUp = (image_id: string, sub_id?: string): Promise<TheCatApi.PostVotesResponseData> => vote(image_id, 1, sub_id);
export const voteDown = (image_id: string, sub_id?: string): Promise<TheCatApi.PostVotesResponseData> => vote(image_id, 0, sub_id);

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
