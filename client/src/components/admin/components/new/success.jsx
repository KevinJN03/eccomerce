import { Link } from 'react-router-dom';
import icon from './wired-outline-1103-confetti.apng';
function Success({ userId, setSuccess, type, id }) {
    return (
        <section className="success flex w-full flex-col items-center justify-center gap-y-2">
            <img src={icon} alt="confetti" className="h-32 w-32" />
            <h3 className="bg-green-100 px-4 py-2">
                {type === 'new'
                    ? `USER SUCCESSFULLY CREATED!!`
                    : 'USER SUCCESSFULLY EDITED!!'}
            </h3>
            <a
                href={`/admin/users/${userId || id}`}
                className="bg-slate-50 px-4 py-2"
            >
                GO TO USER
            </a>
            <a
                href="/admin/users/new"
                className="bg-slate-50 px-4 py-2"
                // onClick={() => setSuccess(false)}
            >
                CREATE ANOTHER USER
            </a>
        </section>
    );
}

export default Success;
