import { useContext } from "react";
import { CartContext } from "../store/CartContext";

export default function Product({ id, image, title, price, description }) {
  const CartCtx = useContext(CartContext);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          {/* drilling 없이도 CartContext의 value 속성에 바인딩 된 요소를 끌어와 쓸 수 있다.  */}
          <button onClick={() => CartCtx.addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
