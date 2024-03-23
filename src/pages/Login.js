import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css"
import { Await, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../server/fbase';
import { useDispatch } from 'react-redux';
import { login } from '../store';
import Loading from '../components/Loading';

function LoginPage({ setUsername }) {

    const [email, setEmail] = useState("")
    // 상태 변수 설정: 사용자 이름과 비밀번호
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [data, setData] = useState(true); // 데이터 상태 변수
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const handleGoogleSignIn = () => {
    //     signInWithGoogle();
    // }
    const handleEmailSignIn = () => {
        if (!email || !password) {
            setError('사용자 이름과 비밀번호를 모두 입력하세요.');
            return; // 입력값이 비어 있으면 함수를 여기서 종료
        }
        else {
            setLoading(true); // 요청 전 loading 상태를 true로 변경

            signInWithEmail(email, password);
        }
    }
    const handleEmailSignUp = () => {
        // 이메일과 비밀번호를 사용하여 회원가입 시도
        signUpWithEmail(email, password).catch((errorMessage) => {
            setError(errorMessage);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // 폼 제출 기본 동작(새로고침) 막기
        // 여기서 추가적인 작업 수행
    };

    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            Await(handleClick())
        } catch (error) {
            console.error("handleClick 함수에서 에러 발생:", error);
            // 에러를 처리하는 로직 추가
        }
    };

    function handleClick() {
        setData(false); // 버튼 클릭 시 데이터를 false로 설정
        setLoading(true); // 로딩 시작 (3초간

        // 3초 후에 setData를 true로 설정
        setTimeout(() => {
            dispatch(login());
            setData(true);
            setLoading(false);
            navigate("/");
        }, 2000); // 3000 밀리초 = 3초
    }

    return (
        <div className='main-block main-block-login'>
            {
                loading
                    ? <Loading />
                    : null
            }
            <div className="main-block-title">
                <p>로그인</p>
            </div>
            {isLoggedIn ? (
                <p>이미 로그인되었습니다.</p>
            ) : (
                <div className='main-block-body-login1'>
                    <form className='main-block-body-login' onSubmit={handleSubmit}>
                        <div className='login-form'>
                            <div className='login-form1'>
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
                        {/* <button className="google-login" onClick={handleGoogleSignIn} /> */}
                        {/* <button className="login-btn" onClick={handleEmailSignIn} children={"Email로 로그인"} disabled={loading}>{loading ? '로그인 중...' : 'Email로 로그인'}</button> */}
                        <button className="login-btn" onClick={() => handleLogin()} >로그인</button>
                        <button className="login-btn" type="button" onClick={() => navigate("/signup")}>회원가입</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
