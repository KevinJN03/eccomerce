import { useEffect, useRef, useState } from 'react';
import { adminAxios } from '../../../../api/axios';
import SalesDiscountProvider, {
    useSalesDiscountContext,
} from '../../../../context/SalesDiscountContext';
import Container from './Container';
import { useSearchParams } from 'react-router-dom';

function Index({}) {
    const abortControllerRef = useRef(new AbortController());
    const timeoutRef = useRef(null);
    const [offer, setOffer] = useState({});

    const { searchParams, categoriesMap } = useSalesDiscountContext();
    const [chosenMap, setChosenMap] = useState(new Map());

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await adminAxios.get(
                    `offer/${searchParams.get('offer')}`,
                    {
                        signal: abortControllerRef.current?.signal,
                    }
                );

                setOffer(() => data[0]);

                const newChosenListings = [];

                const newChosenMap = new Map();

                data[0]?.listings.forEach((element) => {
                    if (newChosenMap.has(element.category)) {
                        const getMapItem = _.cloneDeep(
                            newChosenMap.get(element.category)
                        );

                        getMapItem.listings.push(element);

                        newChosenMap.set(element.category, getMapItem);
                    } else {
                        const getMapItem = categoriesMap.get(element.category);

                        newChosenMap.set(element.category, {
                            ...getMapItem,
                            listings: [element],
                        });
                    }
                });

                setChosenMap(() => newChosenMap);
                clearTimeout(timeoutRef.current);

                timeoutRef.current = setTimeout(() => {
                    setLoading(() => false);
                }, 500);
            } catch (error) {
                logoutUser({ error });
            } finally {
                // clearTimeout(timeoutRef.current);
                // timeoutRef.current = setTimeout(() => {
                //     setLoading(() => false);
                // }, 500);
            }
        };

        fetchData();
        return () => {
            abortControllerRef.current?.abort();
            clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        let newCount = 0;
        setChosenListings(() =>
            Array.from(chosenMap, ([name, value]) => {
                newCount += value.listings?.length;
                return { _id: name, ...value };
            })
        );
        setCount(() => newCount);
    }, [chosenMap]);
    return (
        <SalesDiscountProvider initialDetails={offer}>
            <Container />
        </SalesDiscountProvider>
    );
}

export default Index;
