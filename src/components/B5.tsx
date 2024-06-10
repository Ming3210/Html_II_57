import React, { useState } from "react";

export default function B5() {
  const [products, setProduct] = useState<any>({
    id: Math.ceil(Math.random() * 1000000),
    product_name: "",
    image: "",
    price: 0,
    quantity: 0,
    created_at: "",
  });
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...products,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(products),
    });
    fetch("http://localhost:3000/products")
      .then((response: Response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={handleChanges}
          value={products.product_name}
          name="product_name"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={handleChanges}
          value={products.price}
          name="price"
          type="number"
          placeholder="Price"
        />
        <input
          onChange={handleChanges}
          value={products.quantity}
          name="quantity"
          type="number"
          placeholder="Quantity"
        />
        <input
          onChange={handleChanges}
          value={products.image}
          name="image"
          type="file"
        />
        <input
          onChange={handleChanges}
          value={products.created_at}
          name="created_at"
          type="text"
          placeholder="Created at"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
