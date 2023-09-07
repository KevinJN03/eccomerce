import Header_link from './header-category-link';

function Header_Category({ category }) {
    const menCategory = () => {
        return (
            <section id="header_category-container">
                <Header_link text="New In" />
                <Header_link text="Clothing" />
                <Header_link text="Shoes" />
                <Header_link text="Accessories" />
                <Header_link text="SportsWear" />
                <Header_link text="Summer" />
                <Header_link text="Brands" />
                <Header_link text="TopMan" />
                <Header_link text="Marketplace" />
                <div className="parallelogram flex h-full w-20 items-center justify-center bg-red-800 font-semibold ">
                    <Header_link text="Outlet" />
                </div>
            </section>
        );
    };
    const womenCategory = () => {
        return (
            <section id="header_category-container">
                <Header_link text="New In" />
                <Header_link text="Clothing" />
                <Header_link text="Dresses" />
                <Header_link text="Shoes" />
                <Header_link text="Accessories" />
                <Header_link text="Face + Body" />
                <Header_link text="TopShop" />
                <Header_link text="SportsWear" />
                <Header_link text="Summer" />
                <Header_link text="Brands" />
                <Header_link text="Marketplace" />
                <div className="parallelogram flex h-full w-20 items-center justify-center bg-red-800 font-semibold ">
                    <Header_link text="Outlet" />
                </div>
            </section>
        );
    };

    return <>{category ? menCategory() : womenCategory()}</>;
}

export default Header_Category;
