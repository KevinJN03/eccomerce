import { Input } from 'postcss';
import { useState } from 'react';
import { useContent } from '../../../../context/ContentContext';

function Template({ children, title }) {
    const { setModalCheck } = useContent();

    return (
        <section className="w-full rounded-sm bg-white">
            <header className="border-b border-b-dark-gray/50 p-3">
                <p className=" font-medium">{title}</p>
            </header>
            <body className="flex flex-col gap-2 px-3 py-4">{children}</body>

            <footer className="flex flex-row flex-nowrap justify-end gap-2 border-t border-dark-gray/50 p-3">
                <button
                onClick={()=> setModalCheck(false)}
                    type="button"
                    className="rounded-sm border px-3 py-2 text-xs font-semibold hover:bg-light-grey/50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="rounded-sm border border-black bg-black px-3 py-2 text-xs font-semibold text-white hover:opacity-70"
                >
                    Apply
                </button>
            </footer>
        </section>
    );
}

export default Template;
