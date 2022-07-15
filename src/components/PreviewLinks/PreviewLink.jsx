import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styled from "@emotion/styled";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

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
  const updateLink = async (link) => {
    const linkRef = doc(db, "links", link.id);
    await updateDoc(linkRef, link);
  };

  const incrementViews = async () => {
    await updateLink({ ...link, views: link.views + 1 });
  };

  return (
    <Link
      variant="outlined"
      size="large"
      href={link.url}
      target="_blank"
      onClick={incrementViews}
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
