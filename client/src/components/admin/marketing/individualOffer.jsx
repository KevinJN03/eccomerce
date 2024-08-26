import { KeyboardArrowRightRounded } from '@mui/icons-material';
import _ from 'lodash';
import {
    offerTypes,
    useSalesDiscountContext,
} from '../../../context/SalesDiscountContext';

function IndividualOffer(props) {
    const {
        type,
        code,
        emails_sent,
        revenue,
        start_date,
        end_date,
        offer_type,
        no_end_date,
        active,
        uses,
        _id,
        redacted_code,
    } = props;

    const { setOpenDrawer, setSearchParams } = useSalesDiscountContext();
    const offer = new offerTypes[offer_type](props);

     const { text, dateText } = offer.generateDatePeriod
    return (
        <tr key={offer.code} className="border-b border-dark-gray">
            <td className="border-r border-dark-gray px-5 py-5">
                <p className="text-sm">
                    {_.upperFirst(offer_type).replace('_', ' ')}
                </p>
                <p className="text-sm font-semibold">{redacted_code || code}</p>
                <button
                    type="button"
                    className="group flex cursor-pointer flex-nowrap items-center"
                    onClick={() => {
                        setSearchParams({
                            offer: _id,
                            offer_type,
                        });
                        setOpenDrawer(() => true);
                    }}
                >
                    <p className="text-sm text-black/90 underline underline-offset-1">
                        Details
                    </p>
                    <KeyboardArrowRightRounded className="!text-base" />
                </button>
            </td>

            <td className="px-5">
                <div>
                    {/* <p>
    expired:{' '}
    {new String(isExpired)}
</p> */}
                    <p className="text-sm">
                        {text}
                        {/* {isActive
        ? generateDatePeriod({
              start_date,
              end_date,
              no_end_date,
          })
        : `0 Days`} */}
                        {offer.isActive && !offer.isExpired && (
                            <span
                                className={`ml-2 rounded-full px-2 py-0.5 text-xxs font-medium ${offer.isActive ? 'bg-green-100' : 'bg-dark-gray/40'}`}
                            >
                                {offer.currentState}
                            </span>
                        )}
                    </p>

                    {/* <p>dateText: {dateText}</p> */}
                    <p className="mt-1.5 text-xs text-black/70">{dateText}</p>
                </div>
            </td>

            <td className="px-5" align="left">
                <p className="text-sm">{emails_sent || 'N/A'}</p>
            </td>
            <td className="px-5">
                <p className="text-sm">{uses}</p>
            </td>
            <td className="px-5">
                <p className="text-sm">
                    {parseFloat(revenue || 0).toLocaleString('en-GB', {
                        style: 'currency',
                        currency: 'GBP',
                    })}
                </p>
            </td>
        </tr>
    );
}

export default IndividualOffer;
