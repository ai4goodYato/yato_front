import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import "./Header.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store";

function Header({ username, setUsername }) {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">YatoYato</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/donation">기부하기</Nav.Link>
            {
              !isLoggedIn
                ? <><Nav.Link href="/login">로그인</Nav.Link>
                  <Nav.Link href="/signup">회원가입</Nav.Link></>
                : <><Nav.Link href="/mypage">김동연</Nav.Link>
                  <Nav.Link href="/" onClick={() => handleLogout()}>로그아웃</Nav.Link></>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;