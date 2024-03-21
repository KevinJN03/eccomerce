import Label from './label';

function Section({
    children,
    title,
    description,
    disableAsterisk,
    noWhiteSpace,
    note,
}) {
    return (
        <section className=" flex flex-nowrap items-start gap-20">
            <div className="left w-full flex-[0.7]">
                {' '}
                <Label
                    {...{ disableAsterisk, title, description, noWhiteSpace }}
                />
            </div>
            <div className="right w-full flex-[2]">
                {children}

                <p className="mt-2 text-base  text-red-800">{'Test msg'}</p>

                {note && <p className="mt-2">{note}</p>}
            </div>
        </section>
    );
}

export default Section;
