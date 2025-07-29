import React, { useState } from 'react';
import { postProduct } from '../app/features/productsSlice';
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../app/features/noteSlice";

const AddProduct = () => {

    const dispatch = useDispatch();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        modelNumber: '',
        quantity: '',
        manufacturer: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!product.name || !product.price || !product.category || !product.modelNumber || !product.quantity) {
            setError('Please fill in all required fields.');
            return;
        } else {
            try {
                await dispatch(postProduct(product))
                setError('');
                setProduct({
                    name: '',
                    price: '',
                    description: '',
                    category: '',
                    image: '',
                    modelNumber: '',
                    quantity: '',
                    manufacturer: ''
                });
                setSubmitted(false);
                dispatch(createNote(["Product added successfully", "success"]))
            }
            catch (error) {
                dispatch(createNote([error.message, "fail"]))
            }
        }

    };

    // List of required fields
    const requiredFields = ["name", "price", "category", "modelNumber", "quantity"];

    // Helper to check if a field is missing
    const isFieldMissing = (field) => product[field].trim() === "";

    // check form validity
    const isFormValid = requiredFields.every(field => product[field].trim() !== "");

    // Track if form was submitted
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <h1 className="center-align blue-text text-darken-3" style={{ marginTop: "40px" }}>Add Product</h1>
            {error && <p className="center-align red-text text-darken-3" style={{ color: 'red' }}>{error}</p>}
            <div className="row" style={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
                <form
                    className="col s12 z-depth-2 white"
                    style={{
                        padding: "32px",
                        borderRadius: "12px",
                        width: "50vw",
                        minWidth: "320px",
                        maxWidth: "600px",
                        margin: "0 auto"
                    }}
                    onSubmit={handleSubmit}
                >
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Product Name"
                                id="name"
                                name="name"
                                type="text"
                                className={`validate ${submitted && isFieldMissing("name") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={product.name}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("name") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Price"
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                className={`validate ${submitted && isFieldMissing("price") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={product.price}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("price") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Category"
                                id="category"
                                name="category"
                                type="text"
                                className={`validate ${submitted && isFieldMissing("category") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={product.category}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("category") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    {/* Model Number - now required */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Model Number"
                                id="modelNumber"
                                name="modelNumber"
                                type="text"
                                className={`validate ${submitted && isFieldMissing("modelNumber") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={product.modelNumber}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("modelNumber") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    {/* Quantity - now required */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Quantity"
                                id="quantity"
                                name="quantity"
                                type="number"
                                min="0"
                                className={`validate ${submitted && isFieldMissing("quantity") ? "invalid" : ""}`}
                                onChange={handleChange}
                                value={product.quantity}
                                required
                            />
                            <span className={`helper-text${submitted && isFieldMissing("quantity") ? " red-text" : ""}`}>
                                Required
                            </span>
                        </div>
                    </div>
                    {/* Manufacturer */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Manufacturer"
                                id="manufacturer"
                                name="manufacturer"
                                type="text"
                                className="validate"
                                onChange={handleChange}
                                value={product.manufacturer}
                            />
                            <span className="helper-text">Optional</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                placeholder="Description"
                                id="description"
                                name="description"
                                className="materialize-textarea"
                                onChange={handleChange}
                                value={product.description}
                                rows={3}
                            />
                            <span className="helper-text">Optional</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Image URL"
                                id="image"
                                name="image"
                                type="text"
                                className="validate"
                                onChange={handleChange}
                                value={product.image}
                            />
                            <span className="helper-text">Optional</span>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "24px" }}>
                        <div className="col s12 center-align">
                            <button
                                type="submit"
                                className="waves-effect waves-light blue darken-3 btn-small z-depth-5"
                                style={{ marginRight: "16px" }}
                                disabled={!isFormValid}
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;