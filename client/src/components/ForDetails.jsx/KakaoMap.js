import React, { useEffect } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
    width: 100%;
    height: 400px;
`;

const { kakao } = window;

export const KakaoMap = ({ location }) => {
    useEffect(() => {
        var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        var options = {
            center: new kakao.maps.LatLng(
                location.location_x,
                location.location_y
            ), //지도의 중심좌표
            level: 3,
        };

        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        var markerPosition = new kakao.maps.LatLng(
            location.location_x,
            location.location_y
        );
        var marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        marker.setMap(map);
    }, [location]);

    return (
        <div>
            <MapContainer id="map"></MapContainer>
        </div>
    );
};
