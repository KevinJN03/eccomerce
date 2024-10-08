import { useState } from 'react';

function CancelOrderBtn({ show, setShow, disabled }) {
    return (
        <div className="w-full">
            {!show && (
                <button
                    disabled={disabled}
                    onClick={() => setShow(true)}
                    type="button"
                    className="h-full w-full border-2  py-2 text-center font-gotham text-sm tracking-wider transition-all hover:!bg-[var(--light-grey)] disabled:cursor-not-allowed"
                >
                    CANCEL ORDER
                </button>
            )}
        </div>
    );
}

export default CancelOrderBtn;
