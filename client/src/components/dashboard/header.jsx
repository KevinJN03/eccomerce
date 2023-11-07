function Header({ text, icon, description }) {
    return (
        <section className="user-header">
            <div className="top flex flex-col gap-y-4 bg-white p-4 lg:min-h-[160px]">
                <img src={icon} className={'h-12 w-12'} />
                <h3 className="text-3xl font-bold !text-primary">{text}</h3>
                {description && <p className="text-sm">{description}</p>}
            </div>
        </section>
    );
}

export default Header;
