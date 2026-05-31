// Shared formatting utilities.
// formatDuration is intentionally NOT here: Results.jsx uses "2m 05s" format
// while MockExamResults.jsx imports a "2:05" format from quiz/mockExam.js.
// Keep them separate to avoid silently changing displayed output.

export function formatTimestamp(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleString();
  } catch {
    return null;
  }
}

export function formatDelta(delta) {
  if (typeof delta !== 'number' || !Number.isFinite(delta)) return null;
  if (delta === 0) return '±0';
  return delta > 0 ? `+${delta}` : `${delta}`;
}
