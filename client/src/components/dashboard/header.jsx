function Header({ text, icon, description, buttonText, buttonClick }) {
    return (
        <section className="user-header">
            <div className="top flex flex-col gap-y-4 bg-white p-4 lg:min-h-[160px]">
                <img src={icon} className={'h-12 w-12'} />
                <h3 className="text-3xl font-bold !text-primary">{text}</h3>
                {description && <p className="text-sm">{description}</p>}
                {buttonText && (
                    <button
                        type="button"
                        onClick={buttonClick}
                        className="mb-3 self-start border-2 px-16 py-2 font-gotham text-lg !font-bold hover:bg-grey-100"
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </section>
    );
}

export default Header;
