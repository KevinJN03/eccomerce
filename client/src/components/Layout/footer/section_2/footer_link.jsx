import { Link } from "react-router-dom"
function Footer_Link({legend, linkArr}){

    return(
        <section id="footer-link">
            <legend>{legend}</legend>
            {linkArr.map((item)=>{
                return(
                    <div key={linkArr.indexOf(item)}>
                        <Link to={item.url}>
                        {item.name}
                    </Link>
                    </div>
                    
                )
            })}
        </section>
    )

}

export default Footer_Link