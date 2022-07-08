import LoadingButton from "@mui/lab/LoadingButton";

import AddIcon from "@mui/icons-material/Add";

import { useLinks } from "../context/LinksContext";

import { useState } from "react";

const NewLinkButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { addEmptyLink } = useLinks();

  const handleNewLink = async () => {
    setIsLoading(true);
    await addEmptyLink();
    setIsLoading(false);
  };

  return (
    <LoadingButton
      startIcon={<AddIcon />}
      loadingPosition="start"
      loading={isLoading}
      sx={{ marginBottom: 2 }}
      onClick={handleNewLink}
    >
      New Link
    </LoadingButton>
  );
};

export default NewLinkButton;
