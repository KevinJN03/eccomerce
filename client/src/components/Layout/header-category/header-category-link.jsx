import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory.jsx';

function Header_link({ text, link }) {
    const [state, dispatch] = useGenderCategory();
    return (
        <Link
            onClick={() =>
                dispatch({
                    type: 'changeProductCategory',
                    productCategory: text,
                })
            }
            className="header-link text-xxs tracking-wider"
            to={link ? link : `/${state.gender}/${text.toLowerCase()}`}
        >
            {text}
        </Link>
    );
}

export default Header_link;
