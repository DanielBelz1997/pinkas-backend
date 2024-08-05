-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "item" TEXT NOT NULL,
    "checked" BOOLEAN DEFAULT false,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_item_key" ON "Task"("item");
