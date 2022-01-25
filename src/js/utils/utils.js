export const loadFromLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {}
};

export function startSmoothScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
