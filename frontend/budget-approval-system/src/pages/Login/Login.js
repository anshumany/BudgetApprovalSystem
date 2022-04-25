import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "util/Firebase/FirebaseSetup.js";
import { getLocalStorage, setLocalStorage } from "util/Storage/Storage.js";
import styles from "./Login.style.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ACME corporation
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const navigate = useNavigate();
  const user = JSON.parse(getLocalStorage("user"));
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );
      toast.success(`Logged-in Success!`, {
        theme: "dark",
      });
      setLocalStorage(
        "user",
        JSON.stringify({
          name: user.user.displayName,
          email: data.get("email"),
        })
      );
      navigate("/dashboard");
    } catch (error) {
      let index = error.message.indexOf("/");
      toast.error(error.message.slice(index + 1, -2), {
        theme: "dark",
        position: "top-center",
      });
    }
  };

  const Gprovider = new GoogleAuthProvider();
  const signInWithGoggle = () => {
    signInWithPopup(auth, Gprovider)
      .then((result) => {
        setLocalStorage(
          "user",
          JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
          })
        );
        toast.success(`loggedin success`, {
          theme: "dark",
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.message, {
          theme: "dark",
          position: "top-center",
        });
      });
  };

  return user ? (
    <Navigate to="/dashboard" />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={styles.outerBox}>
        <Avatar sx={styles.loginIcon}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate mt={1}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" mt={3} mb={2}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Typography>OR</Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => signInWithGoggle()}
        >
          <GoogleIcon sx={{ mr: "10px" }} />
          Continue with Google
        </Button>
      </Box>
      <Copyright mt={8} mb={4} />
    </Container>
  );
}
