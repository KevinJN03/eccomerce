export default (data, num, setState) => {
    try {

        if (data == null || data == undefined) {
         
            return 
        };

   console.log('try format');
        let newData = parseFloat(data).toFixed(num);

        if (newData != data) {
            setState(newData);
        }
    } catch (error) {
        console.log('error formatting', error);
    }
};
