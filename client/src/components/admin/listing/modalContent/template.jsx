import { Input } from 'postcss';
import { useState } from 'react';
import { useContent } from '../../../../context/ContentContext';

function Template({
    children,
    title,
    small,
    footerChildren,
    headerChildren,

    submit,
}) {
    const { setModalCheck } = useContent();

    return (
        <section
            className={`w-full rounded-sm bg-white ${
                small ? `!min-w-[24rem] max-w-[24rem]` : 'min-w-[37.5rem]'
            }`}
        >
            <header className="border-b border-b-dark-gray/50 p-3">
                {headerChildren || <p className=" font-medium">{title}</p>}
            </header>
            <body className="flex w-full flex-col gap-2 px-3 py-4">
                {children}
            </body>

            <footer className="flex flex-row flex-nowrap justify-end gap-2 border-t border-dark-gray/50 p-3">
                {footerChildren || (
                    <>
                        <button
                            onClick={() => setModalCheck(false)}
                            type="button"
                            className="rounded-sm border px-3 py-2 text-xs font-semibold hover:bg-light-grey/50"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={submit?.loading || submit?.disabled}
                            onClick={submit?.handleClick}
                            
                            type="button"
                            className="flex disabled:opacity-50 items-center justify-center rounded-sm border border-black bg-black px-3 py-2 text-xs font-semibold text-white hover:opacity-70"
                        >
                            {submit?.loading ? (
                                <div class=" daisy-loading daisy-loading-spinner daisy-loading-xs !text-white "></div>
                            ) : (
                                submit?.text || 'Apply'
                            )}
                        </button>
                    </>
                )}
            </footer>
        </section>
    );
}

export default Template;
