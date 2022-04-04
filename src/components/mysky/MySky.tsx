import React,{useEffect}  from "react";
import { Grid, Container,Box,Stack, Button} from "@mui/material";
import {useSkynet} from "../../context";

export function MySky() {
  const { login, logout, loggedIn, userID } = useSkynet();
  useEffect(() => {
    
  });
  return (
    <div>
      <Container maxWidth="xl">
      <Box sx={{ px: 2.5, pb: 3, mt: 1 }}>
        <Stack
          alignItems="center"
          spacing={1}
          sx={{
            p: 1.5,
            pt: 1,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >
        <Grid container paddingTop={2} spacing={2}>
          <Grid item lg={8}>
            <div>{userID}</div>
          </Grid>
          <Grid item lg={4}>
            {loggedIn === false && (
              <Button variant="contained" onClick={login}>
                Login
              </Button>
            )}
            {(loggedIn === null || loggedIn === undefined) && <Button>Loading MySky...</Button>}
            {loggedIn === true && (
              <Button 
              variant="outlined" 
              color="secondary" onClick={logout}  >Log Out of MySky</Button>
            )}
          </Grid>
        </Grid>
        </Stack>
      </Box>
      </Container>
    </div>
  );
}
