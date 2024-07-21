import confettiIcon from '../../../assets/icons/confetti.png';

import {
    FacebookShareButton,
    FacebookIcon,
    PinterestIcon,
    PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';
import ThemeBtn from '../../buttons/themeBtn';
import { text } from '@fortawesome/fontawesome-svg-core';
import { useSalesDiscountContext } from '../../../context/SalesDiscountContext';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import CopyLink from './copyLink';
import { useOfferContext } from '../../../context/offerContext';

const { VITE_CLIENT_URL, VITE_WEBSITE, VITE_CLOUDFRONT_URL } = import.meta.env;

function Step4({}) {
    const couponUrl = `https://${VITE_WEBSITE}?coupon=Save20`;
    const description = `I'm offering a discount! ${couponUrl} via @${VITE_WEBSITE} \r\n`;

    const { reset, details } = useOfferContext();

    const [isLive, setIsLive] = useState(() => {
        const startDateDiffToday = dayjs
            .unix(details?.start_date)
            .diff(dayjs(), 'minute');
        debugger;
        console.log({ startDateDiffToday });

        if (startDateDiffToday > 0) return false;

        return true;
    });

    return (
        <section className=" flex w-full flex-col rounded-t-inherit">
            <header className="flex flex-col items-center gap-4 rounded-t-inherit bg-blue-100 px-10 py-5">
                <div className="h-36 w-36 rounded-full bg-white p-6">
                    <img
                        src={confettiIcon}
                        alt="confetti icon "
                        className="h-fit w-fit object-cover"
                    />
                </div>
                <h2 className="text-center font-EBGaramond text-4xl">
                    {isLive
                        ? 'Your promo code is live and ready to go!'
                        : 'Your promo code is scheduled!'}
                </h2>

                {!isLive && (
                    <p className="text-base">
                        {`Your offer will go live on ${dayjs.unix(details?.start_date).utc().format(`D MMM YYYY [at] hh:mm a`)} your
                        local time.`}
                    </p>
                )}
            </header>

            <body className="px-10 py-5">
                <p className="text-center text-base">
                    {isLive
                        ? `Share it on social, or give buyers your custom URL to
                    instantly apply the discount.`
                        : `Share your promo code on social and start spreading the news! Buyers can also use your custom URL to instantly apply the discount.`}
                </p>

                <section className="mb-10 mt-6 flex w-full flex-nowrap gap-3">
                    <FacebookShareButton
                        url={couponUrl}
                        className="flex flex-1 flex-row flex-nowrap items-center gap-2 !rounded-md  !bg-[#0965FE] !px-2"
                    >
                        <FacebookIcon size={44} />
                        <p className="text-base text-white">Share</p>
                    </FacebookShareButton>

                    <PinterestShareButton
                        description={description}
                        url={couponUrl}
                        media={`${VITE_CLOUDFRONT_URL}/files/logos/glamo-black-logo.png`}
                        className="flex flex-1 flex-row flex-nowrap items-center gap-2 !rounded-md  !bg-[#E60023] !px-2"
                    >
                        <PinterestIcon size={44} />
                        <p className="text-base text-white">Save</p>
                    </PinterestShareButton>

                    <TwitterShareButton
                        url={couponUrl}
                        title={description}
                        className="flex flex-1 flex-row flex-nowrap items-center gap-2 !rounded-md  !bg-[#00ACED] !px-2"
                    >
                        <TwitterIcon size={44} />
                        <p className="text-base text-white">Tweet</p>
                    </TwitterShareButton>
                </section>

                <CopyLink url={couponUrl} />
            </body>

            <footer className="self-center px-10 py-5">
                <ThemeBtn text={'Done'} handleClick={reset} />
            </footer>
        </section>
    );
}

export default Step4;
