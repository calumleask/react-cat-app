import reducerRegistry from "~/common/redux/reducers/ReducerRegistry";
import { createActionTypes, createReducer } from "~/common/redux/utils";

/*
 *  Initial State
 */

type VoteData = {
  apiRequestInFlight: boolean;
  confirmedValue?: TheCatApi.VoteValue;
  desiredValue: TheCatApi.VoteValue;
  voteId?: string;
};

type ImageVotes = {
  [subId: string]: VoteData
};

type VotesReducerState = {
  [imageId: string]: ImageVotes;
};

const initialState: VotesReducerState = {};

/*
 *  Action Types
 */

const reducerName = "votes";
const actionTypes = createActionTypes(reducerName, [
  "UPDATE_ALL_VOTES",
  "VOTE_OPTIMISITIC",
  "VOTE_ASYNC_COMPLETE",
  "ASYNC_BEGIN",
  "ASYNC_ERROR"
]);

/*
 *  Reducer
 */

const reducer = createReducer<VotesReducerState>(initialState, {
  [actionTypes.UPDATE_ALL_VOTES]: (_state, { payload }: UpdateAllVotesAction) => ({ ...payload.votes }),
  [actionTypes.VOTE_OPTIMISITIC]: (state, { payload }: VoteOptimisticAction) => {
    const imageUserVote: VoteData = state[payload.imageId] && state[payload.imageId][payload.subId]
    ? state[payload.imageId][payload.subId]
    : {
      apiRequestInFlight: false,
      desiredValue: payload.value,
    };
    const imageVotes: ImageVotes = {
      ...(state[payload.imageId]),
      [payload.subId]: {
        ...imageUserVote,
        desiredValue: payload.value
      }
    };
    return {
      ...state,
      [payload.imageId]: {
        ...imageVotes
      }
    };
  },
  [actionTypes.VOTE_ASYNC_COMPLETE]: (state, { payload }: VoteAsyncCompleteAction) => {
    const imageUserVote: VoteData = state[payload.imageId][payload.subId];
    const imageVotes: ImageVotes = {
      ...(state[payload.imageId]),
      [payload.subId]: {
        ...imageUserVote,
        apiRequestInFlight: false,
        confirmedValue: payload.value,
        voteId: payload.voteId
      }
    };

    return {
      ...state,
      [payload.imageId]: {
        ...imageVotes
      }
    };
  },
  [actionTypes.ASYNC_BEGIN]: (state, { payload }: VoteAsynStatusAction) => {
    const imageUserVote: VoteData = state[payload.imageId][payload.subId];
    const imageVotes: ImageVotes = {
      ...(state[payload.imageId]),
      [payload.subId]: {
        ...imageUserVote,
        apiRequestInFlight: true
      }
    };

    return {
      ...state,
      [payload.imageId]: {
        ...imageVotes
      }
    };
  },
  [actionTypes.ASYNC_ERROR]: (state, { payload }: VoteAsynStatusAction) => {
    const imageVotes: ImageVotes = {
      ...(state[payload.imageId]),
      [payload.subId]: {
        ...state[payload.imageId][payload.subId],
        desiredValue: state[payload.imageId][payload.subId].confirmedValue,
        apiRequestInFlight: false
      }
    };

    return {
      ...state,
      [payload.imageId]: {
        ...imageVotes
      }
    };
  }
});

reducerRegistry.register(reducerName, reducer);

/*
 *  Action Builders
 */

type UpdateAllVotesAction = ReduxAction<{
  votes: VotesReducerState;
}>;

export const buildActionUpdateAllVotes = (votes: TheCatApi.GetVotesResponseData): UpdateAllVotesAction => {
  const data: VotesReducerState = {};
  votes.forEach((vote) => {
    data[vote.image_id] = {
      ...(data[vote.image_id] || {}),
      [vote.sub_id]: {
        apiRequestInFlight: false,
        confirmedValue: vote.value,
        desiredValue: vote.value,
        voteId: vote.id
      }
    };
  });
  
  return {
    type: actionTypes.UPDATE_ALL_VOTES,
    payload: {
      votes: data
    }
  };
};

export type VoteOptimisticAction = ReduxAction<{
  imageId: string;
  subId: string;
  value: TheCatApi.VoteValue;
}>;

export const buildActionVoteOptimistic = (imageId: string, subId: string, value: TheCatApi.VoteValue): VoteOptimisticAction => ({
  type: actionTypes.VOTE_OPTIMISITIC,
  payload: { imageId, subId, value }
});

type VoteAsyncCompleteAction = ReduxAction<{
  imageId: string;
  subId: string;
  value: TheCatApi.VoteValue;
  voteId: string;
}>;

export const buildActionVoteAsyncComplete = (imageId: string, subId: string, voteId: string, value: TheCatApi.VoteValue): VoteAsyncCompleteAction => ({
  type: actionTypes.VOTE_ASYNC_COMPLETE,
  payload: { imageId, subId, value, voteId }
});

type VoteAsynStatusAction = ReduxAction<{
  imageId: string;
  subId: string;
}>;

export const buildActionAsyncBegin = (imageId: string, subId: string): VoteAsynStatusAction => ({
  type: actionTypes.ASYNC_BEGIN,
  payload: { imageId, subId }
});

export const buildActionAsyncError = (imageId: string, subId: string): VoteAsynStatusAction => ({
  type: actionTypes.ASYNC_ERROR,
  payload: { imageId, subId }
});

/*
 *  Selector
 */

const selectState = (state: AppState): VotesReducerState => state[reducerName];

export default {
  actionTypes,
  reducer,
  selectState
};
