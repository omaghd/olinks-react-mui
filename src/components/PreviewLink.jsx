import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const PreviewLink = ({ link, textColor }) => {
  return (
    <ButtonBase>
      <Box
        component="a"
        href={link.url}
        target="_blank"
        sx={{ textDecoration: "none", wordWrap: "break-word" }}
        border={2}
        borderColor={textColor}
        borderRadius={1}
        p={1}
        width="100%"
      >
        <Typography color={textColor}>{link.title}</Typography>
      </Box>
    </ButtonBase>
  );
};

export default PreviewLink;
