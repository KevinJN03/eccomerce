export default (data, num) => {
    try {
        if (data == null || data == undefined) {
            return;
        }

        //    ('try format');
        let newData = parseFloat(data).toFixed(num);

        return newData;
    } catch (error) {
        'error formatting', error;
    }
};
