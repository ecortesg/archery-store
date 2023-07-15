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
            BOWTIQUE
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
            Conócenos
          </Typography>
          <Typography mb="30px">Quiénes somos</Typography>
          <Typography mb="30px">Trabaja con nosotros</Typography>
          <Typography mb="30px">Condiciones de uso</Typography>
          <Typography mb="30px">Aviso de privacidad</Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Servicio a cliente
          </Typography>
          <Typography mb="30px">Centro de ayuda</Typography>
          <Typography mb="30px">Rastrea tu orden</Typography>
          <Typography mb="30px">Devoluciones y reembolsos</Typography>
        </Box>
        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contacto
          </Typography>
          <Typography mb="30px">
            Av. Dirección Inventada 214, Col. Donde Sea, Alc. La Que Gustes,
            01234
          </Typography>
          <Typography mb="30px">Correo</Typography>
          <Typography mb="30px">55 0123 4567</Typography>
        </Box>
      </Box>
    </Box>
  );
}
