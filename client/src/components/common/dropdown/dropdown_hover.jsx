import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function Dropdown_Hover({ button, dropdown_options }) {
    return (
        <div className="dropdown dropdown-hover">
            <div className="header-icons">
                {/* <img
                    className="btn profile-icon bg-transparent border-0 filter p-2 object-contain"
                    tabIndex="0"
                    src={button}
                /> */}
                <PersonOutlinedIcon className='img-icon' />
            </div>

            <div className="dropdown-menu dropdown-menu-bottom-right m-0 min-h-full rounded-none bg-white p-0 mt-2 sm:!hidden">
                {dropdown_options}
            </div>
        </div>
    );
}

export default Dropdown_Hover;
