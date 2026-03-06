// import React from "react";
// import { useGetProductsQuery } from "./services/apiSlice";

// function App() {
//   const { data: products, error, isLoading } = useGetProductsQuery();

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading products</p>;

//   return (
//     <div className="p-4 grid grid-cols-3 gap-4">
//       {products.map((p) => (
//         <div key={p.id} className="border p-4 rounded shadow">
//           <h2 className="text-lg font-bold">{p.name}</h2>
//           <p>Price: ${p.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
  <ThemeProvider>
     <Navbar />
     <Auth />
  </ThemeProvider>
   );
}

export default App;