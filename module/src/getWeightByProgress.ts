export default function getWeightByProgress(start:number, end:number, progress:number, min:number = 0, max:number = 1) {
    const diff = end - start;
    const x = (max - min) / diff;
    const calculatedValue = min + x * (progress - start);
    return calculatedValue < min
        ? min
        : calculatedValue > max
            ? max
            : calculatedValue;
}