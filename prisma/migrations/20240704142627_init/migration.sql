-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" VARCHAR(64) NOT NULL,
    "last_name" VARCHAR(64) NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_history" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "typeId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_types" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_roles" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_key" ON "roles"("role");

-- CreateIndex
CREATE UNIQUE INDEX "log_types_type_key" ON "log_types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "_user_roles_AB_unique" ON "_user_roles"("A", "B");

-- CreateIndex
CREATE INDEX "_user_roles_B_index" ON "_user_roles"("B");

-- AddForeignKey
ALTER TABLE "user_history" ADD CONSTRAINT "user_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_history" ADD CONSTRAINT "user_history_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "log_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_roles" ADD CONSTRAINT "_user_roles_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
