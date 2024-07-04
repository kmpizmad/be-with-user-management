import { ErrorObject } from '../interfaces/server';

export function handleInvalidToken(err: Error): [boolean, ErrorObject] {
  return [
    err.message.toLowerCase().includes('invalid'),
    { status: 400, name: 'INVALID_TOKEN', message: err.message, stack: err.stack },
  ];
}
