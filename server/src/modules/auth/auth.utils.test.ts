import {
  comparePassword,
  hashPassword,
} from './auth.utils';

async function run() {
  const password = 'Password@123';

  const hash = await hashPassword(password);

  console.log('Hash:', hash);

  const valid = await comparePassword(password, hash);

  console.log('Valid:', valid);

  const invalid = await comparePassword(
    'WrongPassword',
    hash,
  );

  console.log('Invalid:', invalid);
}

run();