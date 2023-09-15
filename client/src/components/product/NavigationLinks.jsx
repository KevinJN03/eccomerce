import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { useGenderCategory } from '../../hooks/genderCategory';
import { Link } from 'react-router-dom';
function Navigation_Links({ className, productName }) {
    const [state] = useGenderCategory();

    return (
        <div
            className={`links flex flex-row items-center gap-2 md+lg:text-xs whitespace-nowrap pr-4 ${
                className ? className : ''
            }`}
        >
            <Link to='/' className='text-s'>Home</Link>
            <NavigateNextSharpIcon fontSize="2" />

            <p className='text-s'>{state.gender[0].toUpperCase() + state.gender.slice(1)}</p>{' '}
            <NavigateNextSharpIcon fontSize="2" /> <Link to ={`/${state.gender}/${state.productCategory}`} className='text-s ' >{state.productCategory[0].toUpperCase() + state.productCategory.slice(1)}</Link>
           { 
           productName && 
           <>
           <NavigateNextSharpIcon fontSize="2" />
            <p className='text-s !text-ellipsis !whitespace-nowrap overflow-hidden '>{productName}</p>
            
           </>
           
            
            }
        </div>
    );
}

export default Navigation_Links;
