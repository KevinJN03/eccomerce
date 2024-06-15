import { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useSearchParams } from 'react-router-dom';

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

    const [salesOpen, setSalesOpen] = useState(false);
    const [feesOpen, setFeesOpen] = useState(false);
    const [show, setShow] = useState(false);

    const [dateSelection, setDateSelection] = useState({
        select: 'this_month',

        start_date: dayjs().startOf('M').unix(),
        end_date: dayjs().unix(),
    });

    const selectString = `${_.upperFirst(dateSelection.select?.replaceAll('_', ' '))}: ${dayjs.unix(dateSelection?.start_date).format('MMMM YYYY')} ${dateSelection?.end_date ? `- ${dayjs.unix(dateSelection?.end_date).format('MMMM YYYY')}` : ''}`;

    const generateText = (num) => {
        return {
            numString: parseFloat(num / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP',
            }),
            num,
        };
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
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    );
}

export default FinanceContextProvider;
