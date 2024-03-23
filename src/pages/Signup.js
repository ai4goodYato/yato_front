import React, { useState } from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
    apiKey: "AIzaSyBGCUFHlGXGyKUe5Th_yQdxDCgvNjEEFBg",
    authDomain: "yato-f7402.firebaseapp.com",
    projectId: "yato-f7402",
    storageBucket: "yato-f7402.appspot.com",
    messagingSenderId: "804087797017",
    appId: "1:804087797017:web:801e979dacda8e434ee188",
    measurementId: "G-DB5E2P3TS5"
  };

function SignupPage() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = () => {
        // 입력값 유효성 검사
        if (!email || !fullName || !password || !confirmPassword) {
            setError('모든 필드를 입력하세요.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 회원가입 요청 보내기
        setLoading(true);
        axios.post('/signup', { email, fullName, password })
            .then(response => {
                setLoading(false);
                if (response.data.success) {
                    alert('회원가입이 완료되었습니다.');
                    // 회원가입이 성공하면 다른 처리를 할 수 있음
                } else {
                    setError('회원가입에 실패했습니다. 다시 시도하세요.');
                }
            })
            .catch(error => {
                setLoading(false);
                console.error('회원가입 요청 중 오류 발생:', error);
                setError('회원가입 요청 중 오류가 발생했습니다.');
            });
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app); //변경

    const signUpWithEmail = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 회원가입 성공 시 추가적인 작업 수행
                const user = userCredential.user;
                console.log("회원가입 성공:", user.uid);
            })
            .catch((error) => {
                // 회원가입 실패 시 처리
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("회원가입 실패:", errorMessage);
            });
    };

    return (
        <div className='main-block main-block-login'>
            <div className="main-block-title">
                <p>회원가입</p>
            </div>
            <form className='main-block-body-login'>
                <div>
                    {/* <label htmlFor="email">이메일:</label> */}
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='이메일'
                    />
                </div>
                <div>
                    {/* <label htmlFor="fullName">이름:</label> */}
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder='이름'
                    />
                </div>
                <div>
                    {/* <label htmlFor="password">비밀번호:</label> */}
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='비밀번호'
                    />
                </div>
                <div>
                    {/* <label htmlFor="confirmPassword">비밀번호 확인:</label> */}
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='비밀번호 확인'
                    />
                </div>
                <button className="login-btn" type="button" onClick={signUpWithEmail} disabled={loading}>
                    {loading ? '가입 중...' : '가입'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default SignupPage;
