import React from 'react';
import { useGetProductsQuery } from '../services/apiSlice';

function Home() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;