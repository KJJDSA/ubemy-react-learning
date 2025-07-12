import {styled} from "styled-components"

// .button, .text-button 클래스 둘 다 button 태그를 사용하고 있으므로 합칠 수 있다.
// &가상선택자, 중첩기능을 한번 더 활용하면 각각의 클래스에 맞는 스타일을 한 styled component에 집약할 수 있다.
const Button = styled.button`
  &.button {
    padding: 1rem 2rem;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 0.25rem;
    color: #1f2937;
    background-color: #f0b322;
    border-radius: 6px;
    border: none;
    
    &:hover {
      background-color: #f0920e;
    }
  }

  &.text-button {
    color: #f0b322;
    border: none;

    &:hover {
      color: #f0920e;
    }
  }

  /* ... 아래에 해당하는 클래스를 추가하면 또 사용할 수 있을 것이다.  */
`

export default Button;