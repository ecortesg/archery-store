import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Product } from "../../components/Product";
import { Box, Typography, Button } from "@mui/material";
import { useProductSearchQuery, useLazyProductSearchQuery } from "../../api";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useProductSearchQuery({
    query,
    page,
  });

  const [fetchNextProducts] = useLazyProductSearchQuery();

  function loadMoreProducts() {
    if (data.next) {
      setPage((prevPage) => prevPage + 1);
      fetchNextProducts({ query, page });
    }
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>{JSON.stringify(error)}</Typography>;
  }

  return (
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
  );
}
