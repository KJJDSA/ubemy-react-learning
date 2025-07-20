import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";

import { CartContext } from "./store/CartContext.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  return (
    <>
      {/* 18버전 이하는 <CartContext.provider> */}
      {/** createContext 
       * 여러개의 컴포넌트를 랩핑하여 컨텍스트를 공유할 수 있다. 
       * drilling 으로 가장 아래의 컴포넌트까지 전달할 필요 없이 CartContext 내부라면 컨텍스트 값을 얼마든지 사용할 수 있다.
       * 관행으로 context 파일을 저장하는 디렉토리는 store로 하지만 강제성은 없다.
       */}
      <CartContext>
        <Header
          cart={shoppingCart}
          onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
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
      </CartContext>
    </>
  );
}

export default App;
