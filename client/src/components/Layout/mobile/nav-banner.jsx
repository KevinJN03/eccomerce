import img1 from '../../../assets/menu-bar-images/men/img1.png';

function Nav_Banner({ small, img, title }) {
    return (
        <div
            className={`nav-banner flex flex-row ${
                small ? 'h-14' : 'h-24'
            } mx-3 mt-3 items-center justify-between bg-[var(--light-grey)]`}
        >
            <p className="pl-3 text-lg">{title}</p>
            <img
                src={img}
                alt=""
                className={`h-full object-cover ${small ? 'w-14' : 'w-24'}`}
            />
        </div>
    );
}

export default Nav_Banner;
