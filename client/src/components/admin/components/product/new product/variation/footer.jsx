import { useNewProduct } from '../../../../../../context/newProductContext';

function Footer({}) {
    const { description, title, variations, files, category, gender, profile } =
        useNewProduct();
const filteredFiles = files.filter((item) => item.isDragDisabled == false)
    const values = {
        description: description.getCurrentContent()
        ,
        title,
        variations,
        files : filteredFiles,
        category,
        gender,
        profile
    };
    return (
        <div className="new-product-footer flex gap-2 p-6 font-medium">
            <button
                className="border-none hover:bg-[var(--light-grey)]"
                onClick={() => navigate('/admin/products')}
            >
                Cancel
            </button>
            <button className="theme-btn ml-auto">Preview</button>
            <button className="theme-btn">Save as draft</button>
            <button
                className="theme-btn bg-black text-white"
                onClick={() => console.log(values)}
            >
                Publish
            </button>
        </div>
    );
}

export default Footer;
