import { AssignmentSharp, CreditCardRounded } from '@mui/icons-material';
import FeeContainer from './feesContainer';
import _ from 'lodash';
import { useFinanceContext } from '../../../context/financeContext';

function SalesAndFees({ stats, salesTotal, feesTotal }) {
    const {
        salesOpen,
        setSalesOpen,
        feesOpen,
        setFeesOpen,

        generateText,
    } = useFinanceContext();
    return (
        <section className="flex flex-col gap-4">
            <h2 className=" text-xl font-semibold">Sales and fees</h2>
            <section className="flex w-full flex-nowrap gap-5">
                <FeeContainer
                    {...{
                        icon: <AssignmentSharp />,
                        bg: 'bg-yellow-200',
                        text: 'Sales',
                        result: stats?.payments || {},
                        ...salesTotal,
                        isOpen: salesOpen,
                        setOpen: setSalesOpen,
                    }}
                >
                    <div className="mt-3 flex w-full flex-col gap-2 pl-5">
                        <p className="flex w-full flex-nowrap items-center text-sm">
                            Total sales{' '}
                            <span className="ml-1.5 flex items-center justify-center rounded-full bg-light-grey px-2 py-1">
                                {_.get(stats, 'payments.total')}
                            </span>{' '}
                            <span className=" ml-auto text-right">
                                {
                                    generateText(
                                        _.get(stats, 'payments.amount')
                                    ).numString
                                }
                            </span>
                        </p>
                        <p className="flex w-full flex-nowrap items-center text-sm">
                            Refunds{' '}
                            <span className="ml-1.5 flex items-center justify-center rounded-full bg-light-grey px-2 py-1">
                                {_.get(stats, 'refunds.total')}
                            </span>{' '}
                            <span className=" ml-auto text-right">
                                {
                                    generateText(_.get(stats, 'refunds.amount'))
                                        .numString
                                }
                            </span>
                        </p>
                    </div>
                </FeeContainer>
                <FeeContainer
                    {...{
                        icon: <CreditCardRounded />,
                        bg: 'bg-pink-200',
                        text: 'Fees',
                        result: stats?.refunds || {},
                        ...feesTotal,
                        isOpen: feesOpen,
                        setOpen: setFeesOpen,
                    }}
                >
                    <div className="mt-3 flex w-full flex-col gap-2 pl-5">
                        {_.entries(_.get(stats, 'payments.fee_details')).map(
                            ([feeType, { total, description }]) => {
                                const credit = _.get(
                                    stats,
                                    `refunds.fee_details.${feeType}.credit`
                                );
                                return (
                                    <div className="flex flex-col gap-2">
                                        <p
                                            key={feeType}
                                            className="flex w-full flex-nowrap items-center text-sm"
                                        >
                                            {description}
                                            <span className=" ml-auto text-right">
                                                {generateText(-total).numString}
                                            </span>
                                        </p>

                                        {credit && (
                                            <p className="flex w-full flex-nowrap items-center pl-4 text-sm">
                                                Credits{' '}
                                                <span className=" ml-auto text-right">
                                                    {
                                                        generateText(
                                                            Math.abs(credit)
                                                        ).numString
                                                    }
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </FeeContainer>
            </section>
        </section>
    );
}

export default SalesAndFees;
