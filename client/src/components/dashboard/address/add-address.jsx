import Address_Form from './form';

function Add_Address({}) {
    return (
        <section className="Add_Address">
            <Address_Form
                title={'NEW ADDRESS'}
                description={
                    'Please enter an address you would like to save and deliver your items to.'
                }
            />
        </section>
    );
}

export default Add_Address;
