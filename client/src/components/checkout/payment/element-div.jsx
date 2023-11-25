export function ElementDiv({ label, id, icon, className }) {
    return (
        <div className={`${className} input-container relative flex flex-wrap`}>
            <label htmlFor={id} className="w-full basis-full">
                {label}
            </label>
            <section className="relative">
                <div id={id}></div>
                {icon && (
                    <img
                        src={icon.img}
                        alt={icon.alt}
                        className="absolute right-3 top-2/4 h-6 w-6 translate-y-[-50%]"
                    />
                )}
            </section>
        </div>
    );
}

export default ElementDiv;
