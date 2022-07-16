import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import { User } from 'entities';
import crypto from 'crypto';

export const createGuestAccount = catchErrors(async (_req, res) => {
  
  const whereSQL = '  (user.email = :email AND user.password = :password)';
  const user = await User.createQueryBuilder('user')
                        .leftJoinAndSelect('user.role', 'role')
                        .where(whereSQL, {email: _req.body.email, password: crypto.createHmac('SHA256', process.env.JWT_SECRET,).update(_req.body.password).digest('base64')})
                        .getOne();
  
  if(user){
    res.respond({
      authToken: signToken({ sub: (user as any).id }),
      user: user
    });
  }
  
  return res.status(400).json({'error': '','message':'Emaill or password incorect.'});

  
});
