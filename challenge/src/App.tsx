import { Fragment } from "react";
import "./App.css";
import { AppBar, Box, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./auth/Home";


const  App = ()=>{
  
  return (
    <Fragment>
      
      <Box>
        <AppBar position="fixed">
          <Toolbar>NewCombin Challenge</Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
      </Routes>
      <Box>
        <div className="footer"><p>Copyright</p> <p>All right reserved</p></div>
      </Box>
    </Fragment>
  );
}

export default App;
