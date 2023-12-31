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

    useNewProductError('detail', setDescriptionError);

    useEffect(() => {
        setDescriptionError('');

        publishErrorDispatch({ type: 'clear', path: 'detail' });
    }, [description]);

    const boldClick = () => {
        setDescription(RichUtils.toggleInlineStyle(description, 'BOLD'));
    };

    const italicClick = () => {
        setDescription(RichUtils.toggleInlineStyle(description, 'ITALIC'));
    };

    const underlineClick = () => {
        setDescription(RichUtils.toggleInlineStyle(description, 'UNDERLINE'));
    };

    const unorderedList = () => {
        setDescription(
            RichUtils.toggleBlockType(description, 'unordered-list-item')
        );
    };

    const customStyleMap = {
        10: { fontSize: '10px' },
        12: { fontSize: '12px' },
        14: { fontSize: '14px' },
        16: { fontSize: '16px' },
        18: { fontSize: '18px' },
        20: { fontSize: '20px' },
    };

    const toggleFontSize = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDescription(
            RichUtils.toggleInlineStyle(description, e.target.value)
        );
    };
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
            <section className="richText-Editor ">
                <div className="richText-Editor-header">
                    <select
                        id="descriptionOption"
                        name="descriptionOption"
                        className=" !z-10 my-1 h-[20px] !min-h-[20px] max-w-[60px] rounded-none border-none bg-white text-sm"
                    >
                        {Object.keys(customStyleMap).map((item) => {
                            return (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                    <FormatBoldSharpIcon onClick={boldClick} />

                    <FormatItalicSharpIcon onClick={italicClick} />
                    <FormatUnderlinedSharp onClick={underlineClick} />
                    <FormatListBulletedSharpIcon onClick={unorderedList} />
                </div>

                <Editor
                    editorState={description}
                    onChange={setDescription}
                    customStyleMap={customStyleMap}
                />
            </section>
        </section>
    );
}

export default Description;
