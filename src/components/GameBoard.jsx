import { useState } from "react"

const initialGameBoaurd = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoaurd)
  
function handleSelectSquare(rowIndex, colIndex) {
  setGameBoard((prevGameBoard) => {
    // 만약 state 가 객체나 배열이라면 완전히 복사해서 원본을 변경 불가능하도록 한 뒤 사용하는것이 좋다. 
    // 왜냐하면 객체를 직접 변경할 경우 객체의 자바스크립트 참조가 바로 변경되기 때문에, 리액트에서는 의도치 않은 변경이 될 수 있다. 
    // 이는 알수 없는 사이트이펙트를 발생시킬 수 있다. 
      const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])] // 내부배열까지 완전히 복사한다
      newGameBoard[rowIndex][colIndex] = activePlayerSymbol;
      return newGameBoard;
  });

  onSelectSquare();
}

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) =>  
            <li key={colIndex}>
              <button onClick={()=> handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>)}
          </ol> 
        </li>
      )}
    </ol>
  )
}