import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../app/features/productsSlice";
import { createNote } from "../app/features/noteSlice";


const Products = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.users.currentUser);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const products = useSelector((state) => state.products.data);

    const handleDelete = async (id) => {
        if (currentUser && currentUser.isAdmin == true) {
            try {
                const resultAction = await dispatch(deleteProduct(id));
                if (deleteProduct.fulfilled.match(resultAction)) {
                    dispatch(createNote(["Product deleted successfully", "success"]));
                    dispatch(getProducts());
                } else {
                    dispatch(createNote(["Product delete failed, action not authorized", "fail"]));
                }
            }
            catch (error) {
                dispatch(createNote(["Product delete failed, action not authorized", "fail"]));
            }

        } else {
            dispatch(createNote(["Product delete failed, action not authorized", "fail"]));
        }

    };

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getProducts());
        }
    }, [status, dispatch]);

    return (
        <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {products.map(product => {
                return (
                    <div
                        key={product._id}
                        className="card blue darken-3"
                        style={{ maxWidth: "300px" }}
                    >
                        <div className={`card-content white-text`}>
                            <span className="card-title" style={{ fontWeight: "bold" }}>{product.name}</span>
                            <p>Category : {product.category}</p>
                            <p>Quantity : {product.quantity}</p>
                            <p>Price : {product.price}</p>
                            <p>Model number : {product.modelNumber}</p>
                            <p>Manifaturer : {product.manifaturer}</p>
                            <p>Description : {product.description}</p>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn red lighten-1 waves-effect waves-light"
                                onClick={() => { confirm(`Are you sure you want to detele ${product.name}?`) && handleDelete(product._id) }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Products;