import createController from '../../lib/server/createController';
import { Dictionary } from '../../lib/interfaces';
import { CustomerSchema } from '../../lib/schemas/customer';

const userLogin = createController((_req, _res) => {});

const userRegister = createController<Dictionary, CustomerSchema>(async (_req, _res) => {
  // const { email, username, password, paymentInfo } = req.body;
  // const { card, amount, dueDate } = paymentInfo;
  // const { number, expirationYear, expirationMonth, cvc } = card;
  // const user = await prisma.customer.create({
  //   data: {
  //     email,
  //     username,
  //     password,
  //     paymentInfo: {
  //       create: {
  //         amount,
  //         dueDate,
  //         card: {
  //           connectOrCreate: {
  //             create: {
  //               number,
  //               expirationYear,
  //               expirationMonth,
  //               cvc,
  //             },
  //             where: {},
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
});

const appRegister = createController((_req, _res) => {});

export default { userLogin, userRegister, appRegister };
