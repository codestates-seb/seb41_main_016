import React from "react";
import {
  CategoryBox,
  CategoryTitleBox,
  HashTag,
  ImageBox,
  TextBox,
} from "./style";

export default function CategoryCard({ href, icon, title, hashTag, url }) {
  return (
    <CategoryBox to={href}>
      <TextBox>
        <CategoryTitleBox>
          <span>{icon}</span>
          <h3>{title}</h3>
        </CategoryTitleBox>
        <HashTag>{hashTag}</HashTag>
      </TextBox>
      <ImageBox url={url}></ImageBox>
    </CategoryBox>
  );
}
