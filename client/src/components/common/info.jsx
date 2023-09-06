function Info({ title, price, text }) {
    return (
        <div className="card-info">
            <p className="hover:underline underline-offset-2 sm:text-xs font-medium sm:mb-3">{title}</p>
            <div className="card-info-price font-sans ">
                <h2 className="font-bold">£{price}</h2>
                
                    {text ? <p className=" my-2 font-semibold text-red-500 sm:text-xs">{ text}</p> : null}
                
            </div>
        </div>
    );
}

export default Info;
