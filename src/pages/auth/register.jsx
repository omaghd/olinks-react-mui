import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import * as yup from "yup";
import SecondaryLink from "../../components/SecondaryLink";

const Register = () => {
  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .min(3, "Username should be of minimum 3 characters length")
      .required("Username is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", username: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid
      direction="column"
      container
      alignItems="center"
      sx={{ marginTop: "30px", marginBottom: "30px" }}
    >
      <Grid sx={{ width: { xs: 300, sm: 400 } }}>
        <Typography
          textAlign="center"
          variant="h3"
          fontWeight="200"
          sx={{ marginBottom: "30px" }}
        >
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <TextField
              fullWidth
              variant="standard"
              name="username"
              label="Username"
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              variant="standard"
              name="email"
              label="Email"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              variant="standard"
              name="password"
              label="Password"
              type="password"
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Stack>

          <Stack gap={3} sx={{ marginTop: "40px" }}>
            <Button variant="contained" type="submit">
              Register
            </Button>

            <SecondaryLink to="/login">Do you have an account?</SecondaryLink>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
