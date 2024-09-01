import { useEffect, useRef, useState } from 'react';
import giftCard_icon from '../../../assets/icons/gift-card.png';
import Empty_Body from '../empty-body';
import Header from '../header';
// import './voucher.scss';
import { useUserDashboardContext } from '../../../context/userContext';
import axios from '../../../api/axios';
import dayjs from 'dayjs';
import { LinearProgress, Pagination, PaginationItem } from '@mui/material';
import glamo_icon from '../../../assets/glamo.png';
import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
import { useTab } from '@mui/base';
import GLoader from '../../Login-SignUp/socialRegister/gloader';
// import Pagination from '../pagination/pagination';
function GiftCard_Voucher({}) {
    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef();
    const { logoutUser, giftCardVoucher, setGiftCardVoucher } =
        useUserDashboardContext();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [firstFetch, setFirstFetch] = useState(true);
    useEffect(() => {
        const fetchGiftCard = async () => {
            try {
                clearTimeout(timeoutRef.current);

                if (firstFetch) {
                    setFirstFetch(() => false);
                } else {
                    setLoading(() => true);
                }
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();

                const { data } = await axios.get(
                    `user/gift-card/all?page=${page}&limit=${3}`,
                    {
                        signal: abortControllerRef.current.signal,
                    }
                );

                setGiftCardVoucher(() => data);
            } catch (error) {
                logoutUser({ error });
            } finally {
                timeoutRef.current = setTimeout(() => {
                    setLoading(() => false);
                }, 400);
            }
        };

        fetchGiftCard();

        return () => {
            abortControllerRef.current?.abort();
            clearTimeout(timeoutRef.current);
        };
    }, [page]);

    const maxPage = Math.ceil(giftCardVoucher?.count / 3);
    const vouchersLength = giftCardVoucher.vouchers?.length;

    return (
        <section className="gift-card-voucher">
            <Header icon={giftCard_icon} text={'GIFT CARDS & VOUCHERS'} />
            <Empty_Body
                text={{
                    big:
                        vouchersLength == 0
                            ? 'YOU HAVE NO VOUCHERS YET'
                            : 'ADD A VOUCHER',
                    small:
                        vouchersLength == 0
                            ? 'You currently have no vouchers linked to your account. Get started by redeeming or buying one now.'
                            : 'You currently have vouchers linked to your account. Use them now, or add a new one to save even more!',
                    btn: 'ADD GIFT CARD/VOUCHER',
                    btn2: {
                        text: 'BUY GIFT VOUCHER',
                        link: '/gift-voucher',
                    },
                }}
                link={'add'}
                icon={{
                    image: giftCard_icon,
                    alt: 'gift outline icon with transparent background',
                }}
            />

            {loading ? (
                <section className="my-24 flex h-full w-full items-center justify-center">
                    <GLoader />
                </section>
            ) : (
                <section className="mt-4 flex flex-col gap-3">
                    {giftCardVoucher?.vouchers?.map(
                        ({
                            _id,
                            amount,
                            redacted_code,
                            end_date,
                            timestamp,
                            balance,
                        }) => {
                            return (
                                <div className="voucher-card w-full bg-white p-4">
                                    <div className="top mt-4 flex justify-between">
                                        <div className="flex-1">
                                            <p className="text-lg font-semibold">
                                                {redacted_code}
                                            </p>
                                        </div>

                                        <div className="flex w-full flex-[0.5] flex-col items-end">
                                            <p className="text-base">Amount</p>
                                            <p className="text-lg font-semibold">
                                                {parseFloat(
                                                    amount
                                                ).toLocaleString('en-GB', {
                                                    style: 'currency',
                                                    currency: 'GBP',
                                                })}
                                            </p>
                                        </div>
                                        <p></p>
                                    </div>

                                    <div className="middle mt-5 w-full">
                                        <label>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(balance / amount) * 100}
                                            />

                                            <p className="mt-2 text-base font-medium">
                                                Balance:{' '}
                                                <span className="font-semibold">
                                                    {parseFloat(
                                                        balance
                                                    ).toLocaleString('en-GB', {
                                                        style: 'currency',
                                                        currency: 'GBP',
                                                    })}
                                                </span>
                                            </p>
                                        </label>
                                    </div>

                                    <div className="bottom mt-4 ">
                                        <div className="left">
                                            {end_date && (
                                                <p>
                                                    <span>
                                                        {' '}
                                                        <strong>
                                                            {/* Expires: */}
                                                        </strong>{' '}
                                                        {dayjs
                                                            .unix(end_date)
                                                            .format(
                                                                'DD/MM/YYYY'
                                                            )}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                        <div className="right"></div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </section>
            )}

            {/* <Pagination {...{ divideBy: 5, setPage, page }} /> */}
            {maxPage > 1 && (
                <section className="mt-4 flex justify-end">
                    <Pagination
                        page={page}
                        size="large"
                        defaultPage={1}
                        count={maxPage}
                        onChange={(e, value) => setPage(() => value)}
                        // variant="outlined"
                        // color="primary"
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{
                                    previous: ArrowBackRounded,
                                    next: ArrowForwardRounded,
                                }}
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    bgcolor: 'white',
                                    transition: 'all 0.2s ease-in-out',
                                    borderRadius: '0%',
                                    textAlign: 'center',
                                    cursor: 'pointer',

                                    '& .MuiPaginationItem-text': {
                                        fontSize: 'inherit',
                                    },
                                    '&.Mui-selected': {
                                        border: '2px solid black',
                                    },

                                    '&:hover': {
                                        // transform: 'scale(1.1)',
                                        //                                    backgroundColor: 'lightblue',
                                    },
                                }}
                                {...item}
                            />
                        )}
                    />
                </section>
            )}
        </section>
    );
}

export default GiftCard_Voucher;
