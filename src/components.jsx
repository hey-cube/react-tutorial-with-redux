import React, { useEffect } from "react";
import { BoardContainer, InformationContainer } from "./containers";

export function Information(props) {
  const { fetchInformation, ipAddress, country } = props;

  useEffect(() => {
    fetchInformation();
    // fetchInformation() は一回だけ実行できれば良い
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="information">
      <ul>
        <li>IPアドレス：{ipAddress}</li>
        <li>国籍：{country}</li>
      </ul>
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export function Board(props) {
  function renderSquare(i) {
    return (
      <Square value={props.squares[i]} onClick={() => props.handleClick(i)} />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export function Game(props) {
  const { history, status, jumpTo } = props;

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #` + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div>
      <InformationContainer />
      <div className="game">
        <div className="game-board">
          <BoardContainer />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}
