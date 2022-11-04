import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Layout from "../Layout";
import FormUpdateDataMhs from "../../components/Mhs_FormUpdateData";
import { getMe } from "../../features/authSlice";

const UpdateDataMhs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (user.nim === "0") {
        navigate("/dashboard");
      }
    }
  }, [isError, navigate, user]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (user && user.nim) {
    return (
      <Layout>
        <FormUpdateDataMhs id={user.nim} />
      </Layout>
    );
  }
};

export default UpdateDataMhs;
