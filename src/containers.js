import { connect } from "react-redux";
import { Game, Board, Information } from "./components";
import { gameCreators, informationCreators } from "./mutations";
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
      dispatch(gameCreators.jumpToPast(step));
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
      dispatch(gameCreators.clickSquare(index));
    }
  };
};

export const BoardContainer = connect(
  mapStateToPropsForBoard,
  mapDispatchToPropsForBoard
)(Board);

/*
 * Information component
 */

const mapStateToPropsForInformation = (state, ownProps) => {
  return state.information;
};

const mapDispatchToPropsForInformation = (dispatch, ownProps) => {
  return {
    fetchInformation: () => {
      dispatch(informationCreators.fetchIPAddress());
    }
  };
};

export const InformationContainer = connect(
  mapStateToPropsForInformation,
  mapDispatchToPropsForInformation
)(Information);
