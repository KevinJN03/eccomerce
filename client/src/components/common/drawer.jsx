import Rating from './rating';
import Dropdown_Size from './dropdown/dropdown_size';
import Input_S from './input/input_s';
import { useState } from 'react';
function Drawer({ product }) {
    const [fit, setFit] = useState(null);

    const handleFitClick = (e) => {
        setFit(e.target.textContent)
        console.log(fit)
    }
    return (
        <>
            <input
                type="checkbox"
                id="drawer-right"
                className="drawer-toggle"
            />
            <label className="overlay" htmlFor="drawer-right"></label>
            <div className="drawer drawer-right max-w-lg sm:w-[90vw] sm:place-items-center md+lg:px-6">
                <div className="drawer-content flex h-full flex-col pt-10 sm:w-[80%] sm:px-0 ">
                    <div className="review-top-container ">
                        <p className="absolute left-2 top-6 pl-6 text-sm font-semibold">
                            Write a review
                        </p>
                        <label
                            htmlFor="drawer-right"
                            className="btn btn-circle btn-ghost btn-sm absolute right-6 top-4"
                        >
                            ✕
                        </label>
                    </div>

                    <section
                        id="review-container"
                        className="mb-4 mt-14 flex flex-row gap-3"
                    >
                        <div className="review-img-container h-36 w-24 sm:h-24">
                            <img
                                src={product.images[0]}
                                className="h-full w-full object-contain sm:object-cover "
                            ></img>
                        </div>
                        <div className="review-text-container">
                            <p>{product.title}</p>
                            {<Rating />}
                        </div>
                    </section>
                    <section id="rating-size-container">
                        <div
                            id="review-size-container"
                            className="flex flex-col"
                        >
                            <Dropdown_Size
                                title={'Size Purchased'}
                                options={product.size}
                            />
                            <Dropdown_Size
                                title={'Your Usual Size'}
                                options={product.size}
                            />
                        </div>

                        <div id="how-it-fit-wrrapper">
                            <p className="mt-2 text-sm font-medium">
                                How did it fit?
                            </p>
                            <div className="fit-btn-wrapper mt-3 flex max-w-full flex-row sm:grid sm:grid-cols-3 sm:gap-1 md+lg:gap-3">
                                <button
                                    type="button"
                                    onClick={(e) => handleFitClick(e)}
                                    className={`border-1 flex  justify-center whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold sm:text-xs ${fit == 'True to Size' && 'border-black'}`}
                                >
                                    True to Size
                                </button>
                                <button
                                    onClick={(e) => handleFitClick(e)}
                                    type="button"
                                    className={`border-1 flex  justify-center whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold sm:text-xs ${fit == 'Runs small' && 'border-black'}`}
                                >
                                    Runs small
                                </button>
                                <button
                                    onClick={(e) => handleFitClick(e)}
                                    type="button"
                                    className={`border-1 flex  justify-center whitespace-nowrap rounded-full px-4 py-3 text-sm font-semibold sm:text-xs ${fit == 'Runs Large' && 'border-black'}`}
                                >
                                    Runs Large
                                </button>
                            </div>
                        </div>
                        <div
                            id="give-review-container"
                            className="mt-5 flex flex-col gap-3"
                        >
                            {/* <input type="text"placeholder="Give your review a title" className="border-1 px-3 p-4 text-sm"></input> */}
                            <Input_S placeholder={'Give your review a title'} />
                            <textarea
                                type="text"
                                placeholder="Write a short review"
                                className="border-1 mb-3 h-32 w-full resize-none px-3 pt-3 text-s"
                            ></textarea>
                        </div>
                        <div
                            id="submit-review"
                            className="flex w-full flex-col gap-3 sm:mb-5"
                        >
                            <p className="text-sm font-semibold">
                                Submit review as
                            </p>
                            <Input_S placeholder={'Your name'} />
                            <Input_S placeholder={'Your email address'} />
                            <label
                                htmlFor="drawer-right"
                                id="submit-review-btn"
                                className="mt-3 flex h-14 items-center justify-center rounded-full bg-black text-sm font-semibold text-white"
                            >
                                Submit Review
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Drawer;
