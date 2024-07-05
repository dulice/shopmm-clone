import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import { DateRangePicker } from "react-date-range";
import axios from "axios"
import "react-quill/dist/quill.snow.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { CustomButton } from "../../custom";
import { fadeAnimation } from "../../config/motion";
import { categoriesData } from "../../data/categories";
import { useAddProductMutation } from "../../api/productApi";
import { useSelector } from "react-redux";

const ProductAdd = () => {
  const { user } = useSelector(state => state.user)
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [slug, setSlug] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [description, setDescription] = useState("");
  const [subcategories, setSubcategories] = useState({});

  useEffect(() => {
    setSubcategories(categoriesData.find((c) => c.name === category));
  }, [category]);

  const onDrop = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  const handleAdd = async (e) => {
    e.preventDefault();
   try {
    const imageResult = [];
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/upload/product`, { images });
    data.forEach(item => {
      imageResult.push(item.secure_url)
    });
    const result = await Promise.all(imageResult)
    await addProduct({
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
      fromDate: dateRange.startDate,
      toDate: dateRange.endDate,
    })
    navigate("/products/product_list");
   } catch (error) {
    console.log(error);
   }
  };

  return (
    <motion.div {...fadeAnimation}>
      <form onSubmit={handleAdd} className="m-4 card flex flex-col gap-4">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {images.length > 0 ? (
            <div className="grid grid-cols-12 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="col-span-6 md:col-span-4 round-sm"
                />
              ))}
            </div>
          ) : (
            <p className="text-center p-4 bg-slate-600 border-2 border-dashed border-green-500">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            className="input w-full"
            name="productName"
            placeholder="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            className="input w-full"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="grid gird-cols-1 md:grid-cols-3 gap-4">
          <div className="category">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="categiry"
              className="input w-full"
            >
              <option value="" disabled>
                Select Cateogry
              </option>
              {categoriesData.map((category) => (
                <option value={category.name} key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="subCategory">Sub-Category:</label>
            <select
              name="subCategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              id="categiry"
              className="input w-full"
            >
              <option value="" disabled>
                Select Sub_Cateogry
              </option>
              {subcategories?.subCategories &&
                Object.keys(subcategories.subCategories).map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="slug">Slug:</label>
            <select
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              id="categiry"
              className="input w-full"
            >
              <option value="" disabled>
                Select Slug
              </option>
              {subcategory &&
                subcategories.subCategories[subcategory]?.map((key) => (
                  <option value={key} key={key}>
                    {key}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            className="input w-full"
            name="stock"
            placeholder="Stock"
            min={1}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            className="input w-full"
            name="discount"
            placeholder="discount"
            min={1}
            value={discount}
            onChange={e => setDiscount(e.target.value)}
          />
        </div>
        <DateRangePicker
          ranges={[dateRange]}
          onChange={(date) => setDateRange(date.selection)}
          months={2}
          direction="horizontal"
        />
        <div>
          <label htmlFor="description">Description:</label>
          <ReactQuill value={description} onChange={setDescription} />
        </div>
        <CustomButton
          variant="btn-success"
          title="Add Product"
          type="submit"
        />
      </form>
    </motion.div>
  );
};

export default ProductAdd;
