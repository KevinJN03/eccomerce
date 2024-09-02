import { getName } from 'country-list';
import { useAdminOrderContext } from '../../../../../context/adminOrderContext';
import _ from 'lodash';

function OptionSection({ title, options, property }) {
    const {
        setFilterList,
        filterList,
        status,
        setLoading,
        setSearchParams,
        searchParams,
    } = useAdminOrderContext();
    return (
        <div className=" flex flex-col gap-y-2">
            <p className="text-base font-semibold">{title}</p>
            {options.map((item) => {
                const lowerCaseItem = item.toLowerCase().replaceAll(' ', '_');

                return (
                    <div
                        key={`${property}-${lowerCaseItem}`}
                        className="flex flex-row flex-nowrap gap-x-2"
                        onClick={() => {
                            setLoading(() => true);

                            searchParams.set(property, lowerCaseItem);
                            setSearchParams(searchParams);
                            setFilterList((prevState) => ({
                                ...prevState,
                                [status]: {
                                    ...prevState?.[status],
                                    [property]: lowerCaseItem,
                                },
                            }));
                        }}
                    >
                        <input
                            readOnly
                            checked={
                                _.get(filterList, [status, property]) ===
                                lowerCaseItem
                            }
                            type="radio"
                            name={property}
                            className="daisy-radio daisy-radio-sm cursor-pointer"
                        />
                        <p className="cursor-pointer">
                            {getName(item) ||
                                _.upperFirst(item?.replaceAll('_', ' '))}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default OptionSection;
