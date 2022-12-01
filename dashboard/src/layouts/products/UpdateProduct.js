import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import { categoriesData } from "./data/categoriesData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useGetProductQuery, useUpdateProductMutation } from "api/productApi";
import ArgonInput from "components/ArgonInput";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetProductQuery(id);
  const { user } = useSelector((state) => state.user);

  const [value, setValue] = useState([null, null]);
  const [productName, setProductName] = useState("");
  const [subcategories, setSubcategories] = useState({});
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();

  const [images, setImages] = useState([]);

  useEffect(() => {
    setValue([data?.fromDate, data?.toDate]);
    setProductName(data?.productName);
    setSubcategory(data?.subCategory);
    setCategory(data?.category);
    setSlug(data?.slug);
    setPrice(data?.price);
    setStock(data?.stock);
    setDescription(data?.description);
    setDiscount(data?.discount || 0);
    setImages(data?.images);
  }, [data]);

  useEffect(() => {
    const findCategories = categoriesData.find((cat) => cat.name.includes(category));
    setSubcategories(findCategories);
  }, [category]);

  const handleUploadProduct = async (e) => {
    e.preventDefault();
    try {
      const fromDate = value[0] && value[0]["$d"] ? value[0]["$d"] : null;
      const toDate = value[1] && value[1]["$d"] ? value[1]["$$d"] : null;
      await updateProduct({ 
        id, 
        ownerId: user._id,
        ownerName: user.username,
        productName,
        category,
        subCategory: subcategory,
        slug,
        price,
        stock,
        description,
        discount,
        fromDate,
        toDate,
      }).unwrap();
      navigate('/products')
    } catch (err) {
      console.log(err);
      if (err.data) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container>
        <Box>
          <ImageList variant="masonry" cols={3} gap={3}>
            {images &&
              images.length > 0 &&
              images.map((item) => (
                <ImageListItem key={item}>
                  <img src={item} alt="" />
                </ImageListItem>
              ))}
          </ImageList>
        </Box>
        <form encType="multipart/form-data" onSubmit={handleUploadProduct} style={{ fontSize: 16 }}>
          <Stack spacing={2}>
            <ArgonInput
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Grid container>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    labelId="category"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoriesData?.map((cat) => (
                      <MenuItem value={cat.name} key={cat.name}>
                        {cat.name}{" "}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel id="subcategory">Subcategory</InputLabel>
                  <Select
                    labelId="category"
                    value={subcategory}
                    label="subcategory"
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    {category &&
                      subcategories &&
                      Object.entries(subcategories.subCategories)?.map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {key}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel id="slug">Slug</InputLabel>
                  <Select
                    labelId="slug"
                    value={slug}
                    label="Slug"
                    onChange={(e) => setSlug(e.target.value)}
                  >
                    {subcategory &&
                      subcategories &&
                      subcategories?.subCategories[subcategory]?.map((el, index) => (
                        <MenuItem key={index} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <ArgonInput
              placeholder="Price"
              type="number"
              style={{ width: "100% !important" }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <ArgonInput
              placeholder="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <ArgonInput
              placeholder="Discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={{ start: "Discount From", end: "Discount To" }}
            >
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
            <ArgonInput
              style={{ width: "100% !important" }}
              placeholder="Description"
              multiline
              minRows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" variant="contained">
              {isUpdating ? "Uploading" : "Upload"}
            </Button>
          </Stack>
        </form>
      </Container>
    </DashboardLayout>
  );
};

export default UpdateProduct;
