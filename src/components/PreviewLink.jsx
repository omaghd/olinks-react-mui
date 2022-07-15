import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const Link = styled(Button)((props) => ({
  borderColor: props.border,
  borderRadius: 1,
  color: props.text,
  display: "inline-block",
  wordWrap: "break-word",
  ":hover": {
    borderColor: props.border,
  },
}));

const PreviewLink = ({ link, textColor }) => {
  return (
    <Link
      variant="outlined"
      size="large"
      href={link.url}
      target="_blank"
      text={textColor}
      border={textColor}
      p={1}
      width="100%"
    >
      <Typography>{link.title}</Typography>
    </Link>
  );
};

export default PreviewLink;
