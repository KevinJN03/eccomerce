import { Link, useNavigate } from 'react-router-dom';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';

function Edit_Delivery({}) {
    const { modalContent, setModalCheck } = useContent();
    const navigate = useNavigate();
    return (
        <Template
            small
            title={`Apply Delivery Profile to ${modalContent?.products?.length} listing

  `}
        >
            <select
                name="delivery-profile"
                id="delivery-profile"
                className="daisy-input daisy-input-bordered h-10 rounded-sm  text-sm"
            >
                <option disabled selected>
                    Select profile...
                </option>
                {[1, 2, 3, 4].map((value) => {
                    return (
                        <option value={value} key={value}>
                            value
                        </option>
                    );
                })}
            </select>
            <div className='mt-2'>
                <p className="text-sm font-semibold">Processing time</p>

                <p>1-3 business days</p>
            </div>

            <div className='mt-1'>
                <p className="text-sm font-semibold ">Delivers to</p>

                {[
                    { country: 'United Kingdom', cost: 0 },
                    { country: 'United States	', cost: 0 },
                    { country: 'Everywhere', cost: 0 },
                ].map(({ country, cost }) => {
                    return (
                        <p
                            key={country}
                            className="flex flex-row flex-nowrap justify-between"
                        >
                            {country}{' '}
                            <span>£{parseFloat(cost).toFixed(2)}</span>
                        </p>
                    );
                })}
            </div>

            <p>+ upgrades</p>

            <Link
                to={'/admin/delivery'}
                className="mt-3 w-fit  text-sm underline"
                onClick={() => {
                    setModalCheck(() => false);
                }}
            >
                Edit delivery profiles
            </Link>
        </Template>
    );
}

export default Edit_Delivery;
