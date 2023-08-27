import DropDown_Detail from '../common/dropdown/dropdown_detail';

function Product_Detail({ details }) {
    const returnDetail = () => {
        return details.map((item) => {
            return <li>{item}</li>;
        });
    };
    return (
        <section id="Product Detail">
            <DropDown_Detail
                details={returnDetail()}
                header={'Product Details'}
            />
        </section>
    );
}

export default Product_Detail;
