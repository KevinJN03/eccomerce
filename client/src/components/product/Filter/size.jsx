import { useState } from "react";

import arrow from "../../../assets/footer-icons/right-arrow.png"
import { v4 as uuidv4 } from "uuid";
function Size() {
  const [count, setCount] = useState();
  const [show, setShow] = useState(true);

  const sizes = [
    { id: uuidv4(), value: "S", type: "shirt" },
    { id: uuidv4(), value: "M", type: "shirt" },
    { id: uuidv4(), value: "L", type: "shirt" },
    { id: uuidv4(), value: "XL", type: "shirt" },
    { id: uuidv4(), value: "XXL", type: "shirt" },
    { id: uuidv4(), value: "XXXL", type: "shirt" },
    { id: uuidv4(), value: "8", type: "shoe" },
    { id: uuidv4(), value: "9", type: "shoe" },
    { id: uuidv4(), value: "10", type: "shoe" },
    { id: uuidv4(), value: "11", type: "shoe" },
    { id: uuidv4(), value: "12", type: "shoe" },
    { id: uuidv4(), value: "13", type: "shoe" },
    { id: uuidv4(), value: "30", type: "pant" },
    { id: uuidv4(), value: "32", type: "pant" },
    { id: uuidv4(), value: "34", type: "pant" },
    { id: uuidv4(), value: "36", type: "pant" },
    { id: uuidv4(), value: "38", type: "pant" },
    { id: uuidv4(), value: "40", type: "pant" },
    { id: uuidv4(), value: "42", type: "pant" },
  ];
const toggleShow =() => {
setShow(!show)
}
  return (
    <section id="size-section">
      <div className="section-header">
        <h3 className="section-title">{count ? `Size (${count})` : "Size"}</h3>
        <div className="arrow-wrapper" onClick={toggleShow}>
          <img src={arrow} className="arrow"/>
        </div>
      </div>
      {show ?
      <div id="size-btn-wrapper">
        {sizes.map((size) => {
          return (
            
              <button key={size.id}
                type="button"
                value={size.value}
                onClick={(e) => e.target.value}
              >{size.value}</button>
            
          );
        })}
      </div>
      :
      ""


      }
      
    </section>
  );
}

export default Size;
