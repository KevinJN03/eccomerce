import Label from "./label";

function Section({ children, title, description, disableAsterisk,  noWhiteSpace }) {
    return (
        <section className=" flex flex-nowrap items-start gap-20">
            <div className="left w-full flex-[0.7]">
                {' '}
                <Label {...{ disableAsterisk, title, description,  noWhiteSpace }} />
            </div>
            <div className="right w-full flex-[2]">{children}</div>
        </section>
    );
}

export default Section;
