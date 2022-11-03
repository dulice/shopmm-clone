/**
=========================================================
* Shopmm Admin Dashboard MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Shopmm Admin Dashboard MUI base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Shopmm Admin Dashboard MUI helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { white } = colors;
const { borderRadius } = borders;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(256),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(256),
      backgroundColor: white.main,
      height: `calc(100vh - ${pxToRem(32)})`,
      margin: `${pxToRem(16)} 0 ${pxToRem(16)} ${pxToRem(16)}`,
      borderRadius: borderRadius.xl,
      border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
