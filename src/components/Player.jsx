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

// // 만약 useRef 없이 useState만 있다면 구현할 수 있을까? 
// // useRef를 일반 변수로 변경헀을 경우
// import { useState } from "react";

// export default function Player() {
//   let preName;
//   const [stateName, setStateName] = useState('')

//   function handleChange(e) {
//     preName = e.target.value;
//     console.log(hello)
//   }

//   function handleClick() {
//     setStateName(preName) // 이 시점에 닉네임이 잘 변경되지만, 한번 더 클릭할 경우 preName이 초기화 되어 닉네임이 사라진다. 
//     preName = "" // 이 코드는 작동하지 않는다. input 엘리먼트의 DOM값을 바꾸는게 아니기 때문이다. 
//   }
//   return (
//     <section id="player">
//       <h2>Welcome {stateName === '' ? 'unknown entity' : stateName}</h2>
//       <p>
//         <input type="text" onChange={(e) => handleChange(e)} />
//         {/* <input ref={preName} type="text" onChange={(e) => handleChange(e)} /> */} {/* 일반변수는 ref를 담을 수 없다. */}
//         <button onClick={handleClick}>Set Name</button>
//       </p>
//     </section>
//   );
// }
// // 결론: 변수로는 useRef와 같은 효 과를 낼 수 없다. 변수는 렌더마다 초기화되기 때문이다. 

// // 만약 useRef 없이 useState만 있다면 구현할 수 있을까? 
// // useRef를 useState 변경헀을 경우
// import { useState } from "react";

// export default function Player() {
//   const [preName, setPreName] = useState('');
//   const [stateName, setStateName] = useState('')

//   function handleChange(e) {
//     setPreName(e.target.value)
//   }

//   function handleClick() {
//     if(preName !== '') {
//       setStateName(preName) // 이 시점에 닉네임이 잘 변경된다.
//     }
//     setPreName('') // 두번째 클릭할 경우 비워진 preName 이 적용되어 닉네임이 사라진다.
//   }
//   return (
//     <section id="player">
//       <h2>Welcome {stateName === '' ? 'unknown entity' : stateName}</h2>
//       <p>
//         <input type="text" onChange={(e) => handleChange(e)} value={preName} />
//         <button onClick={handleClick}>Set Name</button>
//       </p>
//     </section>
//   );
// }
// // 결론: state로는 비슷한 효과는 낼 수 있다. 하지만 input을 참조해 값을 얻는것이 아니므로 input의 정보를 얻고자 한다면 얻을 수 없다. 
// // 그러므로 UI 렌더링에 영향을 주는 변경은 useState로, 그 외의 DOM 참조나 예외적인 직접 조작(play() 등)은 useRef로 한다