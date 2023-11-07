import { Link, useLocation } from 'react-router-dom';
import order_icon from '../../assets/icons/profile-icons/package.png';

import Header from './header';
import Empty_Body from './empty-body';
function My_Orders({}) {
    return (
        <section className="my-orders">
            <Header icon={order_icon} text={'MY ORDERS'} />
            <Empty_Body
                text={{
                    small: 'Best get shopping GLAMO pronto…',
                    big: 'YOU CURRENTLY HAVE NO ORDERS',
                    btn: 'START SHOPPING'
                }}
                link={'/'}
            />
        </section>
    );
}

export default My_Orders;
