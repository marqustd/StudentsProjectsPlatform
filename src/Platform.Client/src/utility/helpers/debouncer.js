
export default function debounceFactory() {
  let timeout;
  return (func, time) => {
    function later() {
      timeout = null;
      func();
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, time);
  };
}
