import { useState } from "react";
import "./Background.css";
import { CloseButton, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function Background() {

    let [imageSrc, setImageSrc] = useState('');
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState(false)

    const handleClick = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setData(true)
        }, 3000); // 3초 후에 setLoading(false) 실행
    };

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
        });
    };

    const postMedicine = () => {
        setLoading(true);
        if (imageSrc) {
            axios.post('http://3.34.254.142:8000/medicine/', {
                image: imageSrc,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((response) => {
                    console.log(imageSrc)
                    console.log(response);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        } else {
            console.error('이미지가 없습니다.');
            setLoading(false);
        }
    };

    return (
        <>
            <div className="main-block main-block-main">
                <div className="main-block-title">
                    <p>사진 등록</p>
                </div>
                <div>
                    {
                        loading
                            ? <Loading />
                            : null
                    }
                    <div className="main-block-body">
                        <MainBlockLeft
                            imageSrc={imageSrc}
                            setImageSrc={setImageSrc}
                            encodeFileToBase64={encodeFileToBase64}
                        />
                        <div className="contour"> </div>
                        <MainBlockRight
                            data={data}
                            loading={loading}
                            handleClick={handleClick}
                            postMedicine={postMedicine} />
                    </div>
                </div>
            </div>
        </>
    )
}

function MainBlockLeft({ imageSrc, setImageSrc, encodeFileToBase64 }) {
    return (
        <div className="main-block-left">
            <div>
                {
                    imageSrc
                        ? <div className="preview-container"><img className="preview-img" src={imageSrc} alt="preview-img" />
                            <CloseButton className="preview-img-close" onClick={() => { setImageSrc("") }} /></div>
                        : <><label className="preview" htmlFor="medicineImg">
                            <FontAwesomeIcon icon={faImage} size="7x" />
                            <p>사 진 추 가</p></label>
                            <input id="medicineImg" type="file" onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                            }} />
                        </>
                }
            </div>

        </div>
    )
}

function MainBlockRight({ data, loading, postMedicine, handleClick }) {
    return (
        <div className="main-block-right">

            <div>
                {
                    data
                        ? <Tabs
                            defaultActiveKey="home"
                            id="fill-tab-example"
                            className="mb-3 tab-container"
                            fill
                        >
                            <Tab className="tab-content" eventKey="home" title="약품정보">
                                <MedicineData
                                    title="약품 정보"
                                    entpName="삼성제약"
                                    itemName="타이레놀"
                                    useMethodQesitm="식후 30분"
                                    depositMethodQesitm="1회 1정"
                                    atpnQesitm="물과 함께 복용"
                                />
                            </Tab>
                            <Tab className="tab-content" eventKey="profile" title="복용방법">
                                <p>Tab content for profile</p>
                            </Tab>
                            <Tab className="tab-content" eventKey="longer-tab" title="주의사항">
                                <p>Tab content for longertab</p>
                            </Tab>
                        </Tabs>
                        : BeforeUpload()
                }

            </div>
            <button className="submit-btn" onClick={() => { postMedicine() }}>제 출</button>
        </div>
    )
}

function MedicineData({ title, entpName, itemName, useMethodQesitm, depositMethodQesitm, atpnQesitm }) {
    return (
        <div className="medicine-data-body">
            <h1>title</h1>
            <p>제조사: {entpName}</p>
            <p>약 이름: {itemName}</p>
            <p>복용 방법: {useMethodQesitm}</p>
            <p>투여 방법: {depositMethodQesitm}</p>
            <p>주의 사항: {atpnQesitm}</p>
        </div>
    )
}

function BeforeUpload() {
    return (
        <div className="manual">
            <p>약품 사진을 업로드해주세요!</p>
            <p>약은 하나씩만 찍어서 올려주세요</p>
        </div>
    )
}

export default Background;