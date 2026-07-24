/**
 * @param {(...args: Array<any>) => any} func
 * @param {number} wait
 * @returns {(...args: Array<any>) => void}
 */
export default function debounce(
  func: (...args: Array<any>) => any,
  wait: number
): (...args: Array<any>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Array<any>) {
    const context = this;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
