import { useEffect } from 'react';
import { useLayoutContext } from '../../context/layoutContext';
import { Link } from 'react-router-dom';
import disableLayout from '../../hooks/disableLayout';
import "../../CSS/admin.css"
import glamo_logo from "../../assets/icons/glamo-black-logo.svg"
function Admin({}) {
    
    disableLayout();
    
    return (
        <section id="admin">
            <section id="admin-wrapper">
                <div id="admin-header">
                    <img src={glamo_logo}/>
                    <span><h1>ADMIN PORTAL</h1></span>
                </div>
            </section>
        </section>
    );
}

export default Admin;
