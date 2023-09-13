import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/ScrapeData/scrape";

function Header_link({ text, link }) {

    const [state ] = useProducts()
    return (
        <Link className="header-link text-s tracking-wider" to={link ? link : `/${state.category}/product`}>
            {text}
        </Link>
    );
}

export default Header_link;
