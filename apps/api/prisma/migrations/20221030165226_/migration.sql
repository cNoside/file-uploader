/*
  Warnings:

  - Added the required column `path` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `upload` ADD COLUMN `path` VARCHAR(191) NOT NULL;
