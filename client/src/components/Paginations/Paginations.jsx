import React from "react";
import Pagination from "react-js-pagination";
import { PaginationBox } from "./style";

export default function Paginations({ page, total, limit, handlePageChange }) {
  return (
    <PaginationBox>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={limit} // 한 페이지당 보여줄 리스트 아이템의 개수
        totalItemsCount={total} // 총 아이템의 개수
        pageRangeDisplayed={5} // 보여줄 페이지의 범위
        prevPageText={"<"} // "이전"을 나타낼 텍스트
        nextPageText={">"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지가 바뀔 때 헨들링해줄 함수
      ></Pagination>
    </PaginationBox>
  );
}
