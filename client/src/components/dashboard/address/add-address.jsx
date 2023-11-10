import axios from '../../../api/axios';
import Address_Form from './form';

function Add_Address({}) {
    const handleClick = async ({
        firstName,
        lastName,
        mobile,
        address,
        setError,
        setDisable,
    }) => {
        try {
            const result = await axios.post('user/address/add', {
                firstName,
                lastName,
                mobile,
                ...address,
            });

            console.log(result.data);
        } catch (error) {
            setError(() => error.response.data);
            setDisable(true);
            console.log('error when adding address: ', error);
        }
    };

    return (
        <section className="Add_Address">
            <Address_Form
                handleClick={handleClick}
                title={'NEW ADDRESS'}
                description={
                    'Please enter an address you would like to save and deliver your items to.'
                }
            />
        </section>
    );
}

export default Add_Address;
