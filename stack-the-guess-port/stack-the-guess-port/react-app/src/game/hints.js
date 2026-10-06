export function computeHintLength(guess, target, currentHintLength) {
  let newHintLength = currentHintLength + 1;

  for (let i = 0; i < Math.min(guess.length, target.length); i++) {
    if (guess[i] === target[i]) {
      newHintLength = Math.max(newHintLength, i + 2);
    } else {
      break;
    }
  }

  return Math.min(newHintLength, target.length);
}
