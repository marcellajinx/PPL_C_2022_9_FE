import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

import Layout from "./Layout";
import DashboardMhs from "./mhs/Dashboard";
import DashboardAdm from "./adm/Dashboard";
import DashboardDsn from "./dsn/Dashboard";
import DashboardDept from "./dept/Dashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  if (user) {
    // console.log(user);
    if (user.alamat === "NOT SET" && user.no_hp === "NOT SET") {
      navigate("/data");
    }
    if (user.nim) {
      return (
        <Layout>
          <DashboardMhs />
        </Layout>
      );
    } else {
      if (user.nip.slice(0, 2) === "88") {
        // operator
        return (
          <Layout>
            <DashboardAdm />
          </Layout>
        );
      } else if (user.nip.slice(0, 2) === "99") {
        // dosen
        return (
          <Layout>
            <DashboardDsn />
          </Layout>
        );
      } else {
        return (
          <Layout>
            <DashboardDept />
          </Layout>
        );
      }
    }
  }

  // if (user.roles === "1") {
  //   return (
  //     <Layout>
  //       <DashboardMhs />
  //     </Layout>
  //   );
  // } else if (user.roles === "3") {
  //   return (
  //     <Layout>
  //       <DashboardAdm />
  //     </Layout>
  //   );
  // }
};

export default Dashboard;
