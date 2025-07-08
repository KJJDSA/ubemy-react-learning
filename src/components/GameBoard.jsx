const initialGameBoaurd = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
export default function GameBoard({onSelectSquare, turns}) {
  // Logs에 턴 정보를 전달하기 위해서 상황을 기록하는 gameBoard state를 끌어올린다. 
  // GameBoard 는 turns prop으로 보드의 진행상황을 그리기만 한다. 

  let gameBoard = initialGameBoaurd; 

  for (const turn of turns) { // 제어하는 상태의 수는 최소화하되 각 상태에서 가능한 많은 정보와 값을 파생시키는 것이 리액트의 의도
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) =>  
            <li key={colIndex}>
              <button onClick={()=> onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol}>
                {playerSymbol}
              </button>
              </li>)}
          </ol> 
        </li>
      )}
    </ol>
  )
}