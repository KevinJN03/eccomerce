import Input from './input';
export default function Alert_Item({
    icon,
    title,
    description,
    textMessage,
    check,
    setCheck,
}) {
    return (
        <section className="alert-item mb-3 ml-[-24px] flex h-36 flex-row border-t-2">
            <div className="left flex flex-[1.5] items-center justify-center bg-[var(--light-grey)]">
                <img
                    src={icon}
                    alt=""
                    className="h-16 w-16 rounded-full bg-white p-2"
                />
            </div>
            <div className="middle !m-0 flex h-full flex-[4] flex-col gap-y-3 px-3 py-4">
                <h3 className="font-bold tracking-wide">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
            <div className="right flex h-full flex-1 flex-col gap-y-6 py-4 ">
                <Input
                    text={'Email'}
                    check={check}
                    setCheck={setCheck}
                    property={'email'}
                />
                {textMessage && (
                    <Input
                        text={'Text'}
                        check={check}
                        setCheck={setCheck}
                        property={'text'}
                    />
                )}
            </div>
        </section>
    );
}
