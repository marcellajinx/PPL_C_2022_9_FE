import Layout from "../Layout";
import FormAddSkripsi from "../../components/Mhs_FormAddSkripsi";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const Skripsi = () => {
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
      if (user.nim === '0') {
        navigate("/dashboard");
      }
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <FormAddSkripsi />
    </Layout>
  );
};

export default Skripsi;
