import { Link } from 'react-router-dom';
import { useGenderCategory } from '../../../hooks/genderCategory.jsx';

function Header_link({ text, link }) {
    const [state] = useGenderCategory();
    return (
        <Link
            className="header-link text-s tracking-wider"
            to={link ? link : `/${state.category}/product`}
        >
            {text}
        </Link>
    );
}

export default Header_link;
