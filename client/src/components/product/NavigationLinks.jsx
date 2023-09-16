import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import { useGenderCategory } from '../../hooks/genderCategory';
import { Link } from 'react-router-dom';
function Navigation_Links({ className, product }) {
    const [state] = useGenderCategory();
console.log("navigationProduct", product)
 debugger 
    return (
        <div
            className={`links flex flex-row items-center gap-2 md+lg:text-xs whitespace-nowrap pr-4 ${
                className ? className : ''
            }`}
        >
            <Link to='/' className='text-s'>Home</Link>
            <NavigateNextSharpIcon fontSize="2" />
            {
                product ? 
                <>
                 <p className='text-s'>{product.gender[0].toUpperCase() +product.gender.slice(1)}</p>{' '}
            <NavigateNextSharpIcon fontSize="2" /> <Link to ={`/${product.gender}/${product.category}`} className='text-s ' >{product.category[0].toUpperCase() + product.category.slice(1)}</Link>
              
                </> : 
                <>
                <p className='text-s'>{state.gender[0].toUpperCase() + state.gender.slice(1)}</p>{' '}
           <NavigateNextSharpIcon fontSize="2" /> <Link to ={`/${state.gender}/${state.productCategory}`} className='text-s ' >{state.productCategory[0].toUpperCase() + state.productCategory.slice(1)}</Link>
               
               </>

            }
           
           { 
           product && 
           <>
           <NavigateNextSharpIcon fontSize="2" />
            <p className='text-s !text-ellipsis !whitespace-nowrap overflow-hidden '>{product.title}</p>
            
           </>
           
            
            }
        </div>
    );
}

export default Navigation_Links;
