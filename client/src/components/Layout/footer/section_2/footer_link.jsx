import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {useWindowSize} from "@uidotdev/usehooks"
function Footer_Link({ legend, linkArr }) {
    const [open, setOpen] = useState(false)

    const screenSize = useWindowSize()

function Mobile_Footer_Link(){
    const [open, setOpen] = useState(false)
    return (
        <>
            
        <div className='sm+md:flex sm+md:flex-row pt-3 py-2 '  onClick={() => setOpen(prevstate => !prevstate)}>

        <legend className='font-bold text-sm'>{legend}</legend>
        <span className='lg:!hidden lg:!underline'>{open ? <RemoveRoundedIcon/> : <AddRoundedIcon/>}</span>
        </div>
        <div className='sm+md:pb-3 border-b-[1px] border-[var(--primary)]'>
          { open && linkArr.map((item) => {
            return (
                <div key={linkArr.indexOf(item)}>
                    <a href={item.url} className='font-light text-s'>{item.name}</a>
                </div>
            );
        })}  
        </div>


        
        
    </>  
    )
}





    return (



       
        <section id="footer-link">
            {screenSize.width <= 980 ? <Mobile_Footer_Link/> :  <><legend className='font-bold text-sm'>{legend}</legend>
           
           
           <div className='sm+md:pb-3 sm+md:border-b-[1px] sm+md:border-[var(--primary)]'>
             {linkArr.map((item) => {
               return (
                   <div key={linkArr.indexOf(item)}>
                       <a href={item.url} className='font-light text-s'>{item.name}</a>
                   </div>
               );
           })}  
           </div>
           
           
           
           </>} 
             

            


            
            
        </section>
    );
}

export default Footer_Link;
