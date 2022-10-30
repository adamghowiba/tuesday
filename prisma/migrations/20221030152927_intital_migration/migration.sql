-- CreateTable
CREATE TABLE "Board" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "is_favorite" BOOLEAN NOT NULL,
    "activatedViews" TEXT[],

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "column_values" JSONB NOT NULL,
    "board_id" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
