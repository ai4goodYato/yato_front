import { useEffect, useState } from "react";
import "./Donation.css";
import { useDispatch } from "react-redux";
import { login } from "../store";
import { Button, Modal } from "react-bootstrap";

function Donation() {
    const [donationTime, setDonationTime] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(login());
    }
        , []);

    return (
        <div className="main-block">
            <div className="main-block-title">
                <p>기부하기</p>
            </div>
            <div className="main-donation">
                <div>
                    <button onClick={() => setDonationTime(5)}>4~6일차</button>
                    <span>&nbsp;</span>
                    <button onClick={() => setDonationTime(10)}>7~9일차</button>
                    <span>&nbsp;</span>
                    <button onClick={() => setDonationTime(15)}>10~15일차</button>
                </div>
                {
                    modalShow
                        ? <Modal2
                            setModalShow={setModalShow} />
                        : null
                }
                <div className={`main-donation-img ${donationTime < 5 ? 'img1' : donationTime < 10 ? 'img2' : donationTime < 15 ? 'img3' : 'img4'}`}></div>
                <button className={donationTime < 15 ? "disNone" : ""} onClick={() => setModalShow(!modalShow)}>기부하기</button>
            </div>
        </div>
    );
}

function Modal2({ setModalShow }) {
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'absolute' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>축하합니다!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        당신의 목표 달성으로 인해,<br />
                        야토야토는 기쁜 마음으로 약물 부작용으로 고통받는 <br />
                        사람들에게 1만원을 기부할 수 있게 되었습니다.<br />
                        다음 목표도 달성 부탁드립니다!<br />
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={() => setModalShow(false)}>안하기</Button> */}
                    <Button variant="primary" onClick={() => setModalShow(false)}>확인</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}
export default Donation;