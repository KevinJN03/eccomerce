import { useNewProduct } from '../../../../../context/newProductContext';
import { Editor, RichUtils } from 'draft-js';
import FormatUnderlinedSharpIcon from '@mui/icons-material/FormatUnderlinedSharp';
import FormatBoldSharpIcon from '@mui/icons-material/FormatBoldSharp';
import FormatItalicSharpIcon from '@mui/icons-material/FormatItalicSharp';
import '../../../../../CSS/draftStyle.scss';
import FormatUnderlinedSharp from '@mui/icons-material/FormatUnderlinedSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import { useEffect, useState } from 'react';
import useNewProductError from '../../../../../useNewProductError';
import OptionError from './variation/error/optionError';
function Description({}) {
    const { description, setDescription, publishErrorDispatch } =
        useNewProduct();
    const [descriptionError, setDescriptionError] = useState('');

    useNewProductError('description', setDescriptionError);

    useEffect(() => {
        setDescriptionError('');

        publishErrorDispatch({ type: 'clear', path: 'description' });
    }, [description]);

    return (
        <section id="Description">
            <p className="text-lg font-medium">
                Description<span className="asterisk">*</span>
            </p>
            <p>
                What makes your item special? Buyers will only see the first few
                lines unless they expand the description.
            </p>

            {descriptionError && (
                <OptionError
                    msg={descriptionError}
                    className={'!mb-[-8px] px-0  py-0 pt-1'}
                />
            )}
            <section className="w-full ">
                <textarea
                    onChange={(e) => setDescription(() => e.target.value)}
                    value={description}
                    className="mt-4 min-h-[200px] w-full rounded-lg border-[1px] border-black p-3 text-sm"
                />
            </section>
        </section>
    );
}

export default Description;
