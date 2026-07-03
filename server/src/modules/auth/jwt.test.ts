import {
  generateAccessToken,
  verifyAccessToken,
} from './jwt';

const token = generateAccessToken({
  userId: '123',
  email: 'test@example.com',
  role: 'ADMIN',
});

console.log('Token:\n', token);

const decoded = verifyAccessToken(token);

console.log('\nDecoded:\n', decoded);