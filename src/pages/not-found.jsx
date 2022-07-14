import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignContent="center">
      <Stack textAlign="center" display="block" mb={10}>
        <Typography fontSize={100} lineHeight="1">
          404
        </Typography>
        <Typography fontSize={30}>Not Found</Typography>
      </Stack>
      <Stack textAlign="center">
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large">
            CREATE YOUR PROFILE
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default NotFound;
