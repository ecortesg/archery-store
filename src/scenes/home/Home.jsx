import { MainCarousel } from "./MainCarousel";
import { ShoppingList } from "./ShoppingList";
import { useHomeQuery } from "../../api";
import { Typography } from "@mui/material";

export function Home() {
  const { data, isLoading, isError, error } = useHomeQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>{JSON.stringify(error)}</Typography>;
  }

  const { carousel_images, new_arrivals, best_sellers, sale_items } = data;

  return (
    <div className="home">
      <MainCarousel carouselImages={carousel_images} />
      <ShoppingList
        newArrivals={new_arrivals}
        bestSellers={best_sellers}
        saleItems={sale_items}
      />
    </div>
  );
}
