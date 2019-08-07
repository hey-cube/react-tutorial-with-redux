import { connect } from "react-redux";
import { clickSquare, jumpToPast } from "./actions";
import { Game, Board } from "./components";
import { calculateWinner } from "./utils";

/*
 * Game component
 */

const mapStateToPropsForGame = (state, ownProps) => {
  const { history, stepNumber, xIsNext } = state.game;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return { history, current, status };
};

const mapDispatchToPropsForGame = (dispatch, ownProps) => {
  return {
    jumpTo: step => {
      dispatch(jumpToPast(step));
    }
  };
};

export const GameContainer = connect(
  mapStateToPropsForGame,
  mapDispatchToPropsForGame
)(Game);

/*
 * Board component
 */

const mapStateToPropsForBoard = (state, ownProps) => {
  const { history, stepNumber } = state.game;
  const { squares } = history[stepNumber];

  return { squares };
};

const mapDispatchToPropsForBoard = (dispatch, ownProps) => {
  return {
    handleClick: index => {
      dispatch(clickSquare(index));
    }
  };
};

export const BoardContainer = connect(
  mapStateToPropsForBoard,
  mapDispatchToPropsForBoard
)(Board);
