function Info({ title, price, text }) {
    return (
        <div className="card-info">
            <p>{title}</p>
            <div className="card-info-price font-sans">
                <h2 className="font-bold">£{price}</h2>
                <p className=" my-2 font-semibold text-red-500">
                    {text ? text : null}
                </p>
            </div>
        </div>
    );
}

export default Info;
