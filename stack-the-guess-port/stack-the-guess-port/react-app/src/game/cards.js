export function createCard(id, svg) {
  return {
    id,
    svg,
    rot: `${(Math.random() * 18 - 9).toFixed(2)}deg`,
    dx: `${(Math.random() * 22 - 11).toFixed(1)}px`,
    dy: `${(Math.random() * 16 - 8).toFixed(1)}px`,
  };
}
