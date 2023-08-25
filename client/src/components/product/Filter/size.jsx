import { useState } from "react";

function Size() {
    const [count, setCount] = useState()
  const sizes = [
    { value: "S", type: "shirt" },
    { value: "M", type: "shirt" },
    { value: "L", type: "shirt" },
    { value: "XL", type: "shirt" },
    { value: "XXL", type: "shirt" },
    { value: "XXXL", type: "shirt" },
    { value: "8", type: "shoe" },
    { value: "9", type: "shoe" },
    { value: "10", type: "shoe" },
    { value: "11", type: "shoe" },
    { value: "12", type: "shoe" },
    { value: "13", type: "shoe" },
    { value: "30", type: "pant" },
    { value: "32", type: "pant" },
    { value: "34", type: "pant" },
    { value: "36", type: "pant" },
    { value: "38", type: "pant" },
    { value: "40", type: "pant" },
    { value: "42", type: "pant" },
  ];

  return (
    <section id="size-section">
        <div>
            <h3 className="">{count ? `Size (${count})`: Size}</h3>
        </div>
    </section>
  )
}

export default Size;
