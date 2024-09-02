export const createRange = (start, stop, step, sliceStart) => {
    const array = Array.from({ length: (stop - start) / step + 1 }, (_, i) => {
        if (sliceStart) {
            return ('0' + (start + i * step)).toString().slice(sliceStart);
        } else {
            return start + i * step;
        }
    });

    return array;
};

export default function getRanges() {
    const months = createRange(1, 12, 1, -2);
    const years = createRange(2023, 2033, 1, -4);

    return { months, years };
}
