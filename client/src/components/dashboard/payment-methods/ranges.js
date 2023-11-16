export default function getRanges() {
    const range = (start, stop, step, sliceStart) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) =>
            ('0' + (start + i * step)).toString().slice(sliceStart)
        );

    const months = range(1, 12, 1, -2);
    const years = range(2023, 2033, 1, -4);

    return { months, years };
}
