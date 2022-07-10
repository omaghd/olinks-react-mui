import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { profile, user } = useAuth();

  return (
    <Box flex={10} p={1} pb={10}>
      <Card>
        <CardContent sx={{ width: { xs: "auto", md: 500 } }}>
          <Typography
            variant="h4"
            textTransform="uppercase"
            fontWeight={500}
            mb={3}
          >
            Profile
          </Typography>
          <Stack spacing={2} mb={3}>
            <Box alignSelf="center">
              <Avatar
                alt={user?.displayName ?? profile?.username}
                src={user?.photoURL}
                sx={{ width: 100, height: 100 }}
              />
            </Box>

            <Button
              startIcon={<PhotoCamera />}
              color="primary"
              component="span"
            >
              Change Avatar
            </Button>

            <TextField
              label="Name"
              variant="filled"
              fullWidth
              value={user?.displayName ?? ""}
            />

            <TextField
              label="Username"
              variant="filled"
              fullWidth
              value={profile?.username ?? ""}
            />

            <TextField
              label="Bio"
              variant="filled"
              fullWidth
              value={profile?.bio ?? ""}
              multiline
              rows={4}
            />

            <TextField
              label="Email"
              variant="filled"
              fullWidth
              value={user?.email ?? ""}
            />
          </Stack>

          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<EditIcon />}
            variant="contained"
            size="large"
          >
            Update
          </LoadingButton>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
