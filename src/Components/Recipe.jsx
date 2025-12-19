import React, { useEffect, useState } from "react";

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data.recipes);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching recipes:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center text-xl mt-10">
                Loading recipes...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                🍲 Recipes
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition"
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />

                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                                {recipe.name}
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {recipe.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-gray-600 text-sm mb-2">
                                🍽 Cuisine: {recipe.cuisine}
                            </p>

                            <div className="flex justify-between text-sm text-gray-700">
                                <span>⭐ {recipe.rating}</span>
                                <span>⏱ {recipe.cookTimeMinutes} min</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipe;
