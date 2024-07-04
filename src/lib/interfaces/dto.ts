import { User } from '@prisma/client';
import { prisma } from '../../clients';
import { DropUndefined } from '.';

export type DtoPagination = { skip: number; take: number };

export type DtoKey = {
  [K in keyof typeof prisma]: K extends string ? (K extends `$${string}` ? never : K) : never;
}[keyof typeof prisma];

export type DtoFindMany<T extends (...args: any) => any> = {
  skip: number;
  take: number;
  include?: DtoInclude<T>;
  orderBy?: DtoOrderBy;
};

export type DtoInclude<T extends (...args: any) => any> = (keyof Omit<
  { [P in keyof FindInclude<T>]: boolean },
  '_count'
>)[];

export type DtoOrderBy = { [P in keyof User]: 'asc' | 'desc' };

type DtoArgs<T extends (...args: any) => any> = DropUndefined<Parameters<T>[0]>;
type FindInclude<T extends (...args: any) => any> = DropUndefined<DtoArgs<T>['include']>;
