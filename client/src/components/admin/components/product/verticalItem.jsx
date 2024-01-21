import {
    ArrowDropDownSharp,
    SettingsRounded,
    StarRateRounded,
} from '@mui/icons-material';
import { useState } from 'react';
import Actions from './actions';
import { Link } from 'react-router-dom';
import { useListingPageContext } from '../../../../context/listingPageContext';

function VerticalItem({ product, idx }) {
    const [favorite, setFavorite] = useState(false);

    const [showAction, setShowAction] = useState(false);

    const { selectionSet, setSelectionSet, checks } = useListingPageContext();
    return (
        <section
            className={`${
                selectionSet?.has(product?._id)
                    ? 'border-green-400/50 bg-green-50'
                    : 'border-dark-gray/50 bg-transparent'
            }  flex-no-wrap  relative flex h-full w-full flex-row gap-3 border  border-dark-gray/50 px-4 py-4`}
        >
            <input
                checked={selectionSet?.has(product?._id)}
                onChange={() => {
                    setSelectionSet((prevSet) => {
                        const newSet = new Set(prevSet);
                        if (newSet.has(product?._id)) {
                            newSet.delete(product._id);
                        } else {
                            newSet.add(product?._id);
                        }

                        return newSet;
                    });
                }}
                className=" daisy-checkbox daisy-checkbox-xs rounded-sm"
                type="checkbox"
                name={`select-${product?._id}`}
                id={`select-${product?._id}`}
            />

            <Link
                to={`edit/${product?._id}${
                    product?.status == 'draft' ? '?draft=true' : ''
                }`}
                className="h-16 max-h-16 w-16 max-w-16"
            >
                <img
                    src={product?.images[0]}
                    className="h-full w-full object-cover"
                />
            </Link>
            <div className="flex h-full flex-[5] flex-col">
                <Link
                    to={`edit/${product?._id}${
                        product?.status == 'draft' ? '?draft=true' : ''
                    }`}
                >
                    <p title={product?.title} className="font-medium underline">
                        {product?.title}
                    </p>
                </Link>

                <div className="mt-4 flex w-full max-w-xs flex-row justify-between">
                    <p className='underline text-black/70 text-xs'>{product.additional_data.stock?.total} in stock</p>
                    {/* <p>{`${product.additional_data.price?.min == product.additional_data.price?.min ? `${product.additional_data.price?.min}`  }</p> */}


                    {
                        product.additional_data.price?.min == product.additional_data.price?.max ? <p className='underline text-black/70 text-xs'>
                            £{product.additional_data.price?.min}
                        </p> : <p className='underline text-black/70 text-xs'>
                        £{product.additional_data.price?.min}-£{product.additional_data.price?.max}
                        </p>
                    }
                </div>
            </div>

            <section className="flex flex-1 flex-row flex-nowrap gap-3">
                <div
                    className="group flex w-full items-center justify-center py-2"
                    onClick={() => setFavorite((prevState) => !prevState)}
                >
                    <StarRateRounded
                        className={`${
                            favorite ? '!fill-orange-400' : ''
                        } group-hover:!opacity-70`}
                    />
                </div>
                <section className="relative flex items-center justify-center">
                    <div
                        onClick={() => setShowAction((prevState) => !prevState)}
                        className="flex w-full  flex-row flex-nowrap items-center justify-center"
                    >
                        <SettingsRounded className="!text-[20px]" />
                        <ArrowDropDownSharp className="relative left-[-0.3rem] !text-[20px]" />
                    </div>

                    <Actions
                        {...{
                            product,
                            showAction,
                            setShowAction,
                            className: '-translate-y-[-95%]',
                        }}
                    />
                </section>
            </section>
        </section>
    );
}

export default VerticalItem;
