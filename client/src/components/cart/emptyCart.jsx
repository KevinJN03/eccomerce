import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/ScrapeData/scrape';
function Empty_Cart({}){
    const [state] = useProducts();
    const gender = state.category
  return (
    <section className='emptyCart flex flex-col self-center items-center gap-3 w-[90vw]'>
      <LocalMallOutlinedIcon className='!text-4xl'/>
      <p className='font-bold text-lg'>Your bag is empty</p>
      <p className='max-w-sm text-center'>Items remain in your bag for 60 minutes, and then they’re moved to your Saved Items.</p>
      <Link to='wishlist' className='text-white text-s tracking-wider font-bold bg-[var(--green)] w-full max-w-[300px] py-3 text-center'>
      VIEW SAVED ITEMS
      </Link>
        <Link to={`/${gender}/product`} className='underline text-s'>Continue Shopping</Link>
      
    </section>
  )
};

export default Empty_Cart
