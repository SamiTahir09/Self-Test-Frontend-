import React, { useEffect, useState } from "react";

const Carts = () => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch carts from API
        fetch("https://dummyjson.com/carts")
            .then((res) => res.json())
            .then((data) => {
                setCarts(data.carts);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching carts:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center text-xl mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Shopping Carts</h1>

            {carts.length === 0 ? (
                <div className="text-center text-xl">No carts available</div>
            ) : (
                carts.map((cart) => (
                    <div
                        key={cart.id}
                        className="bg-white shadow rounded-md mb-8 p-6 border"
                    >
                        <h2 className="text-xl font-semibold mb-2">
                            Cart #{cart.id} — Total Items: {cart.totalProducts}
                        </h2>

                        {/* Cart Products */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cart.products.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 border-b pb-4"
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-24 h-24 object-cover rounded"
                                    />

                                    <div>
                                        <h3 className="text-lg font-medium">{item.title}</h3>
                                        <p className="text-gray-600">Price: ${item.price}</p>
                                        <p className="text-gray-600">Qty: {item.quantity}</p>
                                        <p className="font-semibold">
                                            Subtotal: ${item.total.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-right mt-4">
                            <p className="text-lg font-semibold">
                                Cart Total: ${cart.total.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                                Discounted: ${cart.discountedTotal.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Carts;
