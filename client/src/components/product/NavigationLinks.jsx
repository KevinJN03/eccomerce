import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { useGenderCategory } from '../../hooks/genderCategory';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
function Navigation_Links({ className, product, loading, shouldUpdateGender }) {
    const [state, dispatch] = useGenderCategory();
    useEffect(() => {
        if (!shouldUpdateGender) {
            return;
        }
        if (product.gender && product.gender != state.gender) {
            'not the same gender', product;

            dispatch({ type: product.gender });
        }
    }, [product]);
    return (
        <div
            className={`links flex flex-row items-center gap-2 whitespace-nowrap pr-4 md+lg:text-xs ${
                className ? className : ''
            }`}
        >
            {loading ? (
                <div className="skeleton-pulse h-5 w-1/6 "></div>
            ) : (
                <>
                    <Link to="/" className="text-s">
                        Home
                    </Link>
                    <NavigateNextSharpIcon fontSize="2" />
                    {product ? (
                        <>
                            <p className="text-s">
                                {product.gender[0].toUpperCase() +
                                    product.gender.slice(1)}
                            </p>{' '}
                            <NavigateNextSharpIcon fontSize="2" />{' '}
                            <Link
                                to={`/${product.gender}/${product.category}`}
                                className="text-s "
                            >
                                {product.category[0].toUpperCase() +
                                    product.category.slice(1)}
                            </Link>
                        </>
                    ) : (
                        <>
                            <p className="text-s">
                                {state.gender[0].toUpperCase() +
                                    state.gender.slice(1)}
                            </p>{' '}
                            <NavigateNextSharpIcon fontSize="2" />{' '}
                            <Link
                                to={`/${state.gender}/${state.productCategory}`}
                                className="text-s "
                            >
                                {state.productCategory[0].toUpperCase() +
                                    state.productCategory.slice(1)}
                            </Link>
                        </>
                    )}

                    {product && (
                        <>
                            <NavigateNextSharpIcon fontSize="2" />
                            <p className="overflow-hidden !text-ellipsis !whitespace-nowrap text-s ">
                                {product.title}
                            </p>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Navigation_Links;
