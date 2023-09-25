/*
  Warnings:

  - Added the required column `isSuggested` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggestionCount` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `follow` ADD COLUMN `isSuggested` BOOLEAN NOT NULL,
    ADD COLUMN `suggestionCount` INTEGER NOT NULL;
