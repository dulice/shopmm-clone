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

// @mui material components
import Card from "@mui/material/Card";
import { useUsersQuery } from "api/summaryApi";
import ArgonBadge from "components/ArgonBadge";

// Shopmm Admin Dashboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Shopmm Admin Dashboard MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// Data
import Author from "./data/authorsTableData";

function Tables() {
  const { data } = useUsersQuery();

  const authorsTableData = {
    columns: [
      { name: "users", align: "left" },
      { name: "email", align: "left" },
      { name: "isAdmin", align: "center" },
      { name: "Login From", align: "center" },
    ],

    rows: data?.map((el) => {
      return {
        users: <Author image={el.avatar} name={el.username} />,
        email: el.email,
        isAdmin: el.isAdmin ? (
          <ArgonBadge variant="gradient" badgeContent="Admin" color="success" size="xs" container />
        ) : (
          <ArgonBadge variant="gradient" badgeContent="user" color="secondary" size="xs" container />
        ),
        "Login From": el.source,
      };
    }),
  };

  const { columns, rows } = authorsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Users table</ArgonTypography>
            </ArgonBox>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Tables;
