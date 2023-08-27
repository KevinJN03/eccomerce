import DropDown_Detail from '../common/dropdown_detail';
function Return({}) {
    const returnDetail = () => {
        return (
            <div className="w-full">
                <p>
                    With limited exceptions, valid returns are refunded in the
                    form of store credit. Damaged/defective items will be
                    subject to an exchange if in stock. All store credit,
                    refunds, and/or exchanges that are due will be issued within
                    48 hours after the return is processed. All final sale items
                    are marked as such and cannot be returned for store credit.
                    You can find additional information about our Return Policy
                    HERE.
                </p>
            </div>
        );
    };
    return (
        <section id="return-section">
            <DropDown_Detail
                details={returnDetail()}
                header={'30-day Returns: Store Credit'}
            />
        </section>
    );
}

export default Return;
