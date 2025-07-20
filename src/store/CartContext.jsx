import { createContext } from "react";

export const CartContext = createContext({
  // 여기 정의된 곳에 값이 담기지는 않지만, 실제 컨텍스트와 구조가 같게 맞춰주는것을 권장함
  // 자동완성이 되기도 하고 컨텍스트의 상태를 알 수 있기 때문
  items: [],
  // 부모 컴포넌트의 핸들러 함수도 바인딩해서 쓸 수 있음. 명시해두면 자동완성됨
  addItemToCart: () => {},
});
