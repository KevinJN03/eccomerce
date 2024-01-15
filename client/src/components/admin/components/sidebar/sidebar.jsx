
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { useDarkMode } from '../../../../context/darkModeContext';
import glamo_icon from '../../../../../dist/assets/glamo-black-logo-61d90fbe.svg';
import axios from '../../../../api/axios';
import { v4 as uuidv4 } from 'uuid';

import optionsArray from './sideBarOption';
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
    console.log(location);
    const route = location?.pathname?.split('/').slice(0, 3).join('/');
    // .substring(1);

    return (
        <section className="side-bar h-screen max-h-screen border-r border-dark-gray/50 !w-full  max-w-xs overflow-y-scroll ">
            <div className="top">
                <Link to="/admin">
                    {/* <span className="logo">glamo</span> */}
                    <img src={glamo_icon} alt="glamo icon" className="w-28" />
                </Link>
            </div>
            <div className="center w-full">
                <ul>
                    {optionsArray.map(({ link, title, icon }) => {
                        return (
                            <Link
                                key={title}
                                to={link || '/admin'}
                                className={`py-2 pl-4 w-full ${
                                    route == link ? 'bg-light-grey' : ''
                                }`}
                            >
                                {icon}
                                <p className='ml-3'>{title}</p>
                            </Link>
                        );
                    })}

                    <button type="button" className="" onClick={logout}>
                        <LogoutOutlinedIcon className="icons" />
                        <span>Logout</span>
                    </button>
                </ul>
            </div>
        </section>
    );
}

export default SideBar;
