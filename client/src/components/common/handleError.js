import { v4 as uuidv4 } from 'uuid';

const handleError = (error) => {
    const message = error.response.data.msg;
    const messageArr = message.map((msg) => {
        return {
            id: uuidv4(),
            msg,
        };
    });

    return messageArr;
};

export const closeError = (id, error, setState) => {
    const newErrors = [...error];
    const filter = newErrors.filter((item) => item.id != id);

    setState(filter);
};
export default handleError;
