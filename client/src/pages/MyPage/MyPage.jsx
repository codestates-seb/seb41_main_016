import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutContainer from "../../components/LayoutContainer/LayoutContainer";
import ReservationContainer from "../../components/mypage/container/ReservationContainer";
import ReviewContainer from "../../components/mypage/container/ReviewContainer";
import Profile from "../../components/mypage/Profile/Profile";
import ReviewModal from "../../components/mypage/ReviewModal/ReviewModal";
import { MyLayout, Title, Wrap } from "./style";

export default function MyPage() {
    const { id } = useParams();
    const [isModal, setIsModal] = useState(false);
    const starLength = [0, 1, 2, 3, 4];
    const [inText, setInText] = useState();
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const [mypage, setMypage] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    const handleMypage = useCallback(async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const mypageList = await axios
                    .get(`/members/${id}`, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .then((res) => res.data);
                setMypage(mypageList);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [id]);

    const openModal = () => {
        setIsModal((prev) => !prev);
    };

    const handleBtnClick = (e) => {
        setInText(e.target.innerText);
        if (e.target.innerText === "후기 작성하기") {
            setIsModal((prev) => !prev);
        } else {
            setIsModal((prev) => !prev);
        }
    };

    const handleText = (e) => {
        setText(e.target.value);
    };

    const handleStarClick = (index) => {
        let clickStates = [...clicked];
        for (let i = 0; i < starLength.length; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };

    const handleReview = async () => {
        if (inText === "후기 작성하기") {
            let score = clicked.filter(Boolean).length;
            try {
                await axios.post("http://localhost:3001/review", {
                    content: text,
                    score: score,
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        handleMypage();
    }, [handleMypage]);

    if (loading) return <></>;
    return (
        <LayoutContainer>
            <div>
                <Title>마이페이지</Title>
                <MyLayout>
                    <Profile
                        email={mypage.email}
                        image={mypage.image}
                        name={mypage.name}
                    />
                    <Wrap>
                        <ReservationContainer handleBtnClick={handleBtnClick} />
                        <ReviewContainer
                            handleBtnClick={handleBtnClick}
                            starLength={starLength}
                        />
                    </Wrap>
                </MyLayout>
            </div>
            {isModal && (
                <ReviewModal
                    text={text}
                    handleText={handleText}
                    inText={inText}
                    openModal={openModal}
                    clicked={clicked}
                    handleStarClick={handleStarClick}
                    starLength={starLength}
                    handleReview={handleReview}
                />
            )}
        </LayoutContainer>
    );
}
