import React from "react";

export default function B4() {
  function removeProductById(id: number) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    }).then((response: Response) => {
      if (response.ok) {
        fetch(`http://localhost:3000/products`)
          .then((respone: Response) => respone.json())
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      }
    });
  }
  removeProductById(4);
  return <div>B4</div>;
}
