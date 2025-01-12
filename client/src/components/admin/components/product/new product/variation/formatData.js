export default (data, num) => {
    try {
        if (data == null || data == undefined) {
            return;
        }
        let newData = parseFloat(data).toFixed(num);
        return newData;
    } catch (error) {
        console.error('error formatting', error);
        return;
    }
};
