import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";

import CartContextProvider from "./store/CartContext.jsx";

function App() {
  return (
    <>
      {/* 18버전 이하는 <CartContext.provider> */}
      {/** ⭐️ createContext (react context api)
       * 여러개의 컴포넌트를 랩핑하여 컨텍스트를 공유할 수 있다.
       * drilling 으로 가장 아래의 컴포넌트까지 전달할 필요 없이 CartContext 내부라면 컨텍스트 값을 얼마든지 사용할 수 있다.
       * 관행으로 context 파일을 저장하는 디렉토리는 store로 하지만 강제성은 없다.
       */}

      {/* !!! CartContextProvider에 state 및 handle 함수를 모두 넣고 context에서 제공하도록 했다. */}
      {/* 하지만 context에서 제공한 state를 식별하지 못한다.  */}
      <CartContextProvider>
        <Header
          cartQuantity={
            /* drilling 을 위해 cart 자체를 보낼 필요가 없으므로 length만 보낸다. */
            shoppingCart.items.length
          }
        />
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
              <Product {...product} onAddToCart={handleAddItemToCart} />
            </li>
          ))}
        </Shop>
      </CartContextProvider>
    </>
  );
}

export default App;
