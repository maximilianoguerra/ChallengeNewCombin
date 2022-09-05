import { useEffect, useState } from "react";
import "../App.css";
import { Container, Grid, Toolbar } from "@mui/material";
import FormUser from "../components/FormUser";
import UserTable from "../components/UserTable";
import { useStatePage } from "../hooks/StateProvider";
import { getUsers } from "../service/service";
import AlertDialog from "../components/AlertDialog";


const  Home = ()=>{
  let timer:any= null;
  const [open, setOpen] = useState(false);
  const {token,setRows} = useStatePage();
  useEffect(()=>{
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("keydown", resetTimer);
  },[]);

 const resetTimer = () => {
  timer && clearInterval(timer);
  timer = setTimeout(async() => {
    const resp = await getUsers(token);
    setRows(resp);
    setOpen(true)
  }, 120000);
 };
  return (
      <Container>
        <Toolbar sx={{ mt: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormUser />
          </Grid>
          <Grid item xs={6}>
            <UserTable/>
          </Grid>
        </Grid>
        <AlertDialog open={open} setOpen={setOpen}/>
      </Container>
      )
}

export default Home;