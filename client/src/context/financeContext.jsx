import { createContext, useContext, useRef, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { useAdminContext } from './adminContext';
import { adminAxios } from '../api/axios';

const FinanceContext = createContext();

export const useFinanceContext = () => {
    return useContext(FinanceContext);
};

function FinanceContextProvider({ children }) {
    const [stats, setStats] = useState({});
    const [activityLoading, setActivityLoading] = useState(false);
    const [netProfit, setNetProfit] = useState({});
    const [salesTotal, setSalesTotal] = useState({});
    const [feesTotal, setFeesTotal] = useState({});
    const [openCategories, setOpenCategories] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [modalState, setModalState] = useState({ on: false, view: '' });
    const [bankAccount, setBankAccount] = useState({});
    const [salesOpen, setSalesOpen] = useState(false);
    const [feesOpen, setFeesOpen] = useState(false);
    const [show, setShow] = useState(false);

    const abortControllerRef = useRef(new AbortController());

    const [dateSelection, setDateSelection] = useState({
        select: 'this_month',

        start_date: dayjs().startOf('M').unix(),
        end_date: dayjs().unix(),
    });

    const selectString = `${_.upperFirst(dateSelection.select?.replaceAll('_', ' '))}: ${dayjs.unix(dateSelection?.start_date).format('MMMM YYYY')} ${dateSelection?.end_date && dateSelection.select != 'this_month' ? `- ${dayjs.unix(dateSelection?.end_date).format('MMMM YYYY')}` : ''}`;

    const { logoutUser } = useAdminContext();

    const generateText = (num) => {
        return {
            numString: parseFloat(num / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP',
            }),
            num,
        };
    };

    const fetchBankAccount = async (setLoadState) => {
        try {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.get('/stripe/bank-account', {
                signal: abortControllerRef.current.signal,
            });

            setBankAccount(() => data);
        } catch (error) {
            console.error(error.message, error);
            logoutUser({ error });
        } finally {
            if (setLoadState) {
                setLoadState(() => false);
            }
        }
    };
    const value = {
        netProfit,
        setNetProfit,
        salesTotal,
        setSalesTotal,
        feesTotal,
        setFeesTotal,
        openCategories,
        setOpenCategories,
        salesOpen,
        setSalesOpen,
        feesOpen,
        setFeesOpen,
        show,
        setShow,
        stats,
        setStats,
        generateText,
        dateSelection,
        setDateSelection,
        selectString,
        activityLoading,
        setActivityLoading,
        searchParams,
        setSearchParams,
        modalState,
        setModalState,
        bankAccount,
        setBankAccount,
        fetchBankAccount,
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
}

export default FinanceContextProvider;
