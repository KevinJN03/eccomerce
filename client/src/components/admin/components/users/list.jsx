import SideBar from '../sidebar/sidebar.jsx';
import Navbar from '../navbar/navbar.jsx';
import './list.scss';
import Datatable from './datatable/datatable.jsx';
import { Outlet } from 'react-router-dom';
function List() {
    
    return (
        <>
        <div className="list">
            <SideBar />
            <div className="listContainer">
                <Navbar />
                <Datatable type="User"/>
               
            </div>
        </div>
        </>
        
    );
}

export default List;
