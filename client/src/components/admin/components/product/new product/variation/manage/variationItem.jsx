import { useVariation } from "../../../../../../../context/variationContext";
import SingleVariation from "../singleVariation";


function VariationItem({deleteVariation, editVariation, variations, type}) {
const {deleteList} = useVariation()
    
    return (
        <>
            {variations.length > 0 &&
                variations.map((variation) => {
                    const { id } = variation;

                    const findInDeleteList = deleteList.some(
                        (item) => item == id
                    );

                    if (!variation.disabled ) {
                        return (
                            <SingleVariation
                                key={variation.id}
                                singleVariation={variation}
                                deleteVariation={() => deleteVariation(variation)}
                                editVariation={() => editVariation(variation)}
                            />
                        );
                    }
                })}
        </>
    );
}

export default VariationItem;
