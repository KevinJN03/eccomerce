function Info({ title, price, text }) {
    return (
        <div className="card-info flex h-full flex-col">
            <p className=" font-poppin font-medium text-[var(--primary-2)] underline-offset-2 hover:underline sm:mb-3 sm:text-xs">
                {title}
            </p>

            <h2 className="font-bold text-[var(--primary-2)]">£{price}</h2>

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
