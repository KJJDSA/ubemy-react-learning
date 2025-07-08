/* 시작을 어떻게 하는가? 
1. 레이아웃 보기. 
2. 몇개의 블록으로 이루어졌는가 확인하기. 
3. 첫번 째 블록(유저 인터페이스)부터 시작하기 */
import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"

function App() {
  // state 끌어올리기 (lifting state)
  /** Player GameBoard 둘 모두 현재 턴의 정보가 필요하다. 
   * 이것을 관리하는 state를 두 컴포넌트에 모두 만들지 말고 상위 컴포넌트인 App에서 관리한다.
  */
  const [activePlayer, setActivePlayer] = useState("X");

  // state 끌어올리기
  /** GamaBoard Log 둘 모두 현재 턴의 정보가 필요하다.
   * 경기를 기록하는 GameBoard의 state 또한 끌어올려 App 컴포넌트에서 관리한다.
  */
  const [gameTurns, setGameturns] = useState([])

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
    setGameturns(prevTurns => {
      let currnetPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currnetPlayer = "O";
      }
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
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </ol>

        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns}  
        />
      </div>

      <Log />
    </main>
  )
}

export default App
