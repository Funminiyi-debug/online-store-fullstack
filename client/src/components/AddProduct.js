import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [image, setImage] = useState("");

  const handleInputChange = e => {
    const name = e.target.name;
    switch (name) {
      case "image":
        return setImage(e.target.files[0]);

      case "name":
        return setName(e.target.value);

      case "price":
        return setPrice(e.target.value);

      case "category":
        return setCategory(e.target.value);

      case "subcategory":
        return setSubCategory(e.target.value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("image", image);
    try {
      // console.log(userProduct);
      console.log(formData);
      const res = await axios({
        url: "http://localhost:2200/resources/products",
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data);
      setName("");
      setCategory("");
      setSubCategory("");
      setPrice(0);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container my-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Name of Product</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            name="name"
            onChange={handleInputChange}
            value={name}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="price"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={category}
            onChange={handleInputChange}
          >
            {[
              "Toiletries",
              "Household",
              "Fresh Foods",
              "Naija Food",
              "Food Cupboard",
            ].map(category => (
              <option key={category.toString()}>{category}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Sub category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter sub-category e.g. moisturizers"
            name="subcategory"
            onChange={handleInputChange}
            value={subcategory}
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            id="exampleFormControlFile1"
            label="product image ( jpg/jpeg/png only )"
            name="image"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type="submit" className="my-1">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
