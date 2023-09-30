export default (data, num, setState) => {
    try {
 

        let newData = parseFloat(data).toFixed(num);

        if (newData != data) {
            setState(newData);
        }
    } catch (error) {
        console.log('error', error);
    }
};
