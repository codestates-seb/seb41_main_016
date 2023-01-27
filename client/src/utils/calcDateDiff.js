export const getDateDiff = (d1, d2) => {
    if (d1 !== null && d2 !== null) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);

        const DateDiff = date1.getTime() - date2.getTime();

        return Math.abs(DateDiff / (1000 * 60 * 60 * 24));
    }
};
