import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
    // 상태 변수 설정: 사용자 이름과 비밀번호
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 로그인 함수: 사용자 이름과 비밀번호 확인
    const handleLogin = () => {
        // 입력값이 비어 있는지 확인
        if (!username || !password) {
            setError('사용자 이름과 비밀번호를 모두 입력하세요.');
            return; // 입력값이 비어 있으면 함수를 여기서 종료
        }

        setLoading(true); // 요청 전 loading 상태를 true로 변경

        // Axios를 사용하여 /login 엔드포인트로 POST 요청을 보냄
        axios.post('/login', { username, password })
            .then(response => {
                setLoading(false); // 요청 완료 후 loading 상태를 false로 변경
                if (response.data.success) {
                    setIsLoggedIn(true);
                    alert('로그인 성공!');
                } else {
                    alert('로그인 실패. 사용자 이름 또는 비밀번호를 확인하세요.');
                }
            })
            .catch(error => {
                setLoading(false); // 요청 완료 후 loading 상태를 false로 변경
                console.error('로그인 요청 중 오류 발생:', error);
                alert('로그인 요청 중 오류가 발생했습니다.');
            });
    };

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
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                        <button className="login-btn" type="button" onClick={handleLogin} disabled={loading}>
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginPage;
