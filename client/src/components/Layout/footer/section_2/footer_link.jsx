import { Link } from "react-router-dom"
function Footer_Link({legend, linkArr}){

    return(
        <section id="footer-link">
            <legend>{legend}</legend>
            {linkArr.map((item)=>{
                return(
                    <div key={linkArr.indexOf(item)}>
                        <a href={item.url}>
                        {item.name}
                    </a>
                    </div>
                    
                )
            })}
        </section>
    )

}

export default Footer_Link