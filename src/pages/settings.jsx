import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";
import PasswordIcon from "@mui/icons-material/Password";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import { SnackbarProvider, useSnackbar } from "notistack";

const SettingsForm = () => {
  const { profile, updateSettings } = useAuth();

  const [value, setValue] = useState("1");

  const [isLoadingGeneral, setIsLoadingGeneral] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const validationGeneral = yup.object({
    textColor: yup
      .string("Enter a text color")
      .required("Text color is required"),
    backgroundColor: yup
      .string("Enter a background color")
      .required("Background color is required"),
  });

  const formikGeneral = useFormik({
    initialValues: {
      textColor: profile?.textColor ?? "",
      backgroundColor: profile?.backgroundColor ?? "",
      isVisible: profile?.isVisible,
      displayVisits: profile?.displayVisits,
    },
    validationSchema: validationGeneral,
    onSubmit: async (values) => {
      setIsLoadingGeneral(true);
      await updateSettings(values);
      enqueueSnackbar("Settings updated successfully!", {
        variant: "success",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
        },
        autoHideDuration: 3000,
      });
      setIsLoadingGeneral(false);
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [values, setValues] = useState({
    showCurrentPassword: false,
    showNewPassword: false,
  });

  const handleClickShowCurrentPassword = () => {
    setValues({
      ...values,
      showCurrentPassword: !values.showCurrentPassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };

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
            Settings
          </Typography>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="General" value="1" />
                <Tab label="Password" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <form onSubmit={formikGeneral.handleSubmit}>
                <Stack spacing={2} mb={3}>
                  <FormGroup>
                    <FormControlLabel
                      name="isVisible"
                      control={
                        <Switch
                          checked={formikGeneral.values.isVisible}
                          onChange={formikGeneral.handleChange}
                        />
                      }
                      label="Active"
                      labelPlacement="end"
                    />

                    <FormControlLabel
                      name="displayVisits"
                      control={
                        <Switch
                          checked={formikGeneral.values.displayVisits}
                          onChange={formikGeneral.handleChange}
                        />
                      }
                      label="Display views counter"
                      labelPlacement="end"
                    />
                  </FormGroup>

                  <TextField
                    label="Text Color"
                    variant="filled"
                    fullWidth
                    name="textColor"
                    value={formikGeneral.values.textColor}
                    onChange={formikGeneral.handleChange}
                    error={
                      formikGeneral.touched.textColor &&
                      Boolean(formikGeneral.errors.textColor)
                    }
                    helperText={
                      formikGeneral.touched.textColor &&
                      formikGeneral.errors.textColor
                    }
                  />

                  <TextField
                    label="Background Color"
                    variant="filled"
                    fullWidth
                    name="backgroundColor"
                    value={formikGeneral.values.backgroundColor}
                    onChange={formikGeneral.handleChange}
                    error={
                      formikGeneral.touched.backgroundColor &&
                      Boolean(formikGeneral.errors.backgroundColor)
                    }
                    helperText={
                      formikGeneral.touched.backgroundColor &&
                      formikGeneral.errors.backgroundColor
                    }
                  />
                </Stack>

                <LoadingButton
                  loading={isLoadingGeneral}
                  loadingPosition="start"
                  startIcon={<EditIcon />}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Update
                </LoadingButton>
              </form>
            </TabPanel>

            <TabPanel value="2">
              <Stack spacing={2} mb={3}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="current-password">
                    Current Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="current-password"
                    type={values.showCurrentPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowCurrentPassword}
                          edge="end"
                        >
                          {values.showCurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Current Password"
                  />
                </FormControl>

                <FormControl variant="outlined">
                  <InputLabel htmlFor="new-password">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="new-password"
                    type={values.showNewPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {values.showNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="New Password"
                  />
                </FormControl>
              </Stack>

              <LoadingButton
                loading={false}
                loadingPosition="start"
                startIcon={<PasswordIcon />}
                variant="contained"
                size="large"
              >
                Change
              </LoadingButton>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Box>
  );
};

const Settings = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <SettingsForm />
    </SnackbarProvider>
  );
};
export default Settings;
