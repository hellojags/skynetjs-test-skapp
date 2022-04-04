import './App.css';
import { MySky } from "./components/mysky/MySky";
import { MyDropzone } from "./components/MyDropzone";
import { useSkynet } from "./context";
import { Grid, Button } from "@mui/material";

function Home() {
  const { loggedIn, userID } = useSkynet();
  return (
    <div className="App">
      <Grid container spacing={12}>
        <Grid item md={12}>
          <MySky></MySky>
        </Grid>
        <Grid item md={12}>{loggedIn ? "I am In" : "loading..."}</Grid>
       <MyDropzone/>
      </Grid>
    </div>
  );
}

export default Home;
