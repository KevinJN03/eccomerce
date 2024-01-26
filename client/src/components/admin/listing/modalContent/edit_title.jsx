import { useEffect, useState } from 'react';
import Template from './template';
import { useContent } from '../../../../context/ContentContext';
import { adminAxios } from '../../../../api/axios';
import TitleDescriptionTemplate from './titleDescriptionTemplate';

function Edit_Title() {
    return <TitleDescriptionTemplate property={'title'} textbox={false} />;
    // const [text, setText] = useState({
    //     add_to_front: '',
    //     add_to_end: '',
    //     delete: '',
    //     reset: '',
    // });
    // const [sampleText, setSampleText] = useState('12344');
    // const [select, setSelect] = useState('add_to_front');
    // const { modalContent } = useContent();
    // const [products, setProducts] = useState([]);

    // const [deleteInstance, setDeleteInstance] = useState(false);
    // const [defaultText, setDefaultText] = useState('');
    // const [findReplace, setFindReplace] = useState({
    //     find: '',
    //     replace: '',
    //     replaceAll: false,
    //     caseSensitive: false,
    // });

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data } = await adminAxios.get(
    //                 `product/${
    //                     modalContent?.products || ['65ace5838f9aa588e0e6d225']
    //                 }`
    //             );
    //             setProducts(() => data);
    //             setDefaultText(() => data[0]?.title);
    //             setSampleText(() => data[0]?.title);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const handleText = ({ e, onChange }) => {
    //     if (onChange) {
    //         setText((prevState) => ({
    //             ...prevState,
    //             [select]: e.target.value,
    //         }));
    //     }

    //     if (select == 'add_to_front') {
    //         setSampleText(
    //             () => (onChange ? e.target.value : text?.[select]) + defaultText
    //         );
    //     }

    //     if (select == 'add_to_end') {
    //         setSampleText(
    //             () => defaultText + (onChange ? e.target.value : text?.[select])
    //         );
    //     }

    //     if (select == 'reset') {
    //         setSampleText(() =>
    //             onChange ? e.target.value : text?.[select] || defaultText
    //         );
    //     }

    //     if (select == 'delete') {
    //         let newSampleText = null;
    //         if (deleteInstance) {
    //             newSampleText = defaultText.replaceAll(
    //                 onChange ? e.target.value : text?.[select],
    //                 ''
    //             );
    //         } else {
    //             newSampleText = defaultText.replace(
    //                 onChange ? e.target.value : text?.[select],
    //                 ''
    //             );
    //         }

    //         setSampleText(() => newSampleText);
    //     }
    // };

    // const handleFindReplace = ({ find, replace }) => {
    //     console.log({ find, replace });
    //     if (!find || !replace) {
    //         setSampleText(() => defaultText);
    //         return;
    //     }

    //     let newSampleText = null;

    //     if (findReplace?.replaceAll) {
    //         newSampleText = defaultText.replaceAll(find, replace);
    //     } else {
    //         newSampleText = defaultText.replace(find, replace);
    //     }

    //     setSampleText(() => newSampleText);
    // };

    // useEffect(() => {
    //     setSampleText(() => defaultText);

    //     if (select == 'find_and_replace') {
    //         handleFindReplace({
    //             find: findReplace?.find,
    //             replace: findReplace?.replace,
    //         });
    //     } else {
    //         handleText({ onChange: false });
    //         // setSampleText(() => defaultText);
    //     }
    // }, [select]);

    // return (
    //     <Template
    //         title={`Editing title for ${modalContent.products?.length} listing`}
    //     >
    //         <section className="flex flex-col gap-2 border-b py-3">
    //             <section className="flex w-full flex-row flex-nowrap gap-5 ">
    //                 <div className="left w-full flex-1">
    //                     <select
    //                         onChange={(e) => setSelect(e.target.value)}
    //                         className="daisy-select daisy-select-bordered daisy-select-xs h-8 w-full rounded-sm"
    //                     >
    //                         {[
    //                             'Add to front',
    //                             'Add to end',
    //                             'Find and replace',
    //                             'Delete',
    //                             'Reset title',
    //                         ].map((value) => {
    //                             const newValue = value
    //                                 .toLowerCase()
    //                                 .replaceAll(' ', '_');
    //                             return (
    //                                 <option
    //                                     key={newValue}
    //                                     selected={newValue == select}
    //                                     value={newValue}
    //                                 >
    //                                     {value}
    //                                 </option>
    //                             );
    //                         })}
    //                         <option
    //                             key={'reset'}
    //                             selected={select == 'reset'}
    //                             value={'reset'}
    //                         >
    //                             Reset {property}
    //                         </option>
    //                     </select>
    //                 </div>
    //                 <div className="right w-full flex-[2]">
    //                     {select == 'find_and_replace' ? (
    //                         <section className="flex flex-col gap-2">
    //                             <div className="left flex flex-nowrap items-center gap-2">
    //                                 <p className="flex-1 whitespace-nowrap">
    //                                     Find:{' '}
    //                                 </p>

    //                                 <input
    //                                     onChange={(e) => {
    //                                         setFindReplace((prevState) => ({
    //                                             ...prevState,
    //                                             find: e.target.value,
    //                                         }));

    //                                         handleFindReplace({
    //                                             find: e.target.value,
    //                                             replace: findReplace?.replace,
    //                                         });
    //                                     }}
    //                                     value={findReplace?.find}
    //                                     type="text"
    //                                     className="h-8 w-full flex-[2] rounded-sm border border-dark-gray/50 p-2 text-xs"
    //                                 />
    //                             </div>
    //                             <div className="right flex flex-nowrap items-center gap-2">
    //                                 <p className="flex-1 whitespace-nowrap">
    //                                     Replace with:{' '}
    //                                 </p>
    //                                 <input
    //                                     onChange={(e) => {
    //                                         setFindReplace((prevState) => ({
    //                                             ...prevState,
    //                                             replace: e.target.value,
    //                                         }));

    //                                         handleFindReplace({
    //                                             find: findReplace?.find,
    //                                             replace: e.target.value,
    //                                         });
    //                                     }}
    //                                     value={findReplace?.replace}
    //                                     type="text"
    //                                     className="h-8 w-full flex-[2] rounded-sm border border-dark-gray/50 p-2 text-xs"
    //                                 />
    //                             </div>

    //                             <section className="mt-1 flex flex-nowrap justify-end gap-3">
    //                                 <div
    //                                     className="flex flex-row gap-2"
    //                                     onClick={() => {
    //                                         setFindReplace((prevState) => ({
    //                                             ...prevState,
    //                                             replaceAll:
    //                                                 !prevState?.replaceAll,
    //                                         }));
    //                                     }}
    //                                 >
    //                                     <input
    //                                         readOnly
    //                                         value={findReplace?.replaceAll}
    //                                         type="checkbox"
    //                                         name="replace-all"
    //                                         id="replace-all"
    //                                         className="daisy-checkbox daisy-checkbox-xs rounded-sm border-black"
    //                                     />
    //                                     <p className="text-xs"> Replace all</p>
    //                                 </div>

    //                                 <div
    //                                     className="flex flex-row gap-2"
    //                                     onClick={() => {
    //                                         setFindReplace((prevState) => ({
    //                                             ...prevState,
    //                                             caseSensitive:
    //                                                 !prevState?.caseSensitive,
    //                                         }));
    //                                     }}
    //                                 >
    //                                     <input
    //                                         readOnly
    //                                         value={findReplace?.caseSensitive}
    //                                         type="checkbox"
    //                                         name="replace-all"
    //                                         id="replace-all"
    //                                         className="daisy-checkbox daisy-checkbox-xs rounded-sm border-black"
    //                                     />
    //                                     <p className="text-xs">
    //                                         {' '}
    //                                         Case sensitive
    //                                     </p>
    //                                 </div>
    //                             </section>
    //                         </section>
    //                     ) : (
    //                         <input
    //                             onChange={(e) =>
    //                                 handleText({ e, onChange: true })
    //                             }
    //                             value={text?.[select]}
    //                             type="text"
    //                             className="h-8 w-full rounded-sm border border-dark-gray/50 p-2 text-xs"
    //                         />
    //                     )}
    //                 </div>
    //             </section>
    //             {select == 'delete' && (
    //                 <div
    //                     onClick={() => {
    //                         setDeleteInstance((prevState) => !prevState);
    //                         let newSampleText = null;
    //                         if (!deleteInstance) {
    //                             newSampleText = defaultText.replaceAll(
    //                                 text,
    //                                 ''
    //                             );
    //                         } else {
    //                             newSampleText = defaultText.replace(text, '');
    //                         }
    //                         setSampleText(() => newSampleText);
    //                     }}
    //                     className="flex flex-row flex-nowrap items-center gap-2 self-end"
    //                 >
    //                     <input
    //                         checked={deleteInstance}
    //                         readOnly
    //                         type="checkbox"
    //                         className="daisy-checkbox daisy-checkbox-xs  rounded-sm border-black"
    //                     />
    //                     <p className="inline text-xs">Delete all instances</p>
    //                 </div>
    //             )}

    //             <p className="text-xxs text-black/80">
    //                 Pro tip: Don't forget to include spaces between new and
    //                 existing text
    //             </p>
    //         </section>
    //         <section className="w-full py-3">
    //             <p className="mb-3 font-medium text-black/70">Sample update</p>
    //             <section className="sample flex w-full max-w-full flex-row flex-nowrap items-center gap-3 rounded-sm bg-light-grey/60 p-2 pr-5">
    //                 <div className="left min-h-16 h-16 max-h-16 w-16 min-w-16 max-w-16 rounded-sm">
    //                     <img
    //                         src={products[0]?.images[0]}
    //                         alt=""
    //                         className="h-full w-full rounded-inherit object-cover"
    //                     />
    //                 </div>

    //                 <p className="whitespace-pre-line break-all text-xs">
    //                     {sampleText}
    //                 </p>
    //             </section>
    //         </section>
    //     </Template>
    // );
}

export default Edit_Title;
