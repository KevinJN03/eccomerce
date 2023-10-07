import { useNewProduct } from '../../../../../context/newProductContext';
import { Editor, RichUtils } from 'draft-js';
import FormatUnderlinedSharpIcon from '@mui/icons-material/FormatUnderlinedSharp';
import FormatBoldSharpIcon from '@mui/icons-material/FormatBoldSharp';
import FormatItalicSharpIcon from '@mui/icons-material/FormatItalicSharp';
import '../../../../../CSS/draftStyle.scss';
import FormatUnderlinedSharp from '@mui/icons-material/FormatUnderlinedSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
function Description({}) {
    const { description, setDescription } = useNewProduct();

    const boldClick = () => {
        console.log('current: ', description.getCurrentContent().getPlainText())
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
        e.preventDefault()
        setDescription(
            RichUtils.toggleInlineStyle(description, e.target.value)
        );
    };
    return (
        <section id="Description">
   
            <label htmlFor="#description" className="text-lg font-medium">
                Description<span className="asterisk">*</span>
            </label>
            <p>
                What makes your item special? Buyers will only see the first few
                lines unless they expand the description.
            </p>

            

            <section className="richText-Editor">
                <div className="richText-Editor-header">
                    <select className=" bg-white !z-10 text-sm max-w-[60px] my-1 !min-h-[20px] h-[20px] rounded-none border-none  " >
                       {Object.keys(customStyleMap).map((item) => {
                        return <option key={item} value={item}>{item}</option>
                       }) }
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
