import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  // 여기 정의된 곳에 값이 담기지는 않지만, 실제 컨텍스트와 구조가 같게 맞춰주는것을 권장함
  // 자동완성이 되기도 하고 컨텍스트의 상태를 알 수 있기 때문
  items: [],
  // 부모 컴포넌트의 핸들러 함수도 바인딩해서 쓸 수 있음. 명시해두면 자동완성됨
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer /* 구조분해할당 X */(
  state /* setState 의 prev값과 비슷하다. */,
  action /* 넘겨준 파라미터는 여기에 담긴다. */
) {
  if (action.type === "add") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload.id
      );
      updatedItems.push({
        id: action.payload.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }

  if (action.type === "update") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  /* 
  ⭐️ useReducer 는 이전값에 의존적인 set 함수를 자주 쓸 때 useState 대신 사용할 수 있는 리액트 기본 훅이다. 
  장바구니, toDo 리스트 등 이전 값을 참고하여 복잡한 로직을 통해 리스트 상태를 업데이트해야할 경우 사용할 수 있다. 
  */
  const [
    shoppingCartState /* state */,
    shoppingCartDispatch /* reducer 함수에게 요청을 보내는 디스패쳐 함수 */,
  ] = useReducer(
    shoppingCartReducer /* 첫번째 인수 reducer 함수. 어디에서든 작동하도록 가능한 순수함수로 구성해야한다. */,
    {
      items: [] /* 두번째 인수 shoppingCartState 의 초기값 */,
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "add" /* reducer함수에서 어떤 로직을 사용할지 타입을 정해준다. */,
      payload: { id } /* 상태가 아닌 외부인자가 있을 경우 함꼐 넘겨준다. */,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "update" /* reducer함수에서 어떤 로직을 사용할지 타입을 정해준다. */,
      payload: {
        productId,
        amount,
      } /* 상태가 아닌 외부인자가 있을 경우 함꼐 넘겨준다. */,
    });
  }

  const CartCtx = {
    // State의 일부만 바인딩 할 수 있다.
    items: shoppingCartState.items,
    // 핸들함수도 명시로 바인딩 가능
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={CartCtx}>{children}</CartContext.Provider>
  );
}
