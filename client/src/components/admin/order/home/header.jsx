import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import { useRef, useState } from 'react';
import UserLogout from '../../../../hooks/userLogout';
import { adminAxios } from '../../../../api/axios';
import SearchInput from './searchInput';
import ThemeBtn from '../../../buttons/themeBtn.jsx';
import BubbleButton from '../../../buttons/bubbleButton.jsx';
import { useNavigate } from 'react-router-dom';
function Header({}) {
    const {
        setSearchResult,
        setSearchingOrder,
        setSearchTerm,
        searchText,
        setSearchText,
    } = useAdminOrderContext();

    const { logoutUser } = UserLogout();
    const navigate = useNavigate();

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
                <SearchInput
                    handleOnchange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    placeHolder={'Search your orders'}
                    handleClick={handleClick}
                    searchText={searchText}
                />
                <BubbleButton
                    bg={'bg-light-grey'}
                    handleClick={() => {
                        navigate(`/admin/delivery`);
                    }}
                >
                    <div className="flex w-fit flex-row flex-nowrap items-center gap-x-1 text-white">
                        <SettingsRoundedIcon className="!text-xl" />
                        <p className="whitespace-nowrap text-xs font-medium text-black">
                            Delivery settings
                        </p>
                    </div>
                </BubbleButton>
            </section>
        </header>
    );
}

export default Header;
