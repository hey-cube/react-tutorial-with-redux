import { connect } from "react-redux";
import { clickSquare, jumpToPast } from "./actions";
import { Game } from "./components";
import { calculateWinner } from "./utils";

const mapStateToProps = (state, ownProps) => {
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: index => {
      dispatch(clickSquare(index));
    },
    jumpTo: step => {
      dispatch(jumpToPast(step));
    }
  };
};

export const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
