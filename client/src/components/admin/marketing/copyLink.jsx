import { useEffect, useRef, useState } from 'react';
import ThemeBtn from '../../buttons/themeBtn';

function CopyLink({ url }) {
    const [isUrlCopied, setCopyUrl] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef?.current);
        };
    }, []);

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
                    text={isUrlCopied ? 'Copied!' : 'Copy Link'}
                    bg={`rounded-l-none bg-black`}
                    handleClick={() => {
                        clearTimeout(timeoutRef.current);
                        setCopyUrl(() => true);

                        timeoutRef.current = setTimeout(() => {
                            setCopyUrl(() => false);
                        }, 5000);
                        navigator.clipboard.writeText(url);
                    }}
                />
            </div>
        </section>
    );
}

export default CopyLink;
