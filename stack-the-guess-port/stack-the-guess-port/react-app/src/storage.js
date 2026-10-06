const KEY = "stack-the-guess:best";

export function loadBestScore() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isNaN(n) ? null : n;
  } catch {
    return null;
  }
}

export function saveBestScore(value) {
  try {
    localStorage.setItem(KEY, String(value));
  } catch {}
}
