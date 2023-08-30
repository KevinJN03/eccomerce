import SideBar from '../sidebar/sidebar.jsx';
import Navbar from '../navbar/navbar.jsx';
import './list.scss';
import Datatable from './datatable/datable.jsx';
function List() {
    return (
        <div className="list">
            <SideBar />
            <div className="listContainer">
                <Navbar />
                <Datatable/>
            </div>
        </div>
    );
}

export default List;
