import { useState } from 'react';
import {styled} from 'styled-components'

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`
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
`

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      {/* styled components 를 사용해 하나의 태그 리터럴 템플릿을 생성하면, 그것에 대해 고유한 클래스를 부여하고 적용된 태그들에게 해당 클래스를 부여함   */}
      <ControlContainer >
        <p>
          <Label $invalid={emailNotValid}>Email</Label>
          <Input
            type="email"
            // style={{
            //   backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db",
            // }}
            $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p>
        <p>
          <Label $invalid={passwordNotValid}>Password</Label>
          <Input
            type="password"
            $invalid={passwordNotValid}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p>
      </ControlContainer>
      <div className="actions">
        <Button type="button" className="text-button">
          Create a new account
        </Button>
        <Button className='button' onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
