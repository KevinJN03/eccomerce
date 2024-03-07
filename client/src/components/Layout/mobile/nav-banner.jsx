import img1 from '../../../assets/menu-bar-images/men/img1.png';
import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory';
function Nav_Banner({ small, img, title, handleClick, home }) {

    const [state, dispatch] = useGenderCategory()

    const updateCategory = () => {
handleClick()
dispatch({type: 'changeProductCategory', productCategory: title.toLowerCase()})
    }
    return (
        <Link to={home ? '/' : `/${state.gender}/${title.toLowerCase()}`}
            className={`nav-banner flex flex-row ${
                small ? 'h-16' : 'h-24'
            } mx-3 mt-3 items-center justify-between bg-[var(--light-grey)]`}
            onClick={updateCategory}
        >
            <p className="pl-3 text-base font-bold tracking-wider ">{title}</p>
            <img
                src={img}
                alt=""
                className={`h-full object-contain ${small ? 'w-16 object-cover' : 'w-24'}`}
            />
        </Link>
    );
}

export default Nav_Banner;
