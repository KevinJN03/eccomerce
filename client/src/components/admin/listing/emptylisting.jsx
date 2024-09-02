import boxIcon from '../../../assets/icons/magic-box.png';
import { useListingPageContext } from '../../../context/listingPageContext';
import _ from 'lodash';
function EmptyListing({}) {
    const {
        searchParams,
        setSearchParams,
        setChecks,
        checks,
        setLoading,
        defaultChecks,
        setTriggerSearch,
    } = useListingPageContext();

    return (
        <section className="mt-20 flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-light-grey p-5 ">
                <img
                    key={'boxIcon'}
                    src={boxIcon}
                    className="h-20 w-20"
                    alt="open-delivered-box"
                />
            </div>

            <p className="text-lg font-semibold">
                {searchParams.get('searchText')
                    ? 'No listings matched your search query.'
                    : checks?.listing_status == 'active'
                      ? `You don't have any active items.
                                                `
                      : 'No listings matched these filters.'}
            </p>

            <button
                onClick={() => {
                    setLoading(() => true);

                    if (searchParams.get('searchText')) {
                        setChecks((prevState) => ({
                            ...prevState,
                            searchText: '',
                        }));
                        searchParams.delete('searchText');
                        setSearchParams(searchParams);
                    } else {
                        setChecks(() => defaultChecks);
                        setSearchParams({});
                    }
                }}
                type="button"
                className="rounded border border-dark-gray px-3 py-2 text-sm font-medium transition-all hover:bg-light-grey"
            >
                {searchParams.get('searchText')
                    ? 'Clear Search'
                    : 'Clear Filters'}
            </button>
        </section>
    );
}

export default EmptyListing;
