import React from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { categoriesData } from "../data";
import { Link } from "react-router-dom";

const CategoriesNav = () => {
  return (
    <Menu arrow={true} menuButton={<MenuButton>Categories</MenuButton>}>
      {categoriesData.map((category, index) => (
        <SubMenu key={index} href={`${category.name}`} label={category.name}>
          {Object.entries(category.subCategories).map(([key, value]) => (
            <SubMenu href={`${key}`} label={key} key={key}>
              {value.map((item) => (
                <MenuItem key={item}>
                  <Link to={`/slug/${item}`}>{item}</Link>
                </MenuItem>
              ))}
            </SubMenu>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default CategoriesNav;
