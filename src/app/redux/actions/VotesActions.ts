import { ReduxThunkAction } from "../types";

import {
  buildActionUpdateAllVotes,
  buildActionVoteOptimistic,
  buildActionVoteAsyncComplete,
  buildActionAsyncBegin,
  buildActionAsyncError
} from "../reducers/VotesReducer";
import { selectUserSubId } from "../selectors";

import * as theCatApi from "~/app/api";

export const fetchVotesAction = (): ReduxThunkAction => (dispatch): void => {
  theCatApi.getVotes()
  .then((votes) => {
    dispatch(buildActionUpdateAllVotes(votes));
  })
  .catch((_errMessage) => {
    // console.log(_errMessage);
    // TODO: show error
  });
};

const voteImageAction = (imageId: string, value: TheCatApi.VoteValue): ReduxThunkAction => (dispatch, getState): void => {
  const subId = selectUserSubId(getState());
  dispatch(buildActionVoteOptimistic(imageId, subId, value));
};

export const voteUpImageAction = (imageId: string): ReduxThunkAction => voteImageAction(imageId, 1);

export const voteDownImageAction = (imageId: string): ReduxThunkAction => voteImageAction(imageId, 0);

const voteImageAsyncApiAction = (imageId: string, value: TheCatApi.VoteValue): ReduxThunkAction => (dispatch, getState): void => {
  const subId = selectUserSubId(getState());
  dispatch(buildActionAsyncBegin(imageId, subId));
  theCatApi.vote(imageId, value, subId)
  .then((response) => {
    console.log(response.message);
    const voteId = typeof response.id === "number" ? response.id.toString() : response.id;
    dispatch(buildActionVoteAsyncComplete(imageId, subId, voteId, value));
  })
  .catch((_errMessage) => {
    // console.log(_errMessage);
    // TODO: show error
    dispatch(buildActionAsyncError(imageId, subId));
  });
};

export const voteUpImageAsyncAction = (imageId: string): ReduxThunkAction => (
  voteImageAsyncApiAction(imageId, 1)
);

export const voteDownImageAsyncAction = (imageId: string): ReduxThunkAction => (
  voteImageAsyncApiAction(imageId, 0)
);
