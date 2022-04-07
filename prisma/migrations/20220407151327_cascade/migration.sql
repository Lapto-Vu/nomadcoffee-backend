-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_shopsId_fkey";

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_shopsId_fkey" FOREIGN KEY ("shopsId") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
