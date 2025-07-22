import { use, useContext } from "react";
import { CartContext } from "../store/CartContext";

export default function Cart() {
  // context 를 가져오는 방법 2가지
  const { items, updateItemQuantity } = useContext(CartContext);
  // use 는 리액트 19이상부터 사용 가능하며 코드블록 내부에서도 사용이 가능하다(if, for 등등)
  // const {items} = use(CartContext)

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    /* 이전 구식 리액트에서 컨텍스트를 활용했던 방법 중 하나(참고만 하기) */
    <CartContext.Consumer>
      {(CartCtx) => {
        // Consumer 프로퍼티를 붙이고 아래 {}와 실행함수를 만들어주면, 매개변수로 바인딩된 컨텍스트 값이 들어감
        const CartCtxItems = CartCtx.items;
        return (
          <div id="cart">
            {CartCtxItems.length === 0 && <p>No items in cart!</p>}
            {CartCtxItems.length > 0 && (
              <ul id="cart-items">
                {CartCtxItems.map((item) => {
                  const formattedPrice = `$${item.price.toFixed(2)}`;

                  return (
                    <li key={item.id}>
                      <div>
                        <span>{item.name}</span>
                        <span> ({formattedPrice})</span>
                      </div>
                      <div className="cart-item-actions">
                        <button onClick={() => updateItemQuantity(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateItemQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <p id="cart-total-price">
              Cart Total: <strong>{formattedTotalPrice}</strong>
            </p>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
}
