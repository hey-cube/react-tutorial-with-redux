import { createAggregate } from "redux-aggregate";
import { calculateWinner } from "./utils";

/*
 * mutations
 */

const gameMT = {
  clickSquare(state, index) {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return state;
    }
    squares[index] = state.xIsNext ? "X" : "O";
    return {
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    };
  },
  jumpToPast(state, step) {
    return {
      ...state,
      stepNumber: step,
      xIsNext: step % 2 === 0
    };
  }
};

const informationMT = {
  fetchIPAddress(state) {
    return state;
  },
  fetchIPAddressFulfilled(state, ipAddress) {
    return { ...state, ipAddress };
  },
  fetchCountryFulfilled(state, country) {
    return { ...state, country };
  }
};

/*
 * aggregates
 */

const gameAggregate = createAggregate(gameMT, "game/");
const informationAggregate = createAggregate(informationMT, "information/");

/*
 * actions
 */

// const gameTypes = gameAggregate.types;
export const gameCreators = gameAggregate.creators;

export const informationTypes = informationAggregate.types;
export const informationCreators = informationAggregate.creators;

/*
 * reducers
 */
export const gameReducer = gameAggregate.reducerFactory({
  history: [
    {
      squares: Array(9).fill(null)
    }
  ],
  stepNumber: 0,
  xIsNext: true
});

export const informationReducer = informationAggregate.reducerFactory({
  ipAddress: undefined,
  country: undefined
});
