-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_shopsId_fkey";

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_shopsId_fkey" FOREIGN KEY ("shopsId") REFERENCES "CoffeeShop"("id") ON DELETE SET NULL ON UPDATE SET NULL;
