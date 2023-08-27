function Dropdown_Hover({ button, dropdown_options }) {
    return (
        <div className="dropdown dropdown-hover min-h-full w-full">
            <div className="header-icon">
                <img
                    className="btn img-icon m-0 border-0 bg-transparent p-0"
                    tabIndex="0"
                    src={button}
                />
            </div>

            <div className="dropdown-menu dropdown-menu-bottom-right m-0 min-h-full rounded-none bg-white p-0 mt-2">
                {dropdown_options}
            </div>
        </div>
    );
}

export default Dropdown_Hover;
