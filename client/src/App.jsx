import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Header from "./components/header";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from "./pages/Search";
import DashboardHome from "./pages/Dashboard/Dashboard";
import MyListings from "./pages/Dashboard/MyListing";
import AddListing from "./pages/Dashboard/AddListing";
import EditListing from "./pages/Dashboard/EditListing";




const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search />} />

        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          {/* Dashboard routes */}
          <Route path='/dashboard' element={<DashboardHome />} />
        <Route path='/dashboard/listings' element={<MyListings />} />
        <Route path='/dashboard/add' element={<AddListing />} />
        <Route path='/dashboard/edit/:listingId' element={<EditListing />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing/>} />
          <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
        </Route> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
