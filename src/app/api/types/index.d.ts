
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
    include_vote: number;
    include_favourite: number;
  };

  type GetImagesResponseData = {
    id: string;
    url: string;
    sub_id: string;
    created_at: string;
    original_filename: string;
    categories: any; // TODO
    breeds: any; // TODO
  }[];

  /**
   * GET /favourites 
   * */

  type GetFavouritesRequestParams = {
    limit: number;
    page: number;
    sub_id: string;
  };

  type GetFavouritesResponseData = {
    id: string;
    user_id: string;
    image_id: string;
    sub_id: string;
    created_at: string;
    image: {
      id: string;
      url: string;
    }
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
  };

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
  };

  /**
   * GET /votes/
   * */

  type GetVotesRequestParams = {
    sub_id: string;
    limit: number;
    page: number;
  };

  type VoteValue = 0 | 1;

  type GetVotesResponseData = {
    value: VoteValue;
    image_id: string;
    sub_id: string;
    created_at: string;
    id: string;
    country_code: string;
  }[];

}

declare namespace App {

  type ImageCardData = {
    imageId: string;
    url: string;
    favourited: boolean;
    score: number;
  };

}
