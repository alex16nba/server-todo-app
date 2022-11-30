import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';

export function responseToJSON(prop, statusCode) {
  // This can be extended for more complex use cases
  return function lastMiddleware(req, res) {
    const propData = req.resources[prop];
    return res.status(statusCode || 200).json({ data: propData });
  };
}

export function createJwtToken(payload, expiresIn = '1h') {
  const jwtToken = jwt.sign({
    data: payload,
  }, JWT_SECRET, { expiresIn });

  return jwtToken;
}
