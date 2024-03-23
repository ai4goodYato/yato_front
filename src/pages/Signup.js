import React, { useState } from 'react';
import axios from 'axios';

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
                <button type="button" onClick={handleSignup} disabled={loading}>
                    {loading ? '가입 중...' : '가입'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}

export default SignupPage;
