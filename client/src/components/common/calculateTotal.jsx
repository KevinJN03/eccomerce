import { useCart } from "../../context/cartContext"

const calculateTotal = () => {

    const [products] = useCart()
    let total = 0;

    for ( let item of products){
       total += item.price.current
    }
return total.toFixed(2)
    
}

export default calculateTotal