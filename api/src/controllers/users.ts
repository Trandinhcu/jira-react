import { User } from 'entities';
import { updateEntity, createEntity, deleteEntity } from 'utils/typeorm';
import { catchErrors } from 'errors';

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});

export const updateProfile = catchErrors(async (req, res) => {
  const user = await updateEntity(User, req.currentUser.id, req.body);
  req.currentUser = user;
  res.respond({ currentUser: req.currentUser });
});

export const index = catchErrors(async (req, res) => {
  const { searchTerm, current = 1, pageSize = 5 } = req.query;

  let whereSQL = '1 = 1';
  if (searchTerm) {
    whereSQL += ' AND (user.name ILIKE :searchTerm OR user.email ILIKE :searchTerm)';
  }

  const query = User.createQueryBuilder('user').where(whereSQL, { searchTerm: `%${searchTerm}%` });

  const users = await query
    .orderBy('id', 'DESC')
    .offset((current - 1) * pageSize)
    .limit(pageSize)
    .getMany();

  const total = await query.getCount();

  res.respond({ data: users, total, current, pageSize });
});

export const store = catchErrors(async (req, res) => {
  const user = await createEntity(User, req.body);
  res.respond({ user });
});

export const edit = catchErrors(async (req, res) => {
  const user = await updateEntity(User, req.params.id, req.body);
  res.respond({ user });
});

export const remove = catchErrors(async (req, res) => {
  const user = await deleteEntity(User, req.params.id);
  res.respond({ user });
});
