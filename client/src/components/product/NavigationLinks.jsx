import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { useProducts } from '../../hooks/ScrapeData/scrape';
function Navigation_Links({ className }) {
    const [state] = useProducts()
    return (

        <div
            className={`links flex flex-row items-center gap-2 md+lg:text-xs ${
                className ? className : ''
            }`}
        >
            <p>{state.category[0].toUpperCase() + state.category.slice(1)}</p> <NavigateNextSharpIcon fontSize="2" />{' '}
            <p>Activewear</p>
            <NavigateNextSharpIcon fontSize="2" />
            <p>Women's Activewear Tops</p>
        </div>
    );
}

export default Navigation_Links;
