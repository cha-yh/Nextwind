export default function getCalculatedValueByPercent(start, end, percent, min = 0, max = 1) {
    const diff = end - start;
    const x = (max - min) / diff;
    const calculatedValue = min + x * (percent - start);
    return calculatedValue < min
        ? min
        : calculatedValue > max
            ? max
            : calculatedValue;
}