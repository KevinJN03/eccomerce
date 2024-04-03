import { Input } from 'postcss';
import { useEffect, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';

function Template({
    children,
    title,
    small,
    footerChildren,
    headerChildren,
    loading,
    submit,

    handleClearSelection,
}) {
    const { setModalCheck, setShowAlert } = useContent();

    return (
        <section
            className={`w-full rounded-sm bg-white ${
                small || loading
                    ? `!min-w-[24rem] max-w-[24rem]`
                    : 'min-w-[37.5rem]'
            }`}
        >
            {!loading ? (
                <>
                    <header className="border-b border-b-dark-gray/50 p-3">
                        {headerChildren || (
                            <p
                                className={`font-medium ${small ? 'text-xs' : 'text-base'}`}
                            >
                                {title}
                            </p>
                        )}
                    </header>
                    <div className="flex w-full flex-col gap-2 px-3 py-4">
                        {children}
                    </div>
                    <footer className="flex flex-row flex-nowrap justify-end gap-2 border-t border-dark-gray/50 p-3">
                        {footerChildren || (
                            <>
                                <button
                                    onClick={() => setModalCheck(false)}
                                    type="button"
                                    className="rounded-sm border px-3 py-2 text-sm font-semibold hover:bg-light-grey/50"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={
                                        submit?.loading || submit?.disabled
                                    }
                                    onClick={submit?.handleClick}
                                    type="button"
                                    className="flex items-center justify-center rounded-sm border border-black bg-black px-3 py-2 text-sm font-semibold text-white hover:opacity-70 disabled:opacity-50"
                                >
                                    {submit?.loading ? (
                                        <div className=" daisy-loading daisy-loading-spinner daisy-loading-xs !text-white "></div>
                                    ) : (
                                        submit?.text || 'Apply'
                                    )}
                                </button>
                            </>
                        )}
                    </footer>
                </>
            ) : (
                <div className="flex h-24 w-full items-center justify-center">
                    <div className="spinner-dot-circle [--spinner-color:var(--slate-8)]">
                        <div className="spinner-dot"></div>
                        <div className="spinner-dot"></div>
                        <div className="spinner-dot"></div>
                        <div className="spinner-dot"></div>
                        <div className="spinner-dot"></div>
                        <div className="spinner-dot"></div>
                        <div className="spinner-dot"></div>
                        <div className="spinner-dot"></div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Template;
