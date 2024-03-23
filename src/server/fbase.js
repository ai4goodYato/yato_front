import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGCUFHlGXGyKUe5Th_yQdxDCgvNjEEFBg",
  authDomain: "yato-f7402.firebaseapp.com",
  projectId: "yato-f7402",
  storageBucket: "yato-f7402.appspot.com",
  messagingSenderId: "804087797017",
  appId: "1:804087797017:web:801e979dacda8e434ee188",
  measurementId: "G-DB5E2P3TS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //변경

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}

export const signUpWithEmail = (email, password) => {
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

export const signInWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 로그인 성공 시 추가적인 작업 수행
      const user = userCredential.user;
      console.log("로그인 성공:", user.uid);
      useNavigate('/')
    })
    .catch((error) => {
      // 로그인 실패 시 처리
      switch (error.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          return "이메일 혹은 비밀번호가 일치하지 않습니다.";
        case "auth/email-already-in-use":
          return "이미 사용 중인 이메일입니다.";
        case "auth/weak-password":
          return "비밀번호는 6글자 이상이어야 합니다.";
        case "auth/network-request-failed":
          return "네트워크 연결에 실패 하였습니다.";
        case "auth/invalid-email":
          return "잘못된 이메일 형식입니다.";
        case "auth/internal-error":
          return "잘못된 요청입니다.";
        default:
          return "로그인에 실패 하였습니다.";
      }
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("로그인 실패:", errorMessage);
    });
};

export default {signInWithEmail, signUpWithEmail, signInWithGoogle}