import {styled} from "styled-components"

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({$invalid}) => $invalid ? '#f87171' : '#6b7280'};/* 해당 styled-component 의 props 를 받아와 동적으로 사용할 수 있다. */
`
/* styled component 에서 속성(prop)을 지정할 때, 내장된 속성을 지정하지 않도록 주의한다. invaild 는 내장된 속성이므로 변경이 필요 */
/* styled component에서만 사용할 속성이라면 일반적으로 앞에 $를 붙여주는 것이 관례이다.  */

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({$invalid}) => $invalid ? '#fed2d2' : '#d1d5db'};
  color: ${({$invalid}) => $invalid ? '#ef4444' : '#374151'};
  border: 1px solid ${({$invalid}) => $invalid ? '#f73f3f': 'transparent'}; /* border-color 를 따로만드는 대신 border에 넣으면 편하다 */
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

export default function CustomInput({
  label, // 라벨에 나올 텍스트
  invalid, // Label, Input 에서 받는 속성. 필수
  ...props // Input이 받는 나머지 속성들(onChange등)
}) {
  return (
    <p>
      {/* 구분을 위해 $를 붙이면서 생기는 이질감도 이렇게 반환하면 숨길 수 있다. */}
      {/* Label, Input은 label, input html 태그를 기반으로 만들어지기 떄문에 invalid등 내장 속성 충돌에 민감하지만, CustomInput은 invalid 그대로 사용해도 문제없기 때문. */}
      <Label $invalid={invalid}>{label}</Label> 
      <Input $invalid={invalid} {...props}/> {/* 이곳에 각종 리액트 속성이 들어간다. */}
    </p>
  )
}