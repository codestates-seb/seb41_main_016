import styled from "styled-components";

export const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
  }

  ul.pagination li {
    width: 30px;
    height: 30px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul.pagination li a {
    color: ${(props) => props.theme.lightGrey};
  }
  ul.pagination li.active a {
    color: ${(props) => props.theme.darkBlack};
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: ${(props) => props.theme.darkBlack};
  }
`;
