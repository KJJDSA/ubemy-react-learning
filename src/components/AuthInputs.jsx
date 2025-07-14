import { useState } from 'react';
import Button from './Button'
import Input from './Input'

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
      <div >
        <Input
            invalid={emailNotValid}
            label='Email'
            type="email"
            onChange={(event) => handleInputChange('email', event.target.value)}/>
        <Input
            invalid={passwordNotValid} 
            label='Password'
            type="password"
            onChange={(event) =>
              handleInputChange('password', event.target.value)}
        />
      </div>
      <div className="actions">
        <Button type="button" >
          Create a new account
        </Button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
