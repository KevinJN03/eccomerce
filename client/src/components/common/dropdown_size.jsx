import arrow from '../../assets/footer-icons/right-arrow.png';

function Dropdown_Size({ title, options }) {
    return (
        <>
            <details className="dropdown mb-2 w-full bg-white ">
                <summary className="btn m-1 w-full justify-between rounded-none bg-white border-1 ">
                    <p className='text-xs'>{title}</p>
                    <span className="arrow-wrapper">
                        <img src={arrow} className='down-arrow'/>
                    </span>
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {options.map((option) => {
                        return (
                            <li>
                                <a>{option}</a>
                            </li>
                        );
                    })}
                </ul>
            </details>
        </>
    );
}

export default Dropdown_Size;
