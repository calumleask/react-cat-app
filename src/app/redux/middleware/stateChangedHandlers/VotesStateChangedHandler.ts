import onStateChange, { OnStateChangeHandler } from "~/common/redux/middleware/OnStateChange";
import { ReduxThunkDispatch } from "../../types";

import votesReducer, { VoteOptimisticAction } from "../../reducers/VotesReducer";
import { selectVotes } from "../../selectors";
import { voteUpImageAsyncAction, voteDownImageAsyncAction } from "../../actions";

const VotesStateChangedHandler: OnStateChangeHandler<ReduxThunkDispatch> = (_prevState, nextState, action, dispatch) => {

  switch (action.type) {

    case votesReducer.actionTypes.VOTE_OPTIMISITIC:
    case votesReducer.actionTypes.VOTE_ASYNC_COMPLETE: {
      const { payload } = action as VoteOptimisticAction;
      const { imageId, subId } = payload;
      const vote = selectVotes(nextState)[imageId][subId];
      if (!vote.apiRequestInFlight && vote.desiredValue !== vote.confirmedValue) {
        if (vote.desiredValue === 1) {
          dispatch(voteUpImageAsyncAction(imageId));
        }
        else {
          dispatch(voteDownImageAsyncAction(imageId));
        }
      }
      break;
    }

    default:
      break;
  }
};

export default onStateChange(VotesStateChangedHandler);
