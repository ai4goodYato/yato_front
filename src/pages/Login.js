import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../server/fbase';
import { Button } from 'react-bootstrap';
// import Button from '../components/Button';

function LoginPage() {

    const [email, setEmail] = useState("")
    // 상태 변수 설정: 사용자 이름과 비밀번호
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }
    const handleEmailSignIn = () => {
        if (!email || !password) {
            setError('사용자 이름과 비밀번호를 모두 입력하세요.');
            return; // 입력값이 비어 있으면 함수를 여기서 종료
        }

        setLoading(true); // 요청 전 loading 상태를 true로 변경

        signInWithEmail(email, password);
    }
    const handleEmailSignUp = () => {
        // 이메일과 비밀번호를 사용하여 회원가입 시도
        signUpWithEmail(email, password).catch((errorMessage) => {
            setError(errorMessage);
        });
    }

    return (
        <div className='main-block main-block-login'>
            <div className="main-block-title">
                <p>로그인</p>
            </div>
            {isLoggedIn ? (
                <p>이미 로그인되었습니다.</p>
            ) : (
                <div className='main-block-body-login1'>
                    <form className='main-block-body-login'>
                        <div className='login-form'>
                            <div className='login-form1'>
                                {/* <FontAwesomeIcon icon={faUser} /> */}
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='로그인'
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='비밀번호'
                                />
                            </div>
                        </div>
                        <button className="google-login" onClick={handleGoogleSignIn}/>
                        <button className="login-btn" onClick={() => { handleEmailSignIn() }} children={"Email로 로그인"} disabled={loading}>{loading ? '로그인 중...' : 'Email로 로그인'}</button>
                        <button className="login-btn" type="button" onClick={() => navigate("/signup")}>회원가입</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
