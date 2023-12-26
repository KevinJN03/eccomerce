
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
function Header({}) {
    return (
        <header className="flex w-full flex-row justify-between border-b-2 py-4 pl-6 pr-12 items-center">
            <h2 className="flex-1 text-2xl font-semibold">Orders & Delivery</h2>
            <section className="flex flex-[0.8] flex-row gap-x-6 self-end">
                <div className=" search-box flex w-full flex-row items-center rounded-sm border-[1px] border-black px-3 py-2 ">
                    <SearchRoundedIcon className="mr-1" />
                    <input
                        type="text"
                        className="border-none text-s outline-none"
                        placeholder="Search your orders"
                    />
                </div>
                <div className="flex w-fit flex-row items-center gap-x-2">
                    <SettingsRoundedIcon />
                    <p className="whitespace-nowrap">Delivery settings</p>
                </div>
            </section>
        </header>
    );
}

export default Header;
