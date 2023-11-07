import { Link } from 'react-router-dom';
import order_icon from '../../assets/icons/profile-icons/package.png';
import CheckroomSharpIcon from '@mui/icons-material/CheckroomSharp';
function My_Orders({}) {
    return (
        <section className="my-orders">
            <div className="top flex h-40 flex-col gap-y-4 bg-white p-4">
                <img src={order_icon} className={'h-12 w-12'} />
                <h3 className="text-3xl font-bold !text-primary">MY ORDERS</h3>
            </div>
            <div className="bottom mt-2 flex !w-full flex-col items-center justify-center bg-white py-5">
                <CheckroomSharpIcon className="mb-8 !text-6xl" />
                <div className="flex w-[60%] flex-col items-center gap-y-5">
                    <h3 className="whitespace-nowrap text-xl font-bold !text-primary">
                        YOU CURRENTLY HAVE NO ORDERS
                    </h3>
                    <p className='text-sm'>Best get shopping GLAMO pronto…</p>
                    < a href="/"
                       target='blank'
                        className="w-fit whitespace-nowrap !bg-primary font-bold text-white py-[10px] w-full text-center tracking-wide"
                    >
                        START SHOPPING
                    </a>
                </div>
            </div>
        </section>
    );
}

export default My_Orders;
