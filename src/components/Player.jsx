import { useState, useRef } from "react";

export default function Player() {
  const preName = useRef()
  const [stateName, setStateName] = useState('')
  function handleClick() {
    console.log(stateName)
    setStateName(preName.current.value)
    preName.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {stateName === '' ? 'unknown entity' : stateName}</h2>
      <p>
        <input ref={preName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
