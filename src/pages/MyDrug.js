import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "./MyDrug.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store";

const drugEx = [
    {
        num: 1,
        drugName: "타이레놀",
        date: "2000-02-20"
    },
    {
        num: 2,
        drugName: "감기약",
        date: "2000-02-20"
    },
    {
        num: 3,
        drugName: "기침약",
        date: "2000-02-20"
    }
]

function MyDrug() {

    let [drug, setDrug] = useState([]);
    let [plusdrug, setPlusDrug] = useState(false);
    let [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        drugName: '',
        date: '',
    });


    function getDrug() {
        axios.get('')
            .then((response) => {
                setDrug(response.data);
            })
            .catch((error) => {
                console.error('에러 발생:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handleDelete = (index) => {
        const updatedDrugs = [...drug];
        updatedDrugs.splice(index, 1);
        setDrug(updatedDrugs);
    };

    const handleClick = () => {
        // 입력된 내용을 list에 추가
        setDrug([...drug, inputs]);
        // 입력 내용 초기화
        setInputs({
            drugName: '',
            date: '',
        });
    };

    useEffect(() => {
        // getDrug();
        setDrug(drugEx);
        dispatch(login());
    }, []);

    return (
        <div className="main-block">
            <div className="main-block-title">
                <p>나의 약</p>
            </div>
            {
                modalShow
                    ? <Modal3 setModalShow={setModalShow} />
                    : null
            }
            <div className="main-donation">
                <Table className="mydrug" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>약품 명</th>
                            <th>복용 시기</th>
                            <th>섭취 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            drug.map((drug, i) => {
                                return (
                                    <Drug1
                                        num={i + 1}
                                        name={drug.drugName}
                                        date={drug.date}
                                        handleDelete={handleDelete}
                                    />
                                );
                            })
                        }
                    </tbody>
                </Table>
                <div>
                    <button onClick={() => setModalShow(true)}>섭취 완료!</button>
                    <span>&nbsp;&nbsp;</span>
                    <button onClick={() => setPlusDrug(!plusdrug)}>약 추가</button>
                    <div className={plusdrug ? "plusDrug" : 'disNone'}>
                        <input type="text" name="drugName" value={inputs.drugName} onChange={handleChange} placeholder="약품명"></input>
                        <input type="date" name="date" value={inputs.date} onChange={handleChange} placeholder="복용 시기"></input>
                        <button onClick={handleClick}>추가</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Drug1({ num, name, date, handleDelete }) {
    return (
        <tr>
            <td>{num}</td>
            <td>{name}</td>
            <td >{date}</td>
            <td><input type="checkbox"></input></td>
            <td><button onClick={() => handleDelete(num - 1)}>삭제</button></td>
        </tr>
    )
}

function Modal3({ setModalShow }) {
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
                        오늘의 목표 달성을 축하드립니다!
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

export default MyDrug;