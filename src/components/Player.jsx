import { useState } from 'react';

export default function Player({name, symbol}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span>}
        {isEditing && <input type="text" defaultValue={name}/>}
        <span className="player-symbol">{symbol}</span>
        <button onClick={() => setIsEditing((prev) => !prev)}>{isEditing ? "Save" : "Edit"}</button>
      </span> 
    </li>
)
}