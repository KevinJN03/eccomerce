import { useCart } from '../../context/cartContext';
import { v4 as uuidv4 } from 'uuid';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
function AddToCart({
    product,
    sizeSelect,
    colorSelect,
    setError,
    isOutOfStock,
    price,
    variationSelect,
}) {
    const { dispatch } = useCart();

    const handleClick = () => {
        if (
            (product.isSizePresent && !variationSelect.size.id) ||
            (product.isColorPresent && !variationSelect.color.id)
        ) {
            ('enter error');
            setError(() => true);
            return;
        }

        const { id, title, images, delivery, size, color } = product;

        const newImagesArray = images[0];
        const newProduct = {
            id,
            title,
            price: product.price,
            images: [newImagesArray],
            delivery,
            size,
            color,
        };

        newProduct.cartId = uuidv4();
        newProduct.quantity = 1;
        newProduct.price.current = price;
        newProduct.variationSelect = variationSelect;
        dispatch({ type: 'add', product: newProduct });

        setError(() => false);
    };
    return (
        <>
            {!isOutOfStock ? (
                <button id="add-to-cart" onClick={handleClick}>
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
        </>
    );
}

export default AddToCart;
