import { useState } from 'react';
import { useAdminContext } from '../../../context/adminContext';
import { useListingPageContext } from '../../../context/listingPageContext';
import SelectionInput from '../order/home/selectionIput';
import { ArrowDropDownSharp } from '@mui/icons-material';
import { useContent } from '../../../context/ContentContext';

function SubHeader({}) {
    const { selectionSet, setSelectionSet, checks , productIds} = useListingPageContext();
    const { setModalCheck, setModalContent } = useContent();


    const handleDelete = () => {
        setModalContent({
            type: 'delete',
            ids: Array.from(selectionSet),
            setSelectionSet,
            draft: checks?.listing_status == 'draft',
        });
        setModalCheck(() => true);
    };
    return (
        <div className="subheader mb-3 flex flex-row  flex-nowrap gap-3">
            <SelectionInput
                {...{ allIds: productIds, selectionSet, setSelectionSet }}
            />

            <div className="flex w-fit flex-row flex-nowrap rounded border border-dark-gray/50">
                <button
                    disabled={!selectionSet?.size}
                    type="button"
                    className="rounded-l-inherit px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    Renew
                </button>
                <button
                    disabled={!selectionSet?.size}
                    type="button"
                    className="border-x border-dark-gray/50 px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    Deactivate
                </button>
                <button
                    onClick={handleDelete}
                    disabled={!selectionSet?.size}
                    type="button"
                    className="rounded-r-inherit px-3 text-xs font-medium text-black/70 hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
                >
                    Delete
                </button>
            </div>

            <button
                disabled={!selectionSet?.size}
                type="button"
                className="flex flex-row items-center rounded border border-dark-gray/50 px-3 text-xs font-medium  hover:bg-light-grey/60 disabled:cursor-default disabled:bg-orange-50/50"
            >
                <p className="text-black/70">Editing options</p>
                <ArrowDropDownSharp />
            </button>
        </div>
    );
}

export default SubHeader;
