import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { getMe } from "../features/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    getSidebar();
  }, []);

  const getSidebar = async () => {
    const response = await axios.get("http://localhost:5000/sidebar");
    setSidebar(response.data);
  };

  // if (user) {
  //   if (sidebar.length === 6) {
  //     sidebar[1].url = `/data/${user.nim}`;
  //   }
  // }

  return (
    <React.Fragment>
      <div className="bg-gray-100 mx-auto">
        <Header />
        <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
          <Sidebar lists={sidebar} />
          {children}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
