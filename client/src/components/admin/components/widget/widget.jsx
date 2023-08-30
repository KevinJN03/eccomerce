import MovingOutlinedIcon from '@mui/icons-material/MovingOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
function Widget({type}) {
    let data;

    // tempory amount

    const amount = 100;
    const diff= 20;
    if(type == "user"){
         data = {
            title: "USERS",
            isMoney: false,
            link: "See all users",
            icon: (
                <><PersonOutlineOutlinedIcon className='icon'/></>
            )
        }
    } else if (type == "order"){
         data = {
            title: "ORDERS",
            isMoney: false,
            link: "View all orders",
            icon: (
                <ShoppingCartOutlinedIcon className='icon'/>
            )
        }
    }
    else if (type == "earning"){
         data = {
            title: "EARNINGS",
            isMoney: true,
            link: "View net earnings",
            icon: (
                <MonetizationOnOutlinedIcon className='icon'/>
            )
        }
    }
    else if (type == "balance"){
         data = {
            title: "BALANCE",
            isMoney: true,
            link: "See Details",
            icon: (
                <AccountBalanceOutlinedIcon className='icon'/>
            )
        }
    }
    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "£"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                
                <div className="percentage positive">
                <MovingOutlinedIcon/>
                    20%</div>
                {data.icon}

            </div>
        </div>
    );
}

export default Widget;
