import { ErrorObject } from '@lib/interfaces';

export function handleInvalidToken(err: Error): [boolean, ErrorObject] {
  return [
    err.message.toLowerCase().includes('invalid'),
    { status: 400, name: 'INVALID_TOKEN', message: err.message, stack: err.stack },
  ];
}
