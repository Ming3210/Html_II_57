import React from "react";

export default function B6() {
  const produtc = {
    id: 3,
    product_name: "abc",
    image:
      "https://static.wikia.nocookie.net/phoenotopia/images/3/36/Perro_egg.png/revision/latest?cb=20181104215257",
    price: 100,
    quantity: 19,
    created_at: "20/12/2023",
  };
  function updateProductById(id: number) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(produtc),
    }).then((response: Response) => {
      if (response.ok) {
        fetch(`http://localhost:3000/products`)
          .then((respone: Response) => respone.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      }
    });
  }
  updateProductById(3);

  //
  return <div></div>;
}
