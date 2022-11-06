/*
  Warnings:

  - You are about to drop the column `activatedViews` on the `Board` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BoardStatus" AS ENUM ('PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('DOCUMENT', 'ITEM_BOARD');

-- CreateEnum
CREATE TYPE "ColumnType" AS ENUM ('AUTO_NUMBER', 'CHECKBOX', 'LONG_TEXT', 'TEXT', 'STATUS');

-- AlterTable
CREATE SEQUENCE "board_id_seq";
ALTER TABLE "Board" DROP COLUMN "activatedViews",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "folder_id" INTEGER,
ADD COLUMN     "status" "BoardStatus" NOT NULL DEFAULT E'SHARED',
ADD COLUMN     "type" "BoardType" NOT NULL DEFAULT E'ITEM_BOARD',
ALTER COLUMN "id" SET DEFAULT nextval('board_id_seq'),
ALTER COLUMN "is_favorite" DROP NOT NULL;
ALTER SEQUENCE "board_id_seq" OWNED BY "Board"."id";

-- AlterTable
CREATE SEQUENCE "item_id_seq";
ALTER TABLE "Item" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" SET DEFAULT nextval('item_id_seq');
ALTER SEQUENCE "item_id_seq" OWNED BY "Item"."id";

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent_folder_id" INTEGER,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Column" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ColumnType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "board_id" INTEGER NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parent_folder_id_fkey" FOREIGN KEY ("parent_folder_id") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
