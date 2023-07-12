import { MainCarousel } from "./MainCarousel";
import { ShoppingList } from "./ShoppingList";

export function Home() {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
    </div>
  );
}
