import Collection from '../product/Collection/collection.jsx';
function Recommended({}) {
    return (
        <section id="Recommended" className="flex flex-col ">
            <h1 className="mb-4 text-3xl font-bold">Recommended for you</h1>
            <Collection />
            <div className="load-more-btn-wrapper my-6 flex w-full items-center justify-center">
                <button
                    type="button"
                    className="my-3 w-2/3 rounded-full bg-gray-100 py-6 font-semibold"
                >
                    Load more
                </button>
            </div>
        </section>
    );
}

export default Recommended;
