import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import resetTestDatabase from 'database/resetDatabase';
import createGuestAccount  from 'database/createGuestAccount';

export const resetDatabase = catchErrors(async (_req, res) => {
  await resetTestDatabase();
  res.respond(true);
});

export const createAccount = catchErrors(async (_req, res) => {
  const user = await createGuestAccount();
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});
