import React, { useState } from 'react';
import { signInWithGoogle, signUpWithEmail, signInWithEmail } from './fbase';
import Button
 from './components/Button';
const App = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error, setError] = useState("")

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  }
  const handleEmailSignIn = () => {
    signInWithEmail(email, password);
  }
  const handleEmailSignUp = () => {
    // 이메일과 비밀번호를 사용하여 회원가입 시도
    signUpWithEmail(email, password).catch((errorMessage) => {
        setError(errorMessage);
      });
  }

  return (
    <>
      <h2>Google login</h2>
      <button onClick={handleGoogleSignIn}>Google로 회원가입</button>
      <h2> Email login</h2>
      <div>
        <input
          type="email"
          placeholder = "이메일"
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleEmailSignUp} size={"md"} children={"Email로 회원가입"}></Button>
      <Button onClick= {handleEmailSignIn} size={"md"} children={"Email로 로그인"} ></Button>
      <Button size={"lg"} children={"완료"}></Button>
    
      {error && <p style={{color : 'red'}}>{error}</p>}
    </>
  );
};
export default App;