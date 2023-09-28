import './new_product.scss';

export default function New_Product_Header({ title, text }) {
    return (
        <div className='flex flex-col'>
            <div className="title ">{title}</div>
            <p>{text}</p>
        </div>
    );
}
