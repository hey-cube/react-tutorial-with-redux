import { combineReducers } from "redux";
import { CLICK_SQUARE, JUMP_TO_PAST } from "./actions";
import { calculateWinner } from "./utils";

const initialState = {
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
};

function game(state = initialState, action) {
  switch (action.type) {
    case CLICK_SQUARE:
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[action.index]) {
        return state;
      }
      squares[action.index] = state.xIsNext ? "X" : "O";
      return {
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext
      };

    case JUMP_TO_PAST:
      return {
        ...state,
        stepNumber: action.step,
        xIsNext: action.step % 2 === 0
      };

    default:
      return state;
  }
}

export const app = combineReducers({ game });
