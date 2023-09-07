function Info({ title, price, text }) {
    return (
        <div className="card-info">
            <p className="font-medium underline-offset-2 hover:underline sm:mb-3 sm:text-xs">
                {title}
            </p>
            <div className="card-info-price font-sans ">
                <h2 className="font-bold">£{price}</h2>

                {text ? (
                    <p className=" my-2 font-semibold text-red-500 sm:text-xs">
                        {text}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

export default Info;
