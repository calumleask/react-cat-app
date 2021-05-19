
declare namespace TheCatApi {

  /**
   * POST /images/upload 
   * */

  type PostImagesUploadRequestBody = {
    file: any;
    sub_id: string;
  };

  /**
   * GET /images 
   * */

  type GetImagesRequestParams = {
    limit: number;
    page: number;
    order: "DESC" | "ASC" | "RANDOM";
    sub_id: string;
    breed_ids: string[]; // TODO unique
    category_ids: string[]; // TODO unique
    original_filename: string;
    format: "json" | "src";
    include_vote: boolean;
    include_favourite: boolean;
  };

  type GetImagesResponseData = {
    id: string;
    url: string;
    sub_id: string;
    created_At: string;
    original_filename: string;
    categories: any; // TODO
    breeds: any; // TODO
  }[];

  /**
   * POST /favourites 
   * */

  type PostFavouritesRequestBody = {
    image_id: string;
    sub_id: string;
  };

  type PostFavouritesResponseData = {
    message: string;
    id: string | number;
  }[];

  /**
   * DELETE /favourites/{favourite_id} 
   * */

  type DeleteFavouritesResponseData = {
    message: string;
  };

  /**
   * POST /votes/
   */

  type PostVotesRequestBody = {
    image_id: string;
    sub_id: string;
    value: number;
  };

  type PostVotesResponseData = {
    message: string;
    id: string | number;
  }[];

  /**
   * GET /votes/
   * */

  type GetVotesRequestParams = {
    sub_id: string;
    limit: number;
    page: number;
  };

  type GetVotesResponseData = {
    value: number;
    image_id: string;
    sub_id: string;
    created_At: string;
    id: string;
    country_code: string;
  }[];

}
