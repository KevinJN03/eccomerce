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
}) {
    const { dispatch } = useCart();

    const handleClick = () => {
        console.log({
            sizeSelect,
            colorSelect,
            isSizePresent: product.isSizePresent,
            isColorPresent: product.isColorPresent,
        });

        console.log({ sizeSelect });
        if (
            (sizeSelect == null && product.isSizePresent) ||
            (colorSelect == null && product.isColorPresent)
        ) {
            console.log('enter error');
            setError(() => true);
            return;
        }

        const { id, title, images, delivery } = product;

        const newImagesArray = images[0];
        const newProduct = {
            id,
            title,
            price: product.price,
            images: [newImagesArray],
            delivery
        };

        newProduct.selectSize = sizeSelect;
        newProduct.cartId = uuidv4();
        newProduct.quantity = 1;
        newProduct.price.current = price;
        newProduct.color = colorSelect;
        dispatch({ type: 'add', product: newProduct });
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
