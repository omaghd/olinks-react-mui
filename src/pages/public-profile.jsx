import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PreviewLink from "../components/PreviewLink";

import { db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { SITE_TITLE } from "../config/globalVariables";

const PublicProfile = () => {
  const [publicLinks, setPublicLinks] = useState([]);
  const [profile, setProfile] = useState(null);

  let { username } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    document.title = profile?.username
      ? `@${profile?.username} | ${SITE_TITLE}`
      : SITE_TITLE;

    console.log(profile);
  }, [profile]);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      where("isVisible", "==", true)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) navigate("/404");

      querySnapshot.forEach((profile) => {
        setProfile(profile.data());
      });
    });

    return () => {
      unsubscribe();
    };
  }, [username, navigate]);

  useEffect(() => {
    if (profile) {
      const q = query(
        collection(db, "links"),
        where("user_id", "==", profile?.uid),
        where("isVisible", "==", true),
        orderBy("createdAt")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPublicLinks([]);
        querySnapshot.forEach((link) => {
          if (link.data().title !== "" && link.data().url !== "")
            setPublicLinks((prevLinks) => [
              { id: link.id, ...link.data() },
              ...prevLinks,
            ]);
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [profile]);

  return profile ? (
    <Box minHeight="100vh" py={4} bgcolor={profile?.backgroundColor}>
      <Container maxWidth="sm">
        <Stack alignItems="center" justifyContent="center" spacing={1} mb={4}>
          <Avatar
            sx={{ width: 120, height: 120 }}
            alt={profile?.displayName ?? profile?.username}
            src={profile?.photoURL}
          />

          <Typography color={profile?.textColor} textAlign="center">
            {profile?.displayName
              ? profile?.displayName
              : `@${profile?.username}`}
          </Typography>

          {profile?.displayVisits && (
            <Box mb={3}>
              <Chip
                size="small"
                label={`0 Views`}
                variant="outlined"
                sx={{ color: profile?.textColor }}
              />
            </Box>
          )}
        </Stack>

        <Stack spacing={2}>
          {publicLinks.map((link) => (
            <PreviewLink
              key={link.id}
              link={link}
              textColor={profile?.textColor}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  ) : (
    <Grid
      container
      minHeight="100vh"
      justifyContent="center"
      alignContent="center"
    >
      <CircularProgress size={150} />
    </Grid>
  );
};

export default PublicProfile;
