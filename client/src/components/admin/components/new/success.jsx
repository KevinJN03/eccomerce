import { Link } from 'react-router-dom';
import icon from './wired-outline-1103-confetti.apng';
function Success({userId, setSuccess}) {
    return (
        <section className='success flex flex-col gap-y-2 justify-center items-center w-full'>
            <img src={icon} alt="confetti" className='w-32 h-32'/>
            <h3 className='bg-green-100 py-2 px-4'>USER SUCCESSFULLY CREATED!!</h3>
            <Link to={`/admin/users/${userId}`} className='bg-slate-50 py-2 px-4'>GO TO USER</Link>
            <button className='bg-slate-50 py-2 px-4' onClick={() => setSuccess(false)}>CREATE ANOTHER USER</button>
        </section>
    );
}

export default Success;
