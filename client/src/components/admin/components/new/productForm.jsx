import { productInputs } from "./formSource"

function Product_Form({}){
  return (
    <>
    {productInputs.map(input => {
        return(
            <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input type={input.type} placeholder={input.placeHolder}/>
            </div>
        )
    })}
    </>
  )
};

export default Product_Form
