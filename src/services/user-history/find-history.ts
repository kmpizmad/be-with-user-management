import historyRepository from '../../dto/history.repository';
import { FindManyUserArgs } from '../../lib/interfaces/dto';

export async function findByUserId(id: string, args?: FindManyUserArgs) {
  const history = await historyRepository.findByUserId(id, args);

  return history.map(item => ({ ...item, type: item.type.type }));
}
