import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
function OrderItem({}) {
    return (
        <section className="w-full rounded-sm  border-[1px] border-gray-400">
            <div className="flex items-center gap-4 border-b-[1px] border-gray-400 bg-light-grey/30 px-5 py-2">
                <p className="font-medium">Completed 22 Dec, 2023</p>
                <p className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-center text-s">
                    1
                </p>
                <p className="text-gray-500 underline underline-offset-1">
                    Select all
                </p>
            </div>
            <label htmlFor = 'my-drawer-4' className="flex w-full flex-row p-5 hover:bg-light-grey/30 cursor-pointer" >
                <div className="left flex flex-[2] flex-row gap-3">
                    <input
                        type="checkbox"
                        id=""
                        className="daisy-checkbox  daisy-checkbox-sm mt-2 rounded-sm"
                    />
                    <div className="flex-col">
                        <p className="flex flex-row items-center gap-1">
                            <span className="underline underline-offset-1">
                                Tamara Venatta
                            </span>{' '}
                            <ArrowDropDownSharpIcon />
                        </p>
                        <p>
                            <span className="underline underline-offset-1">
                                #111111111
                            </span>
                            <span className="ml-3">£29.74</span>
                        </p>

                        <div className="mt-2 flex flex-row gap-3">
                            <img
                                className="h-20 w-20 rounded-md object-cover object-center"
                                src="https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/products/65678b9cd4593491cfa021c3/primary.png
                            "
                                alt=""
                            />
                            <div className="product-order-info flex max-w-[400px] flex-col gap-[2px] ">
                                <p>
                                    Warm Dog Harness Lead Set Soft Adjustable
                                    Fleece Pet Puppy Vest with Fur Collar
                                </p>

                                <p>
                                    Quantity{' '}
                                    <span className="font-semibold">1</span>
                                </p>
                                <p>
                                    Color <span>Blue</span>
                                </p>
                                <p>
                                    Size <span>M</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right flex flex-1 flex-row">
                    <div className="left flex-[5]">
                        <p className="text-sm font-medium">
                            Tracked on royal mail
                        </p>
                        <p>Ordered 08 Nov, 2023</p>
                        <div className="my-3 rounded-sm border-[1px] border-gray-400 bg-light-grey p-3">
                            <p className="text-xxs underline underline-offset-1">
                                4206245192748903396184000008292471
                            </p>
                            <p className="text-xxs font-semibold">
                                Dispatched on 22 Dec
                            </p>
                        </div>

                        <div>
                            <p>
                                Deliver To{' '}
                                <ExpandMoreRoundedIcon className="!text-lg" />
                            </p>
                            <p className="text-xs font-semibold">
                                Tamara Venatta
                            </p>
                            <p>PALESTINE, IL</p>
                        </div>
                    </div>
                    <div className="right flex-1 p-2"></div>
                </div>
            </label>
        </section>
    );
}

export default OrderItem;
