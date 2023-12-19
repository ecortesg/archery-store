import { useEffect, useState } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { client } from "../../api";

// // Imports all images from the assets folder
// function importAll(r) {
//   return r.keys().reduce((acc, item) => {
//     acc[item.replace("./", "")] = r(item);
//     return acc;
//   }, {});
// }

// const gallery = Object.values(
//   import.meta.glob("../../assets/*.{png,jpg,jpeg,PNG,JPEG}", {
//     eager: true,
//     as: "url",
//   })
// );

export function MainCarousel() {
  const [gallery, setGallery] = useState([]);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const imageHeight = isNonMobile ? "66vh" : "700px";

  async function getGallery() {
    const imagesResponse = await client.get("api/v1/home/carousel-images/");
    const images = await imagesResponse.data;
    setGallery(images);
  }

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {gallery.length &&
        gallery.map((image) => (
          <Box key={image.uuid}>
            <img
              src={image.image}
              alt={image.name}
              style={{
                width: "100%",
                height: imageHeight,
                objectFit: "cover",
                backgroundAttachment: "fixed",
              }}
            />
          </Box>
        ))}
    </Carousel>
  );
}
