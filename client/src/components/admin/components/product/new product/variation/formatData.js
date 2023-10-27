export default (data, num) => {
    try {

        if (data == null || data == undefined) {
         
            return 
        };

//    console.log('try format');
        let newData = parseFloat(data).toFixed(num);

       return newData
    } catch (error) {
        console.log('error formatting', error);
    }
};
