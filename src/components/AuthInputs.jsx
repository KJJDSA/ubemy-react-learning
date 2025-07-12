import { useState } from 'react';
import {styled} from 'styled-components'
import Button from "./Button.jsx"
import CustomInput from "./Input.jsx"

/* 컴포넌트를 감싸는 래퍼 styled component. 이 파일 외에 쓰일 일이 없으므로 따로 파일로 빼는것은 불필요한 작업이다. 
하지만 input, button 등은 다른 곳에서도 재사용이 가능하므로 파일로 빼둘 수 있다. */
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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
    <div id="auth-inputs" className={"bg-[red]"}>
      {/* styled components 를 사용해 하나의 태그 리터럴 템플릿을 생성하면, 그것에 대해 고유한 클래스를 부여하고 적용된 태그들에게 해당 클래스를 부여함   */}
      <ControlContainer >
        <CustomInput 
          label={"Email"}
          invalid={emailNotValid}
          type="email"
          onChange={(event) => handleInputChange('email', event.target.value)}
        />
        <CustomInput 
          label={"Password"}
          invalid={passwordNotValid}
          type="password"
          onChange={(event) => handleInputChange('password', event.target.value)}
        />
        {/* <p>
          <Label $invalid={emailNotValid}>Email</Label>
          <Input
            type="email"
            // style={{
            //   backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db",
            // }}
            $invalid={emailNotValid}
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
        </p> */}
        {/* <p>
          <Label $invalid={passwordNotValid}>Password</Label>
          <Input
            type="password"
            $invalid={passwordNotValid}
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </p> */}
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
