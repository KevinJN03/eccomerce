import DropDown_Detail from '../common/dropdown/dropdown_detail';

function Product_Detail({ details,  }) {
    const returnDetail = () => {
        return details.map((item, index) => {
            return <li key={index}>{item}</li>;
        });
    };
    return (
        <section id="product-detail">
            <DropDown_Detail
                details={returnDetail()}
                header={'Product Details'}
            />
        </section>
    );
}

export default Product_Detail;
