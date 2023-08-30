import search_icon from '../../../../assets/search.svg';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import "./navbar.scss"
function Navbar({}) {
    return (
        <section className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="search" />
                    <img src={search_icon} className="h-4 w-4" />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageRoundedIcon className='icon'/>
                        English
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon className='icon'/>
                      
                    </div>
                    <div className="item">
                        <LanguageRoundedIcon className='icon'/>
                      
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className='icon'/>
                      <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className='icon'/>
                      <div className="counter">2</div>
                    </div>
                    <div className="item">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                      alt=""
                      className='profile-photo'/>
                        
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;
