import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
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
  Typography,
  Button,
} from "@mui/material";
import { categoriesData } from "./data/categoriesData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { usePostProductMutation } from "api/productApi";

const ProductCreate = () => {
    const [createProduct, {isLoading}] = usePostProductMutation();
  const navigate = useNavigate();
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
  const [discount, setDiscount] = useState(0);

  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
      // console.log(images);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const subcategories = categoriesData.find((cat) => cat.name.includes(category));
    setSubcategories(subcategories);
  }, [category]);

  const handleUploadProduct = async (e) => {
    const resultImages = [];
    const fromDate = value[0] && value[0]["$d"] ? value[0]["$d"] : null;
    const toDate = value[1] && value[1]["$d"] ? value[1]["$$d"] : null;

    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/upload/product`, { images });
      data.forEach((item) => {
        resultImages.push(item.secure_url);
      });
      const result = await Promise.all(resultImages);
      await createProduct({
        ownerId: user._id,
        ownerName: user.username,
        productName,
        images: result,
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
      navigate("/products");
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
            {images.length > 0 &&
              images.map((item) => (
                <ImageListItem key={item}>
                  <img src={item} alt="" />
                </ImageListItem>
              ))}
          </ImageList>
        </Box>
        <form encType="multipart/form-data" onSubmit={handleUploadProduct} style={{fontSize: 16}}>
          <Stack spacing={2}>
            <Box
              sx={{
                height: 50,
                border: "1px dotted gray",
                textAlign: "center",
                padding: 5,
                width: '100%'
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Typography variant="body2">
                {isDragActive
                  ? "Drop the files here"
                  : "Drag 'n' drop some files here, or click to select files"}
              </Typography>
            </Box>
            <TextField
              label="Product Name"
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
                    {categoriesData.map((cat) => (
                      <MenuItem value={cat.name} key={cat.name}>{cat.name} </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                  <InputLabel id="subcategory">subcategory</InputLabel>
                  <Select
                    labelId="category"
                    value={subcategory}
                    label="subcategory"
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    {category &&
                      Object.entries(subcategories.subCategories).map(([key, value]) => (
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
                      subcategories.subCategories[subcategory].map((el, index) => (
                        <MenuItem key={index} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              label="Price"
              type="number"
              style={{ width: "100% !important" }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <TextField
              label="Discount"
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
            <TextField
              label="Description"
              multiline
              minRows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" variant="contained">
              {isLoading ? "Uploading" : "Upload"}
            </Button>
          </Stack>
        </form>
      </Container>
    </DashboardLayout>
  );
};

export default ProductCreate;
