export default function Log({turns}) {
//{square: {row:rowIndex, col: colIndex}, player: currnetPlayer}, 
  return (
    <ol id="log">
      {turns.map((turn, index) => (
        <li className={index === 0 ? "highlighted" : ""} key={`${turn.square.row}-${turn.square.col}`}>
          플레이어 {turn.player}: ({turn.square.row + 1},{turn.square.col+ 1}) 선택
        </li>
      ))}
    </ol>
  )
}