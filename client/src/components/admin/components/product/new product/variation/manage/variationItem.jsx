import _ from 'lodash';
import { useVariation } from '../../../../../../../context/variationContext';
import SingleVariation from '../singleVariation';
import { useNewProduct } from '../../../../../../../context/newProductContext';

function VariationItem({ type }) {
    const { temporaryVariation, setTemporaryVariation } = useVariation();

    const { contentDispatch } = useNewProduct();
    const deleteVariation = (id) => {
        // updatedDefaultMap(name, id, true);

        console.log({ temporaryVariation });

        const updateTemporaryVariation = _.cloneDeep(temporaryVariation).map(
            (item) => {
                if (item._id == id) {
                    return { ...item, disabled: true };
                }
                return item;
            }
        );
        setTemporaryVariation(() => updateTemporaryVariation);
    };

    const editVariation = (item) => {
        const { name } = item;

        contentDispatch({
            type: 'select',
            currentVariation: item,
            title: name,
        });
    };

    return (
        <>
            {temporaryVariation.length > 0 &&
                temporaryVariation.map((variation) => {
                    if (!variation.disabled) {
                        return (
                            <SingleVariation
                                key={variation._id}
                                {...variation}
                                deleteVariation={deleteVariation}
                                editVariation={editVariation}
                            />
                        );
                    }
                })}
        </>
    );
}

export default VariationItem;
