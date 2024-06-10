import React from "react";

export default function B2() {
  let b2 = fetch("http://localhost:3000/products");
  b2.then((response: Response) => response.json()).then((data) =>
    console.log(data)
  );

  return <div></div>;
}
