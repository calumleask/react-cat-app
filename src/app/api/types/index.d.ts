
declare namespace TheCatApi {

  type Image = {
    id: string;
    url: string;
    sub_id: string;
    created_at: string;
    original_filename: string;
    width: number;
    height: number;
  };

  /**
   * POST /images/upload 
   * */

  type PostImagesUploadResponseBody = Image;

  /**
   * GET /images 
   * */

  type GetImagesRequestParams = {
    limit: number;
    page: number;
    order: "DESC" | "ASC" | "RANDOM";
    sub_id: string;
    original_filename: string;
    format: "json" | "src";
    include_vote: 0 | 1;
    include_favourite: 0 | 1;
  };

  type GetImagesResponseData = Image[];

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
    vote?: TheCatApi.VoteValue;
    score: number;
    width: number;
    height: number;
  };

}
