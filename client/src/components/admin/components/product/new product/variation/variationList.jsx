import { useVariation } from "../../../../../../context/variationContext"

function VariationList({}){

  const {variations }= useVariation()
  return (
    <section className="flex basis-full mt-4">

      <div className="flex flex-col">
        <h3 className="font-semibold text-lg tracking-wide">{variations[0].name}</h3>
      <p>{`${variations.length} ${variations.length > 1 ? 'variants' : 'variant'}`}</p>
      </div>
      <div className="flex flex-row no-wrap">

      </div>
    </section>
  )
};

export default VariationList
