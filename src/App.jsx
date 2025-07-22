import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";

import CartContextProvider from "./store/CartContext.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

function App() {
  return (
    <>
      {/* 18버전 이하는 <CartContext.provider> */}

      {/* 
      ⭐️ createContext (react context api)
      여러개의 컴포넌트를 랩핑하여 컨텍스트를 공유할 수 있다.
      drilling 으로 가장 아래의 컴포넌트까지 전달할 필요 없이 CartContext 내부라면 컨텍스트 값을 얼마든지 사용할 수 있다.
      관행으로 context 파일을 저장하는 디렉토리는 store로 하지만 강제성은 없다.
      */}

      {/* 
      ⭐️ context 파일만으로 상태관리하기
      state drilling 이 필요한 모든 상황에 context를 적용완료 헀다면, 
      해당 useState, handle function 등 까지 모두 context 파일로 옮겨버리는 것이 가능하다. 
      이렇게 하면 프로젝트의 root 컴포넌트에 코드가 쌓이는것을 방지할 수 있다. 
      단, context 파일로 옮긴 상태나 함수는 컨텍스트를 통해서만 접근할 수 있으므로, props 를 내려주는 등의 행위를 하는 state는 넣지 못한다.
      */}
      <CartContextProvider>
        <Header />
        <Shop>
          {/** ⭐️ 컴포넌트 합성
           * App -> Shop -> Product 로 이어지는 drilling 중 하나를 제거했다.
           * Product에서 drilling 되는 부분을 App으로 끌고 와 chilren 에서 미리 정의한다.
           *
           * 장점: 빠르게 적은 단계의 drilling 을 해소할 수 있다.
           * 단점: 끌어올리는 부모 컴포넌트(App)가 비대해진다. 끌어올리는 요소가 복잡할수록 수행하기 어렵다.
           */}
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </Shop>
      </CartContextProvider>
    </>
  );
}

export default App;
