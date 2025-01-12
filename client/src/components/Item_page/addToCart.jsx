import { useCart } from '../../context/cartContext';
import { v4 as uuidv4 } from 'uuid';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import { useAddItemToBagContext } from '../../context/addItemToBagContext';
function AddToCart({}) {
    const { handleAddToCart, isOutOfStock } = useAddItemToBagContext();
    return (
        <div className="w-full flex-1">
            {!isOutOfStock ? (
                <button
                    className="w-full bg-primary-green py-2 font-semibold text-white hover:bg-green-700"
                    onClick={handleAddToCart}
                >
                    Add to bag
                </button>
            ) : (
                <button className="flex h-full w-full flex-[3] items-center justify-center !bg-primary px-3 opacity-95 transition-all hover:opacity-100">
                    <MailOutlineSharpIcon className="!text-3xl  invert" />
                    <p className="w-full !text-center text-sm font-semibold tracking-wider text-white">
                        NOTIFY ME
                    </p>
                </button>
            )}
        </div>
    );
}

export default AddToCart;
