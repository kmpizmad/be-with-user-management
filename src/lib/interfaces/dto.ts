import { User } from '@prisma/client';

import { prisma } from '@clients';

import { DropUndefined, Prettify } from '.';

export type DtoPagination = { skip: number; take: number };

export type DtoKey = {
  [K in keyof typeof prisma]: K extends string ? (K extends `$${string}` ? never : K) : never;
}[keyof typeof prisma];

export type UserHistory = { logMessage: string; logType: string };
export type UserWithRole = User & { roles: string[] };

export type FindManyUserArgs = Prettify<DtoFindMany & { orderBy?: DtoOrderBy<typeof prisma.user.findMany> }>;
export type FindManyUserHistoryArgs = Prettify<
  DtoFindMany & { orderBy?: DtoOrderBy<typeof prisma.userHistory.findMany> }
>;

type DtoFindMany = { skip?: number; take?: number };
type DtoOrderBy<T extends (...args: any[]) => any> = Required<DtoArgs<T>>['orderBy'];

type DtoArgs<T extends (...args: any) => any> = DropUndefined<Parameters<T>[0]>;
