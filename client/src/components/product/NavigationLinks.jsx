import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
function Navigation_Links({ className }) {
    return (
        <div
            className={`links flex flex-row items-center gap-2 md+lg:text-xs ${
                className ? className : ''
            }`}
        >
            <p>Women</p> <NavigateNextSharpIcon fontSize="2" />{' '}
            <p>Activewear</p>
            <NavigateNextSharpIcon fontSize="2" />
            <p>Women's Activewear Tops</p>
        </div>
    );
}

export default Navigation_Links;
