export function sendApiResponse({ res, data, status }) {
  return res.status(status || 200).json({ data });
}
