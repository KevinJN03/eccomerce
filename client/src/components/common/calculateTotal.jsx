import { useCart } from "../../context/cartContext";
const calculateTotal = () => {

    const [products] = useCart()
    let total = 0;

    for ( let item of products){
       total += item.price 
    }
return total
    
}

export default calculateTotal