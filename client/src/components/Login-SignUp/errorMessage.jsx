export default function ErrorMessage({ msg }) {
    return (
        <section className=" absolute !top-[-15px] right-0 !z-10 !max-w-[80%]">
            <div className="promo-error border-1 relative  flex w-full border-red-500 bg-red-100 p-2">
                <p className=" whitespace-[initial] w-full break-words font-light tracking-wider">
                    {msg}
                </p>
                <span className="triangle absolute bottom-[-15px] left-3 !z-[1] h-0 w-0 border-l-[10px] border-r-[10px] border-t-[15px] border-l-transparent border-r-transparent border-t-red-500">
                    <span className="inner-triangle relative right-2.5 top-[-4px] h-0  w-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-red-100  "></span>
                </span>
            </div>
        </section>
    );
}
