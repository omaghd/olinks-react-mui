import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as yup from "yup";
import SecondaryLink from "../../components/SecondaryLink";
import red from "@mui/material/colors/red";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const navigate = useNavigate();

  const validationSchema = yup.object({
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
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        setIsLoading(true);
        let user = await login(values.email, values.password);
        setIsLoading(false);
        if (user) navigate("/dashboard");
      } catch (e) {
        setError("This user is not found!");
        setIsLoading(false);
      }
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
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
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
            {error && (
              <Typography variant="string" color={red[400]} fontSize="15px">
                {error}
              </Typography>
            )}
          </Stack>

          <Stack gap={3} sx={{ marginTop: "40px" }}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
            >
              Login
            </LoadingButton>

            <SecondaryLink to="/register">Create an account?</SecondaryLink>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
