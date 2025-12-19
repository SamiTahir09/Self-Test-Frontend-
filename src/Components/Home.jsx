import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";

const Home = () => {
    const [product, setproduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/products");
                setproduct(res.data.products);
            } catch (err) {
                setError("Failed to load products");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <>
            <Navbar />

            <div className="p-10">
                <h1 className="text-3xl text-blue-400 text-center mb-6">
                    Product List
                </h1>

                {loading && <p className="text-center">Loading Products...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {product.map((pro) => (
                        <div
                            key={pro.id}
                            className="border rounded shadow hover:shadow-lg transition p-4"
                        >
                            <img
                                src={pro.thumbnail}
                                alt={pro.title}
                                className="w-full h-40 object-cover rounded"
                            />

                            <h2 className="text-xl font-semibold mt-2">
                                {pro.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                Category: {pro.category}
                            </p>

                            <p className="text-sm">
                                ⭐ Rating: {pro.rating}
                            </p>

                            <p className="text-green-600 font-bold mt-1">
                                ${pro.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
