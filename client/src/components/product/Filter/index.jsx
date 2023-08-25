import Category from "./category.jsx"
import Color from "./color.jsx"
import Size from "./size.jsx"

function Index(){
    return(
        <section id="filter-nav">
            <Size/>
            <Color />
            <Category />
        </section>
    )

}

export default Index