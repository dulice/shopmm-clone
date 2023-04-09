// @mui material components
import Card from "@mui/material/Card";

// Shopmm Admin Dashboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Shopmm Admin Dashboard MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// Data
import { Avatar, Button, CircularProgress } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "api/productApi";
import { useGetProductsQuery } from "api/productApi";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const navigate = useNavigate();
console.log(data)
  const productsTableData = {
    columns: [
      { name: "Owner Name", align: "left" },
      { name: "Product Name", align: "left" },
      { name: "Description", align: "left" },
      { name: "Category", align: "left" },
      { name: "Price", align: "center" },
      { name: "Stock", align: "center" },
      { name: "Control", align: "center" },
    ],

    rows: data?.map((el) => {
      if (isLoading) return <div>Loading...</div>;
      return {
        "Owner Name": (
          <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
            <ArgonBox mr={2}>
              <Avatar src="" alt="" />
            </ArgonBox>
            <ArgonBox display="flex" flexDirection="column">
              <ArgonTypography variant="button" fontWeight="medium">
                {el.ownerName}
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        ),
        "Product Name": el.productName.substring(0, 20) + "...",
        Description: el.description.substring(0, 20) + "...",
        Category: el.category,
        Price: el.price + " Ks",
        Stock: el.stock,
        Control: (
          <>
            <Button onClick={() => navigate(`/update-product/${el._id}`)}>
              <Edit />
            </Button>
            {isDeleting ? (
              <Button>
                <CircularProgress />
              </Button>
            ) : (
              <Button onClick={() => deleteProduct(el._id)}>
                <Delete />
              </Button>
            )}
          </>
        ),
      };
    }),
  };

  const { rows, columns } = productsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <ArgonTypography variant="h6">Products</ArgonTypography>
              <Button variant="contained" onClick={() => navigate("/add-product")}>
                Add <Add />
              </Button>
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
};

export default Products;
