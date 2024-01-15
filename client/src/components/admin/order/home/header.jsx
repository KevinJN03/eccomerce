import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import { useRef, useState } from 'react';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';
function Header({}) {
    const {
        setSearchResult,
        setSearchingOrder,
        setSearchTerm,
        searchText,
        setSearchText,
    } = useAdminOrderContext();

    const { logoutUser } = UserLogout();
    const inputRef = useRef(null);

    const handleClick = async () => {
        try {
            document.activeElement.blur();
            setSearchResult(() => []);
            setSearchingOrder(true);
            const { data } = await adminAxios.post(`searchOrder`, {
                searchText,
            });
            setSearchTerm(() => searchText);
            setSearchResult(() => data.searchResult);
        } catch (error) {
            console.error('error while getting search result', error);
            logoutUser({ error });
        }
    };

    return (
        <header className="flex w-full flex-row items-center justify-between border-b-2 py-4 pl-6 pr-12">
            <h2 className="flex-1 text-2xl font-semibold">Orders & Delivery</h2>
            <section className="flex flex-[0.6] flex-row gap-x-6 self-end">
                <div className=" search-box border- flex w-full flex-row items-center rounded border-[1px] border-dark-gray pl-3 ">
                    <SearchRoundedIcon className="mr-1 !text-xl" />
                    <input
                        ref={inputRef}
                        value={searchText}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                handleClick();
                            }
                        }}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        type="text"
                        tabIndex="0"
                        className="mr-5 w-full border-none py-2 text-s outline-none"
                        placeholder="Search your orders "
                    />
                    {searchText && (
                        <button
                            onClick={handleClick}
                            className="  flex h-full items-center justify-center  rounded-r-inherit border-l-[1px] border-dark-gray px-3 text-s font-medium hover:bg-light-grey/50"
                        >
                            Search
                        </button>
                    )}
                </div>
                <div className="flex w-fit flex-row items-center gap-x-1">
                    <SettingsRoundedIcon className="!text-xl" />
                    <p className="whitespace-nowrap text-xs font-medium">
                        Delivery settings
                    </p>
                </div>
            </section>
        </header>
    );
}

export default Header;
