import { useState } from 'react';
import DropDown_Detail from '../common/dropdown/dropdown_detail';

function Product_Detail({ details }) {
    // const returnDetail = () => {
    //     return details.map((item, index) => {
    //         return <li key={index}>{item}</li>;
    //     });
    // };

    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };
    return (
        <section id="product-detail">
            <DropDown_Detail
                show={show}
                toggleShow={toggleShow}
                details={details}
                header={'Product Details'}
            />
        </section>
    );
}

export default Product_Detail;
