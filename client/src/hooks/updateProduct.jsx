import { useEffect } from 'react';
import {v4 as uuidV4} from 'uuid'
function UpdateProduct(props, value) {

    const { setTitle, setCategory, setFiles, setGender, setProfile, setVariations,setPriceValue, setStockValue, combineDispatch, contentDispatch } = value
    props?.singleValue &&
        useEffect(() => {
            const { singleValue } = props;
            console.log('here');
            setTitle(() => singleValue?.title);
            setPriceValue((prev) => ({
                ...prev,
                value: singleValue?.price?.current,
            }));
            setStockValue((prev) => ({ ...prev, value: singleValue?.stock }));
            setCategory(() => singleValue?.category?._id || '');

            setGender(() => singleValue?.gender || '');

            setProfile(() => singleValue?.delivery || []);

            const newVariations = (singleValue?.variations || []).map(
                (data) => {
                    const optionArr = Object.entries(data?.options).map(
                        (item) => [item[0], item[1]]
                    );

                    data.options = new Map(optionArr);

                    return data;
                }
            );

            if (newVariations.length > 2) {
                combineDispatch({
                    type: 'set',
                    combine: newVariations.slice(2)[0],
                });
                console.log('combine', newVariations[2]);
                contentDispatch({type: 'manage'})
            }
            setVariations(() => newVariations.slice(0, 2));

            const geturlextension = (url) => {
                return url.split(/[#?]/)[0].split('.').pop().trim();
            };

            const onimageedit = async (imgurl) => {
                var imgext = geturlextension(imgurl);

                const response = await fetch(imgurl);
                const blob = await response.blob();
                const file = new File([blob], 'profileimage.' + imgext, {
                    type: blob.type,
                });

                return file;
            };

            const createFiles = async () => {
                const newFiles = (singleValue?.images || []).map(
                    async (item) => {
                        const result = await onimageedit(item);
                        const newObj = {
                            file: result,
                            img: URL.createObjectURL(result),
                            isDragDisabled: false,
                            id: uuidV4(),
                        };

                        return newObj;
                    }
                );

                const data = await Promise.all(newFiles);

                for (let i = data.length; i < 6; i++) {
                    data.push({ id: uuidV4(), isDragDisabled: true });
                }

                setFiles(() => data);
            };

            createFiles();
        }, [props?.singleValue]);
}

export default UpdateProduct;
