import { useRef } from 'react';

export function SubHeader({
    text,
    disablePadding,
    onClick,
    disable,
    className,
    disableChangeBtn,
    enableCancelBtn,
    cancelBtnClick,
}) {
    const changeBtnRef = useRef();
    return (
        <div
            className={`flex justify-between ${
                disablePadding ? '' : 'mb-0 p-6 pb-0'
            } `}
        >
            <h3 className="font-gotham text-lg text-black">{text}</h3>
            {!disableChangeBtn && (
                <button
                    type="button"
                    id="checkout-change-btn"
                    onClick={onClick}
                    disabled={disable}
                >
                    CHANGE
                </button>
            )}
            {enableCancelBtn && (
                <button
                    type="button"
                    id="checkout-change-btn"
                    onClick={cancelBtnClick}
                    disabled={disable}
                >
                    CANCEL
                </button>
            )}
        </div>
    );
}
