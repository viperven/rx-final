import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchedProds, setSearchProds] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState({});
  let [search, setSearch] = useState("");

  // Dummy data for testing
  const dummyProducts = [
    {
      id: 1,
      productId: "PROD001",
      title: "Product X",
      category: "Category A",
      color: "black",
      qty: 10,
      price: "50.00",
      image:
        "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg",
    },
    {
      id: 2,
      productId: "PROD002",
      title: "Product Y",
      category: "Category B",
      color: "blue",
      qty: 5,
      price: "30.00",
      image:
        "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg",
    },
    {
      id: 3,
      productId: "PROD003",
      title: "Product Z",
      category: "Category A",
      color: "red",
      qty: 20,
      price: "20.00",
      image:
        "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  useEffect(() => {
    //api fetch here
    setProducts(dummyProducts);
  }, []);

  // function for search
  const handleSearch = () => {
    let searched = products.filter(
      (temp) =>
        temp.title.toLowerCase().includes(search.toLowerCase()) ||
        temp.productId.toLowerCase().includes(search.toLowerCase()) ||
        temp.color.toLowerCase().includes(search.toLowerCase()) ||
        temp.category.toLowerCase().includes(search.toLowerCase()) ||
        temp.price === search
    );
    console.log(searched);
    setSearchProds(searched);
  };
  useEffect(() => {
    handleSearch();
  }, [search]);

  // Function to handle edit action
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditedProduct(product);
    setShowEditModal(true);
  };

  // Function to handle delete action
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteConfirmation(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    const updatedProducts = products.filter(
      (product) => product.id !== selectedProduct.id
    );
    setProducts(updatedProducts);
    setShowDeleteConfirmation(false);
  };

  // Function to handle save edit action
  const handleSaveEdit = () => {
    const updatedProducts = products.map((product) => {
      if (product.productId === editedProduct.productId) {
        return editedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
    setShowEditModal(false);
  };

  // Function to handle input change in edit modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  // Function to render table rows dynamically
  const renderTableRows = () => {
    if (searchedProds.length !== 0) {
      return searchedProds.map((product, index) => (
        <tr key={product.id}>
          <td>{index + 1}</td>
          <td>{product.productId}</td>
          <td>
            <img
              src={product.image}
              alt={product.title}
              className="product-img"
            />
          </td>
          <td>{product.title}</td>
          <td>{product.category}</td>
          <td>
            {/* {product.color.map((color, idx) => (
                            // <span key={idx} style={{ backgroundColor: color }}>{color}</span>
                           <li>{color}</li>
                        ))} */}
            {product.color}
          </td>
          <td>{product.qty}</td>
          <td>{product.price}</td>
          <td>
            <FaRegEdit
              className="order-ic"
              style={{ color: "#006400" }}
              onClick={() => handleEdit(product)}
            />
            <MdDelete
              className="order-ic"
              style={{ color: "#ef233c" }}
              onClick={() => handleDelete(product)}
            />
          </td>
        </tr>
      ));
    } else {
      return products.map((product, index) => (
        <tr key={product.id}>
          <td>{index + 1}</td>
          <td>{product.productId}</td>
          <td>
            <img
              src={product.image}
              alt={product.title}
              className="product-img"
            />
          </td>
          <td>{product.title}</td>
          <td>{product.category}</td>
          <td>{product.color}</td>
          <td>{product.qty}</td>
          <td>{product.price}</td>
          {/* //ok.... */}
          <td>
            <FaRegEdit
              className="order-ic"
              style={{ color: "#006400" }}
              onClick={() => handleEdit(product)}
            />
            <MdDelete
              className="order-ic"
              style={{ color: "#ef233c" }}
              onClick={() => handleDelete(product)}
            />
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4 text-center">Products</h1>
      <input
        type="text"
        placeholder="Search products their column Names"
        onChange={(e) => setSearch(e.target.value)}
        className="form-control search-input"
      />
      <br />
      <div className="table-responsive">
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product ID</th>
              <th>Products</th>
              <th>Title</th>
              <th>Category</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </Table>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Color */}

            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="qty"
                value={editedProduct.qty}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{selectedProduct.title}</b>{" "}
          product?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductsPage;
