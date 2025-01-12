import { useEffect, useRef, useState } from 'react';
import ThemeBtn from '../../buttons/themeBtn';
import { useOfferContext } from '../../../context/offerContext';
import { offerTypes } from '../../../context/SalesDiscountContext';

function CopyLink({ url, handleAction, button }) {
    const { trigger, setTrigger, details } = useOfferContext();

    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef?.current);
        };
    }, []);

    const offer = new offerTypes[details?.offer_type](details);
    return (
        <section className=" flex flex-nowrap">
            <div className="left flex-1">
                <input
                    type="text"
                    className=" daisy-input daisy-input-bordered w-full !rounded-l-full !border-dark-gray shadow-inner !outline-admin-accent"
                    name=""
                    id=""
                    readOnly
                    value={url}
                />
            </div>
            <div className="right">
                <ThemeBtn
                    text={trigger ? button.clicked : button.default}
                    bg={`rounded-l-none bg-black disabled:bg-black/50`}
                    disabled={offer?.isExpired}
                    handleClick={() => {
                        clearTimeout(timeoutRef.current);

                        if (handleAction) {
                            debugger
                            handleAction();
                            // return;
                        } else {
                            setTrigger(() => true);

                            timeoutRef.current = setTimeout(() => {
                                setTrigger(() => false);
                            }, 5000);

                            navigator.clipboard.writeText(url);
                        }
                    }}
                />
            </div>
        </section>
    );
}

export default CopyLink;
