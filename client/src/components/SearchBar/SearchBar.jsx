import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Search, SearchBox, SearchIcon } from "./style";

export default function SearchBar() {
  const navigate = useNavigate();
  const [userValue, setUserValue] = useState("");

  const handleUserValue = (e) => {
    setUserValue(e.target.value);
  };

  const handleNavigate = () => {
    navigate(`/search?search=${userValue}`, { state: userValue });
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNavigate();
      setUserValue("");
    }
  };

  return (
    <SearchBox>
      <Search
        type="text"
        placeholder="원하는 숙소명을 검색해주세요."
        value={userValue}
        onChange={handleUserValue}
        onKeyDown={handleOnKeyDown}
      />
      <SearchIcon onClick={handleNavigate}>
        <MdOutlineSearch />
      </SearchIcon>
    </SearchBox>
  );
}
