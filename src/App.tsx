import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.scss";

import Register from "./components/Pages/Authentication/Register";
import Login from "./components/Pages/Authentication/Login";
import Home from "./components/Pages/Home/Home";
import DetailManga from "./components/Pages/DetailManga/DetailManga";
import ReadManga from "./components/Pages/ReadManga/ReadManga";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
import Search from "./components/Pages/Search/Search";
import Readlist from "./components/Pages/Readlist/Readlist";
import Options from "./components/Pages/Options/Options";

import Header from "./components/Header/Header";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/readlist" element={<Readlist></Readlist>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/options" element={<Options></Options>}></Route>
        <Route path="/manga/:id" element={<DetailManga></DetailManga>}></Route>
        <Route path="/manga/:id/:chapterID" element={<ReadManga></ReadManga>}></Route>
        <Route path="/user/:id" element={<UserProfile></UserProfile>}></Route>
      </Routes>
    </div>
  );
}

export default App;
