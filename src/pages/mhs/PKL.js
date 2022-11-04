import Layout from "../Layout";
import FormAddPKL from "../../components/Mhs_FormAddPKL";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PKL = () => {
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
      <FormAddPKL />
    </Layout>
  );
};

export default PKL;
