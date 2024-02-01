import { AddRounded } from '@mui/icons-material';
import SearchInput from '../order/home/searchInput';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useListingPageContext } from '../../../context/listingPageContext';

function Header({}) {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const { triggerSearch, setTriggerSearch, setChecks, checks } =
        useListingPageContext();
    const handleClick = () => {
        setTriggerSearch((prevState) => !prevState);
    };
    return (
        <header className="flex w-full flex-row items-center justify-between border-b-2 py-4 pl-6 pr-12">
            <h2 className="flex-1 text-2xl font-semibold">Listings</h2>

            <section className="flex flex-[0.6] flex-row gap-x-6 self-end">
                <SearchInput
                    handleOnchange={(e) =>
                        setChecks((prevState) => ({
                            ...prevState,
                            searchText: e.target.value,
                        }))
                    }
                    searchText={checks?.searchText}
                    handleClick={handleClick}
                    placeHolder="Enter a title, id"
                />
                <div
                    onClick={() => navigate('new')}
                    className="flex cursor-pointer flex-row items-center gap-1 rounded-sm bg-black px-3 hover:bg-opacity-80"
                >
                    <AddRounded className="!fill-white" />
                    <p className="whitespace-nowrap font-medium text-white">
                        Add a listing
                    </p>
                </div>
            </section>
        </header>
    );
}

export default Header;
