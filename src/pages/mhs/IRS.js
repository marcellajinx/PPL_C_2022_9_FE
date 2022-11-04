import Layout from "../Layout";
import FormAddIRS from "../../components/Mhs_FormAddIRS";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const IRS = () => {
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
    if (user) {
      if (user.nim === "0") {
        navigate("/dashboard");
      }
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <FormAddIRS />
    </Layout>
  );
};

export default IRS;
