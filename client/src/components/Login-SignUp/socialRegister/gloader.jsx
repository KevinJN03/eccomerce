function GLoader({ size }) {
    return (
        <div className="relative h-fit w-fit">
            <p className="absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] font-gotham text-xl font-semibold">
                G
            </p>
            <div
                className={`spinner-simple spinner-${
                    size || 'xl'
                } [--spinner-color:var(--slate-11)]`}
            ></div>
        </div>
    );
}

export default GLoader;
