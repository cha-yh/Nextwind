export default function getWeightByPercentRange(start:number, end:number, percent:number, min:number = 0, max:number = 1) {
    const diff = end - start;
    const x = (max - min) / diff;
    const calculatedValue = min + x * (percent - start);
    return calculatedValue < min
        ? min
        : calculatedValue > max
            ? max
            : calculatedValue;
}