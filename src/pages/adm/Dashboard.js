import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BarChartStatus from "../../components/Chart_BarStatus";
import PieChartStatus from "../../components/Chart_PieStatus";
import PieChartVerifIRS from "../../components/Chart_PieVerifIRS";
import PieChartVerifKHS from "../../components/Chart_PieVerifKHS";
import PieChartVerifPKL from "../../components/Chart_PieVerifPKL";
import PieChartVerifSkripsi from "../../components/Chart_PieVerifSkripsi";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout";

const DashboardAdm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (user.nip.slice(0, 2) !== "88") {
        navigate("/dashboard");
      }
    }
    if ((user && !user.nip) || (user && user.nip.slice(0, 2) !== "88")) {
      // kalo ga operator, cabut
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  const [countDsn, setCountDsn] = useState("");
  const [countMhs, setCountMhs] = useState("");
  const [countAdm, setCountAdm] = useState("");
  const [countDept, setCountDept] = useState("");

  useEffect(() => {
    getCountDosen();
    getCountMhs();
    getCountAdm();
  });

  const getCountDosen = async () => {
    try {
      const response = await fetch(`http://localhost:5000/count/dosen`);
      let json = await response.json();
      setCountDsn(json.msg);
    } catch (error) {
      setCountDsn(0);
    }
  };
  const getCountMhs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/count/mhs`);
      let json = await response.json();
      setCountMhs(json.msg);
    } catch (error) {
      setCountMhs(0);
    }
  };
  const getCountAdm = async () => {
    try {
      const response = await fetch(`http://localhost:5000/count/adm`);
      let json = await response.json();
      setCountAdm(json.msg);
    } catch (error) {
      setCountAdm(0);
    }
  };

  useEffect(() => {
    getAllAdm();
  }, []);
  async function getAllAdm() {
    try {
      let response;
      response = await fetch(`http://localhost:5000/admin`);
      let json = await response.json();
      if (!Array.isArray(json) && json != {}) {
        json = [json];
      }
      setAdmin(json);
    } catch (error) {
      setAdmin([]);
    }
  }

  return (
    <div className="mb-16 relative flex-initial w-full flex">
      <div className="px-24 text-center bg-white w-full inset-y-0 left-0 grid py-16">
        <div className="w-full py-8 px-12 bg-slate-100 border border-slate-100 shadow-2xl grid place-self-center">
          <h1>Status Mahasiswa</h1>
          <div className="place-self-center w-full">
            {/* <img className="max-w-full h-auto" src={chart1} /> */}
            <BarChartStatus />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 space-8 gap-36 py-24">
            <div className="boder border-slate-100 bg-slate-100 rounded-md shadow-xl">
              <div className="p-4 border-b ">
                <h4 className="text-lg font-semibold bg-slate-100 text-gray-500 dark:text-light px-4">
                  Status Verifikasi IRS
                </h4>
              </div>
              <div className="relative p-4 h-76 w-full">
                <div className="h-auto w-full items-center justify-center p-5">
                  <div className="place-self-center">
                    {/* <img className="w-full h-full scale-100" src={chart2} /> */}
                    <PieChartVerifIRS />
                  </div>
                </div>
              </div>
            </div>
            <div className="boder border-slate-100 bg-slate-100 rounded-md shadow-xl">
              <div className="p-4 border-b ">
                <h4 className="text-lg font-semibold bg-slate-100 text-gray-500 dark:text-light px-4">
                  Status Verifikasi KHS
                </h4>
              </div>
              <div className="relative p-4 h-76 w-full">
                <div className="h-auto w-full items-center justify-center p-5">
                  <div className="place-self-center">
                    {/* <img className="w-full h-full scale-100" src={chart2} /> */}
                    <PieChartVerifKHS />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 space-8 gap-36 pb-8">
            <div className="boder border-slate-100 bg-slate-100 rounded-md shadow-xl">
              <div className="p-4 border-b ">
                <h4 className="text-lg font-semibold bg-slate-100 text-gray-500 dark:text-light px-4">
                  Status Verifikasi PKL
                </h4>
              </div>
              <div className="relative p-4 h-76 w-full">
                <div className="h-auto w-full items-center justify-center p-5">
                  <div className="place-self-center">
                    {/* <img className="w-full h-full scale-100" src={chart2} /> */}
                    <PieChartVerifPKL />
                  </div>
                </div>
              </div>
            </div>
            <div className="boder border-slate-100 bg-slate-100 rounded-md shadow-xl">
              <div className="p-4 border-b ">
                <h4 className="text-lg font-semibold bg-slate-100 text-gray-500 dark:text-light px-4">
                  Status Verifikasi Skripsi
                </h4>
              </div>
              <div className="relative p-4 h-76 w-full">
                <div className="h-auto w-full items-center justify-center p-5">
                  <div className="place-self-center">
                    {/* <img className="w-full h-full scale-100" src={chart2} /> */}
                    <PieChartVerifSkripsi />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdm;
