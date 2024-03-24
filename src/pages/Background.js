import { useState } from "react";
import "./Background.css";
import { CloseButton, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function Background() {

    let [imageSrc, setImageSrc] = useState('');
    let [previewImg, setPreviewImg] = useState('');
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState(false);
    let [imgData, setImgData] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        encodeFileToBase64(file)
            .then(() => {
                postMedicine();
            })
            .catch(error => {
                console.error(error);
            });
    };
    function handleClick() {
        setData(false); // 버튼 클릭 시 데이터를 false로 설정
        setLoading(true); // 로딩 시작 (3초간

        // 3초 후에 setData를 true로 설정
        setTimeout(() => {
            setData(true);
            setLoading(false);
        }, 3000); // 3000 밀리초 = 3초
    }


    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                setPreviewImg(reader.result);
                resolve();
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const postMedicine = () => {
        setLoading(true);
        console.log(imageSrc);
        if (imageSrc) {
            const formData = new FormData();
            console.log('FormData:', formData);
            formData.append('medicine', imageSrc);
            console.log('FormData:', formData);
            axios.post('http://3.34.254.142:8000/medicine/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((response) => {
                    console.log(response);
                    setImgData(response.data);
                    setLoading(false);
                    setData(true);
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
                            previewImg={previewImg}
                            setPreviewImg={setPreviewImg}
                            encodeFileToBase64={encodeFileToBase64}
                        />
                        <div className="contour"> </div>
                        <MainBlockRight
                            data={data}
                            imgData={imgData}
                            handleClick={handleClick}
                            loading={loading}
                            postMedicine={postMedicine} />
                    </div>
                </div>
            </div>
        </>
    )
}

function MainBlockLeft({ imageSrc, previewImg, setPreviewImg, setImageSrc, encodeFileToBase64 }) {
    return (
        <div className="main-block-left">
            <div>
                {
                    previewImg
                        ? <div className="preview-container"><img className="preview-img" src={previewImg} alt="preview-img" />
                            <CloseButton className="preview-img-close" onClick={() => { setPreviewImg("") }} /></div>
                        : <><label className="preview" htmlFor="medicineImg">
                            <FontAwesomeIcon icon={faImage} size="7x" />
                            <p>사 진 추 가</p></label>
                            <input id="medicineImg" type="file" onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                                setImageSrc(e.target.files[0]);
                            }} />
                        </>
                }
            </div>

        </div>
    )
}

function MainBlockRight({ imgData, data, postMedicine, handleClick }) {
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
                                    entpName={imgData[0].entpName}
                                    itemName={imgData[0].itemName}
                                    ingredient={imgData[0].ingredient}
                                    useMethodQesitm={imgData[0].useMethodQesitm}
                                    depositMethodQesitm={imgData[0].depositMethodQesitm}
                                    atpnQesitm={imgData[0].atpnQesitm}
                                />
                            </Tab>
                            <Tab className="tab-content" eventKey="profile" title="복용방법">
                                <MedicineData
                                    title="복용 방법"
                                    entpName={imgData[0].entpName}
                                    itemName={imgData[0].itemName}
                                    ingredient={imgData[0].ingredient}
                                    useMethodQesitm={imgData[0].useMethodQesitm}
                                    depositMethodQesitm={imgData[0].depositMethodQesitm}
                                    atpnQesitm={imgData[0].atpnQesitm}
                                />
                            </Tab>
                            <Tab className="tab-content" eventKey="longer-tab" title="주의사항">
                                <MedicineData
                                    title="주의 사항"
                                    entpName={imgData[0].entpName}
                                    itemName={imgData[0].itemName}
                                    ingredient={imgData[0].ingredient}
                                    useMethodQesitm={imgData[0].useMethodQesitm}
                                    depositMethodQesitm={imgData[0].depositMethodQesitm}
                                    atpnQesitm={imgData[0].atpnQesitm}
                                />
                            </Tab>
                        </Tabs>
                        : <BeforeUpload />
                }
            </div>
            <button className="login-btn" onClick={() => { postMedicine() }}>제 출</button>
        </div>
    )
}

function MedicineData({ title, ingredient, entpName, itemName, useMethodQesitm, depositMethodQesitm, atpnQesitm }) {
    return (
        <div className="medicine-data-body">
            <h1>{title}</h1>
            {title === "약품 정보" ? (
                <>
                    <p>제조사: {entpName}</p>
                    <p>약 이름: {itemName}</p>
                    <p>성분: {ingredient}</p>
                </>
            ) : title === "복용 방법" ? (
                <>
                    <p>복용 방법:</p><p> {useMethodQesitm}</p>
                    <p>투여 방법:</p><p> {depositMethodQesitm}</p>
                </>
            ) : (
                <>
                    <p>주의사항:</p><p> {atpnQesitm}</p>
                </>
            )
            }
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