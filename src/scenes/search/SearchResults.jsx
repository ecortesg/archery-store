import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Product } from "../../components/Product";
import { Box, Typography, Button } from "@mui/material";
import { useLazyProductSearchQuery } from "../../api";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [fetchNextProducts, { data, isLoading, isError, error, isSuccess }] =
    useLazyProductSearchQuery();

  const fetchInitialData = () => {
    fetchNextProducts({ query, page: 1 }, { force: true });
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  function loadMoreProducts() {
    if (data.next) {
      const url = new URL(data.next);
      const params = new URLSearchParams(url.search);
      const pageValue = params.get("page");
      fetchNextProducts({ query, page: pageValue });
    }
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>{JSON.stringify(error)}</Typography>;
  }

  return (
    isSuccess && (
      <Box width="80%" margin="80px auto">
        <Typography variant="h3" fontWeight="bold">
          Search
        </Typography>
        <Typography sx={{ marginTop: "25px" }}>
          {`${data.count} result${data.count === 1 ? "" : "s"} for "${query}"`}
        </Typography>
        <Box mt="25px" width="100%">
          <Box
            margin="0 auto"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 300px)"
            justifyContent="space-around"
            rowGap="20px"
            columnGap="1.33%"
          >
            {data.results.map((product) => (
              <Product product={product} key={product.uuid} />
            ))}
          </Box>
          {data.next && (
            <Box textAlign="center" mt="40px">
              <Button
                variant="contained"
                color="primary"
                onClick={loadMoreProducts}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    )
  );
}
