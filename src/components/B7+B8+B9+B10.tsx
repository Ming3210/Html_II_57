import React, { useEffect, useState } from "react";

export default function B7() {
  const [product, setProduct] = useState<any>({
    id: "",
    product_name: "",
    image: "",
    price: 0,
    quantity: 0,
    created_at: "",
  });

  const [products, setProducts] = useState<any>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const loadData = () => {
    fetch(`http://localhost:3000/products`)
      .then((response: Response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: number) => {
    let check = window.confirm(`Are you sure you want to delete?`);
    if (check) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      })
        .then((response: Response): any => {
          if (response.ok) {
            loadData();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      fetch(`http://localhost:3000/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response: Response): any => {
          if (response.ok) {
            setIsEditing(false);
            setProduct({
              id: "",
              product_name: "",
              image: "",
              price: 0,
              quantity: 0,
              created_at: "",
            });
            loadData();
          }
        })
        .catch((error) => console.log(error));
    } else {
      fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response: Response): any => {
          if (response.ok) {
            setProduct({
              id: "",
              product_name: "",
              image: "",
              price: 0,
              quantity: 0,
              created_at: "",
            });
            loadData();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleEdit = (id: number) => {
    const selectedProduct = products.find((p: any) => p.id === id);
    if (selectedProduct) {
      setIsEditing(true);
      setProduct(selectedProduct);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setProduct({
      id: "",
      product_name: "",
      image: "",
      price: 0,
      quantity: 0,
      created_at: "",
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <table border={1} style={{ width: "50vw" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Created At</th>
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.image} alt="" />
              </td>
              <td>{product.quantity}</td>
              <td>{product.created_at}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div>
        <form onSubmit={handleSubmit} action="">
          <input
            onChange={handleChanges}
            value={product.product_name}
            name="product_name"
            type="text"
            placeholder="Name"
          />
          <input
            onChange={handleChanges}
            value={product.price}
            name="price"
            type="number"
            placeholder="Price"
          />
          <input
            onChange={handleChanges}
            value={product.quantity}
            name="quantity"
            type="number"
            placeholder="Quantity"
          />
          <input
            onChange={handleChanges}
            value={product.image}
            name="image"
            type="text"
            placeholder="URL"
          />
          <input
            onChange={handleChanges}
            value={product.created_at}
            name="created_at"
            type="text"
            placeholder="Created at"
          />
          <button type="submit">{isEditing ? "Update" : "Add"}</button>
          {isEditing && <button onClick={handleClose}>Cancel</button>}
        </form>
      </div>
    </div>
  );
}
