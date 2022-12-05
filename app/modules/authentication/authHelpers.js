import jwt from 'jsonwebtoken';

// Configs
import { JWT_SECRET } from '../../../config/envConfig';

export function createJwtToken(payload, expiresIn = '1h') {
  const jwtToken = jwt.sign({
    data: payload,
  }, JWT_SECRET, { expiresIn });

  return jwtToken;
}
