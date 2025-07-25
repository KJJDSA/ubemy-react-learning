/* 시작을 어떻게 하는가? 
1. 레이아웃 보기. 
2. 몇개의 블록으로 이루어졌는가 확인하기. 
3. 첫번 째 블록(유저 인터페이스)부터 시작하기 */
import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combination"
import GameOver from "./components/GameOver"

function deriveActivePlayer(gameTurns) {
  let currnetPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currnetPlayer = "O";
  }

  return currnetPlayer;
}

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function App() {
  /** playerName을 끌어오지 못하는 대안: 최근 플레이어 이름을 저장하는 state를 만듭니다.*/
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2"
  });

  /** state 끌어올리기:
   * 
   * GamaBoard Log 둘 모두 현재 턴의 정보가 필요하다.
   * 경기를 기록하는 GameBoard의 state 또한 끌어올려 App 컴포넌트에서 관리한다.
  */
  const [gameTurns, setGameturns] = useState([])

  /** initialGameBoard 를 항상 깊은 복사를 해야하는 이유: 
   * 
   * 모든 데이터(로그, 게임보드, 턴, 승리자 등)가 gameTurns state 에서 파생되는 점 때문이다. 
   * 이 점을 활용하여 gameTurns 만 초기화하면 게임보드와 승리자도 초기화할 수 있도록 설계되었다. 
   * 이 때 리액트가 초기화하지 못하는 initialGameBoard를 직접 수정한 상태라면 gameTurns를 초기화해도 게임이 초기화되지 않는다.
   * 
   * 항상 깊은 복사를 한다면 이러한 고민을 할 필요도 없을 것이다. 불변성을 지키는 게 언제나 좋은 이유.
  */
  let gameBoard = [...initialGameBoard].map(row => [...row]); 
  for (const turn of gameTurns) { // 제어하는 상태의 수는 최소화하되 각 상태에서 가능한 많은 정보와 값을 파생시키는 것이 리액트의 의도
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player
  }


  let winner = null;
  // gameTurns 가 App에 존재한다면 activePlayer가 굳이 state로 존재할 필요가 없다.
  // state의는 최소한으로 유지하는 것이 좋다.
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol !== null && 
      firstSquareSymbol === secondSquareSymbol && 
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameturns(prevTurns => {
      const currnetPlayer = deriveActivePlayer(prevTurns);
      const updtatedTurns = [
        {square: {row:rowIndex, col: colIndex}, player: currnetPlayer}, 
        /** activePlayer를 그대로 사용하지 않는 이유: 
         * 두개의 state를 병합하는 행위가 되는데, activePlayer 의 상태가 변경된 후인지 등을 추가로 계산해야 한다. 
        */
        ...prevTurns
      ];

      return updtatedTurns;
    });
  }

  function handleRestart() {
    setGameturns([]);
    // gameBoard를 초기화하는 것은 의미가 없다. 
    // gameBoard는 gameTurns에서 파생되는 값이기 때문에, gameTurns가 초기화되면 자동으로 초기화된다.
    // gameBoard = initialGameBoard; 
    // activePlayer = "X"; // 이 또한 의미가 없다.
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayerNames((prevNames) => {
      return {
        ...prevNames,
        [playerSymbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onPlayerNameChange={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onPlayerNameChange={handlePlayerNameChange}/>
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}  
        />
      </div>

      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
