import { useState } from 'react';

export default function Player({initialName, symbol, isActive, onPlayerNameChange}) {
  const [isEditing, setIsEditing] = useState(false);
  /** 이 state는 끌어올리는 것을 권장하지 않습니다!
   * 
   * 해당 state는 각 Player 컴포넌트가 관리하는 고유 값이기 때문이며,
   * 이 state를 App컴포넌트에서 관리하게 된다면 매 타이핑 마다 재렌더링이 일어나게 됩니다. 
   * */  
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    /** 값을 즉각적으로 변경시키고 싶을 때는 함수를 넣어야 한다(업데이터함수)
     * 
     * 정확한 설명: 함수형은 state가 가진 가장 최근 변경된 값을 인수로 사용한다. 
     * set 함수에 일반 값을 넣으면 그 값은 가장 최근 변경된 값이 아니라 렌더링된 직후의 값(초기값)의 변경을 일으킨다. 
     * 이것이 인수로 함수를 넣을 경우 즉각 변경되는 것 처럼 보이는 이유이다. 
     */
    setIsEditing((prev) => !prev); 
    onPlayerNameChange(symbol, playerName);
  }
  
  // jsx 에서 분기하지 않고 변수로 지정한 뒤 if 문을 사용했다. 간결하고 이후 변경된 이름을 저장할 때 value 를 뽑아 사용할 때도 더 편리할 것 같다.
  let editablePlayerName = <span className="player-name">{playerName}</span>
  if (isEditing) {
    editablePlayerName = <input type="text" value={playerName} onChange={handleChange} />;
  }


  function handleChange(event) {
    setPlayerName(event.target.value);
    /** 입력값의 변화에 반응하고 변경된 값을 다시 입력값에 전달하는 방식을 양방향 바인딩이라 한다. 
     * 
     * 나는 handleEditClick 함수에서 input 태그의 값을 불러와 한번에 변경하는 것만 생각했는데, 
     * 이렇게 onChange 이벤트를 사용해서 양방향 바인딩을 하면 input변화와 동시에 값을 바꿀 수 있고, 
     * handleEditClick 함수가 가지는 책임도 분산할 수 있으며,
     * input 태그의 값을 접근하는 방법도 더 간단하고 직관적으로 수행된다. 
     */
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </span> 
    </li>
)
}