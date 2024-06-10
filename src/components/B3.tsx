import React from "react";

export default function B3() {
  function getProductById(id: number) {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  getProductById(3);
  return <div>B3</div>;
}
