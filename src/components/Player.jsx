import { useState } from 'react';

export default function Player({name, symbol}) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((prev) => !prev);
  }
  
  // jsx 에서 분기하지 않고 변수로 지정한 뒤 if 문을 사용했다. 간결하고 이후 변경된 이름을 저장할 때 value 를 뽑아 사용할 때도 더 편리할 것 같다.
  let playerName = <span className="player-name">{name}</span>
  if (isEditing) {
    playerName = <input type="text" defaultValue={name} />;
  }

  return (
    <li>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </span> 
    </li>
)
}