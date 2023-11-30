import { ErrorMessagePointerUp } from '../../Login-SignUp/errorMessage';

export function ElementDiv({ label, id, icon, className, error, property }) {
    return (
        <div className={`${className} input-container relative flex flex-col`}>
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
                {error && (
                    <>
                        {error[property] && (
                            <ErrorMessagePointerUp
                                msg={error[property]}
                                className={'top-14'}
                            />
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

export default ElementDiv;
