-- AlterTable
ALTER TABLE `follow` MODIFY `isSuggested` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `suggestionCount` INTEGER NOT NULL DEFAULT 0;
