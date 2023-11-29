import { useTheme, Box, Typography } from "@mui/material";
import { shades } from "../../theme";

export function Footer() {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            FITNESS STORE
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            facilis, excepturi consequuntur itaque obcaecati eaque illum, velit
            recusandae, voluptatibus ipsum sint iste sunt eligendi. Fugiat
            reprehenderit ad aspernatur eum ipsum!
          </div>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            ABOUT US
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            CUSTOMER CARE
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>
        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            CONTACT US
          </Typography>
          <Typography mb="30px">
            50 North Johnson Blvd. Washington DC 10501
          </Typography>
          <Typography mb="30px">email@example.com</Typography>
          <Typography mb="30px">55 0123 4567</Typography>
        </Box>
      </Box>
    </Box>
  );
}
