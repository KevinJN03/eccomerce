import Collection from '../product/Collection/collection.jsx';
import { useWindowSize } from '@uidotdev/usehooks';
function Recommended({}) {
    const screenSize = useWindowSize();
    return (
        <section id="Recommended" className="flex flex-col ">
            <h1 className="mb-4 text-3xl font-bold sm:mx-5 sm:text-lg sm:font-semibold md:ml-8">
                You might also like
            </h1>
            <Collection />
            <div className="load-more-btn-wrapper my-6 flex w-full items-center justify-center">
                {screenSize.width > 980 && (
                    <button
                        type="button"
                        className="my-3 w-2/3 rounded-full bg-gray-100 py-6 font-semibold"
                    >
                        Load more
                    </button>
                )}
            </div>
        </section>
    );
}

export default Recommended;
