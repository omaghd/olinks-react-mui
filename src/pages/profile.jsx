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
import { useState } from "react";

import styled from "@emotion/styled";

import { useFormik } from "formik";
import * as yup from "yup";

import { SnackbarProvider, useSnackbar } from "notistack";

const Input = styled("input")({
  display: "none",
});

const ProfileForm = () => {
  const { user, profile, updateAvatar, updateProfile } = useAuth();

  const [avatarPreview, setAvatarPreview] = useState(null);

  const [avatarChanged, setAvatarChanged] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e) {
    if (e.target.files[0]) {
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
      formik.values.avatar = e.target.files[0];
      setAvatarChanged(true);
    }
  }

  const validation = yup.object({
    name: yup.string("Enter a name"),
    username: yup
      .string("Enter a username")
      .min(3, "Username must be at least 3 characters long")
      .required("Username is required"),
    bio: yup.string("Enter a bio"),
    email: yup
      .string("Enter an email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter a password")
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      avatar: null,
      name: profile?.displayName ?? "",
      username: profile?.username ?? "",
      bio: profile?.bio ?? "",
      email: user?.email ?? "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (values.avatar && avatarChanged) {
        let path = await updateAvatar(values.avatar);
        if (path) values.avatar = path;
        setAvatarChanged(false);
      }

      const profileError = await updateProfile(values);

      if (profileError)
        enqueueSnackbar(profileError, {
          variant: "error",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
          autoHideDuration: 5000,
        });
      else
        enqueueSnackbar("Profile updated successfully!", {
          variant: "success",
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
          autoHideDuration: 3000,
        });

      setIsLoading(false);
    },
  });

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

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} mb={3}>
              <Box alignSelf="center">
                <Avatar
                  alt={profile?.displayName ?? profile?.username}
                  src={avatarPreview ?? profile?.photoURL}
                  sx={{ width: 150, height: 150 }}
                />
              </Box>
              <Box alignSelf="center">
                <label htmlFor="avatar-file">
                  <Input
                    accept="image/*"
                    id="avatar-file"
                    type="file"
                    onChange={handleChange}
                  />
                  <Button
                    startIcon={<PhotoCamera />}
                    color="primary"
                    component="span"
                  >
                    Change Avatar
                  </Button>
                </label>
              </Box>

              <TextField
                label="Name"
                variant="filled"
                fullWidth
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                label="Username"
                variant="filled"
                fullWidth
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />

              <TextField
                label="Bio"
                variant="filled"
                fullWidth
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
                multiline
                rows={4}
              />

              <TextField
                label="Email"
                variant="filled"
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                label="Confirm Password"
                variant="filled"
                fullWidth
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Stack>

            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              startIcon={<EditIcon />}
              variant="contained"
              size="large"
              type="submit"
            >
              Update
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

const Profile = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <ProfileForm />
    </SnackbarProvider>
  );
};

export default Profile;
