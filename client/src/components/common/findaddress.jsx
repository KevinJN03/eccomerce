const findAddress = ({ property, default_address, addresses }) => {
    if (default_address[property]) {
        const foundAddress = addresses.find(
            (item) => item._id == default_address[property]
        );

        return foundAddress;
    }
};

export default findAddress;
