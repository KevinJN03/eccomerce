import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

function Dropdown_Hover({ button, dropdown_options }) {
    return (
        <div className="dropdown dropdown-hover">
            <div className="header-icons">
                <PersonOutlinedIcon className="img-icon" />
            </div>

            <div className="dropdown-menu dropdown-menu-bottom-right m-0 mt-2 min-h-full !rounded-none bg-white p-0 sm:!hidden">
                {dropdown_options}
            </div>
        </div>
    );
}

export default Dropdown_Hover;
