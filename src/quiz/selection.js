export function shuffle(items, rng = Math.random) {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function selectQuestions(bank, count = 5, rng = Math.random) {
  if (!Array.isArray(bank) || bank.length === 0) return [];
  const shuffled = shuffle(bank, rng);
  const take = Math.min(count, shuffled.length);
  return shuffled.slice(0, take);
}
