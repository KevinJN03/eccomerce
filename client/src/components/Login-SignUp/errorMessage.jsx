export default function ErrorMessage({ msg, className }) {
    return (
        <section
            className={`${
                className || ''
            } absolute right-0 top-[-15px] !z-10 !max-w-[80%]`}
        >
            <div className="border-2 relative  flex w-full border-red-500  bg-red-100 p-3">
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
export function ErrorMessagePointerUp({ msg, className }) {
    return (
        <section
            className={`${
                className || ''
            } absolute  right-0 top-20 !z-10`}
        >
            <div className="promo-error !border-2 relative top-[-5px] z-10 flex w-full border-red-500  bg-red-100 p-2 w-full">
                <span className="triangle absolute left-10 top-[-14px] !z-[1] h-0 w-0 border-b-[15px] border-l-[10px] border-r-[10px] border-b-red-500 border-l-transparent border-r-transparent">
                    <span className="inner-triangle relative right-2  top-[-20px] h-0  w-0 border-b-[12px] border-l-[8px] border-r-[8px] border-b-red-100 border-l-transparent border-r-transparent  "></span>
                </span>
                <p className="!w-full p-0 !m-0 font-light tracking-wider ">{msg}</p>
            </div>
        </section>
    );
}

export function BetaErrorMessage({ msg, className }) {
    return (
        <section
            className={`${
                className || ''
            } absolute right-0 top-[-15px] !z-10 !max-w-[80%]`}
        >
            <div className="border-2 relative  flex w-full border-red-500  bg-red-100 p-2">
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