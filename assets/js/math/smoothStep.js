/**
 * Smooth a value with ease
 *
 * @param  {number} v   Value
 * @param  {number} min Minimum boundary
 * @param  {number} max Maximum boundary
 * @return {number}     Smoothed value
 */
export default function smoothStep(v, min, max) {
    const x = Math.max(0, Math.min(1, (v - min) / (max - min)))
    return x * x * (3 - 2 * x)
}
