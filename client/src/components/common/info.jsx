function Info({ title, price, text }) {
    return (
        <div className="card-info h-full flex flex-col">
            <p className=" font-medium text-xs text-[var(--primary-2)] font-poppin underline-offset-2 hover:underline sm:mb-3 sm:text-xs">
                {title}
            </p>
          
                <h2 className="text-[var(--primary-2)] font-bold">£{price}</h2>

                {/* {text ? (
                    <p className=" font-raleway my-2 text-xs font-semibold text-red-500 sm:text-xs ">
                        {text}
                    </p>
                ) : null} */}
            </div>
        // </div>
    );
}

export default Info;
