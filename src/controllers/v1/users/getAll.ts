import { createController } from '@lib/server';
import { Dictionary, PaginatedResponse, UserWithRole } from '@lib/interfaces';
import { PaginationQuerySchema } from '@lib/schemas/pagination';
import userService from '@services/user.service';

const getAll = createController<
  PaginatedResponse<{ users: UserWithRole[] }> | { users: UserWithRole[] },
  Dictionary,
  PaginationQuerySchema
>(async (req, res) => {
  const users = await userService.findAll({ ...req.pagination?.query });

  if (!req.pagination) {
    res.status(200).json({ status: 200, message: 'Successfully fetched users', data: { users } });
    return;
  }

  const numberOfUsers = await userService.count();
  const pagination = req.pagination.createPagination(numberOfUsers);

  res
    .status(200)
    .json({ status: 200, message: 'Successfully fetched users', data: { ...pagination, data: { users } } });
});

export default getAll;
