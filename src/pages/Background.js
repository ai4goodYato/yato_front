import { useState } from "react";
import "./Background.css";
import { CloseButton, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import Loading from "../components/Loading";

function Background() {

    let [imageSrc, setImageSrc] = useState('');
    let [loading, setLoading] = useState(false);

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
            axios.post('/medicine', {
                image: imageSrc
            })
                .then((response) => {
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
                        : <><label className="preview" htmlFor="medicineImg">사 진 추 가</label>
                            <input id="medicineImg" type="file" onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                            }} />
                        </>
                }
            </div>

        </div>
    )
}

function MainBlockRight({ postMedicine }) {
    return (
        <div className="main-block-right">
            <div>
                <Tabs
                    defaultActiveKey="home"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab className="tab-content" eventKey="home" title="약품정보">
                        <p>사진 등록 하고 제출 하면 정보가 제공됩니다 </p>
                    </Tab>
                    <Tab className="tab-content" eventKey="profile" title="복용방법">
                        <p>Tab content for profile</p>
                    </Tab>
                    <Tab className="tab-content" eventKey="longer-tab" title="주의사항">
                        <p>Tab content for longertab</p>
                    </Tab>
                </Tabs>
            </div>
            <button className="submit-btn" onClick={() => { postMedicine() }}>제 출</button>
        </div>
    )
}

export default Background;