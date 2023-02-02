import React, { useEffect } from "react";
import { MapContainer } from "./style";

const { kakao } = window;

export default function KakaoMap({ location }) {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(location.location_x, location.location_y), //지도의 중심좌표
      level: 3,
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    const markerPosition = new kakao.maps.LatLng(
      location.location_x,
      location.location_y
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [location]);

  return (
    <div>
      <MapContainer id="map"></MapContainer>
    </div>
  );
}
