import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { useDarkMode } from '../../../../context/darkModeContext';
import glamo_icon from '../../../../../dist/assets/glamo-black-logo-61d90fbe.svg';

import shop_icon from '../../../../assets/icons/shop.png';
import axios from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';

import optionsArray from './sideBarOption';
import { KeyboardDoubleArrowRightRounded } from '@mui/icons-material';
function SideBar({}) {
    const { darkMode, dispatch } = useDarkMode();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await axios.get('user/logout');
            navigate('/admin/login');
        } catch (error) {
            console.error('error while loginning out', error);
        }
    };

    const location = useLocation();

    const route = location?.pathname?.split('/').slice(0, 3).join('/');
    // .substring(1);

    return (
        <section className="fixed left-0 top-0 flex h-screen w-full max-w-56 flex-col">
            <section className="side-bar h-full w-full overflow-y-scroll  border-r border-dark-gray/50 ">
                <div className="top my-5 flex pl-4">
                    <Link
                        to="/admin"
                        className="flex flex-row flex-nowrap items-center"
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
                            <img
                                src={shop_icon}
                                alt="shop icon"
                                className="h-5 w-5 invert"
                            />
                        </span>

                        <img
                            src={glamo_icon}
                            alt="glamo icon"
                            className="h-9 w-20 object-contain"
                        />
                    </Link>
                </div>
                <div className="center w-full">
                    <ul>
                        {optionsArray.map(({ link, title, icon }) => {
                            return (
                                <Link
                                    key={title}
                                    to={link || '/admin'}
                                    className={`w-full py-2 pl-4 ${
                                        route == link ? 'bg-light-grey' : ''
                                    }`}
                                >
                                    {icon}
                                    <p className="ml-3">{title}</p>
                                </Link>
                            );
                        })}

                        <button
                            type="button"
                            className="py-2 pl-4"
                            onClick={logout}
                        >
                            <LogoutOutlinedIcon className="icons" />
                            <span>Logout</span>
                        </button>
                    </ul>
                </div>{' '}
            </section>
            <div className="flex w-full flex-row flex-nowrap items-center border pl-4">
                <div className="left flex flex-row flex-nowrap gap-3 items-center py-3">
                    <div className="h-6 w-6 rounded-full bg-black"></div>
                    <p className='text-xs'>Kevin Jean</p>
                </div>
                <div className="right ml-auto px-2 py-3 border">
                   
                        <KeyboardDoubleArrowRightRounded className='!rotate-180'/>
                    
                </div>
            </div>
        </section>
    );
}

export default SideBar;
