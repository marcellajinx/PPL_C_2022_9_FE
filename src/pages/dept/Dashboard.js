import BarChartStatus from "../../components/Chart_BarStatus";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import PieChartStatus from "../../components/Chart_PieStatus";
import BarChartPKL from "../../components/Chart_BarPKL";
import BarChartSkripsi from "../../components/Chart_BarSkripsi";
import PieChartVerifPKL from "../../components/Chart_PieVerifPKL";
import PieChartVerifSkripsi from "../../components/Chart_PieVerifSkripsi";
import PieChartVerifKHS from "../../components/Chart_PieVerifKHS";
import PieChartVerifIRS from "../../components/Chart_PieVerifIRS";
const DashboardDept = () => {
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
      if (user.nip.slice(0, 2) !== "00" && user.nim !== "0") {
        navigate("/dashboard");
      }
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
    getCountDept();
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

  const getCountDept = async () => {
    try {
      const response = await fetch(`http://localhost:5000/count/dept`);
      let json = await response.json();
      setCountDept(json.msg);
    } catch (error) {
      setCountDept(0);
    }
  };

  return (
    <div className="mb-16 p-16 pb-16 relative bg-white flex-initial w-10/12">
      <div className="mb-5 p-5 pb-1 relative bg-white flex-initial">
        <div class="flow-root">
          <h3 className="text-2xl font-bold float-left flex my-1">Dashboard</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center justify-between p-4 px-8 bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="mt-2 mb-2">
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase mt-2 mb-2">
              Total Mahasiswa
            </h6>
            <span className="text-3xl font-semibold">{countMhs}</span>
          </div>
          <div className="mt-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 px-8 bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="mt-2 mb-2">
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase mt-2 mb-2">
              Total Dosen
            </h6>
            <span id="tot-dosen" className="text-3xl font-semibold">
              {countDsn}
            </span>
          </div>
          <div className="mt-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 px-8 bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="mt-2 mb-2">
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase mt-2 mb-2">
              Total Operator
            </h6>
            <span className="text-3xl font-semibold">{countAdm}</span>
          </div>
          <div className="mt-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 px-8 bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="mt-2 mb-2">
            <h6 className="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase mt-2 mb-2">
              Total Department
            </h6>
            <span className="text-3xl font-semibold">{countDept}</span>
          </div>
          <div className="mt-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-3">
        <div className="col-span-2 bg-white rounded-md border border-slate-100 shadow-xl  ">
          <div className="flex items-center justify-between p-4 border-b border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Status Mahasiswa
            </h4>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="relative p-4 h-76 w-76">
            {/* <div className="chartjs-size-monitor">
              <div className="chartjs-size-monitor-expand">
                <div></div>
              </div>
              <div className="chartjs-size-monitor-shrink">
                <div></div>
              </div>
            </div>
            <canvas id="barChart" width="1214" height="512" style="display: block; height: 256px; width: 607px;" class="chartjs-render-monitor"></canvas> */}
            <div className="h-76 w-76 items-center px-10">
              <div className="place-self-center">
                {/* <img className="max-w-96 h-auto" src={chart3} /> */}
                <BarChartStatus />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Distribusi Mahasiswa
            </h4>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="relative p-4 h-76 w-full">
            <div className="h-auto w-full items-center justify-center p-5">
              <div className="place-self-center">
                {/* <img className="w-full h-full scale-100" src={chart2} /> */}
                <PieChartStatus />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-4">
        <div className="bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Status Verfikasi <br /> IRS
            </h4>
            <div className="flex items-center space-x-2"></div>
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
        <div className="bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Status Verfikasi KHS
            </h4>
            <div className="flex items-center space-x-2"></div>
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
        <div className="bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Status Verifikasi PKL
            </h4>
            <div className="flex items-center space-x-2"></div>
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
        <div className="bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Status Verifikasi Skripsi
            </h4>
            <div className="flex items-center space-x-2"></div>
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
      <div className="grid grid-cols-1 p-4 space-y-8 lg:gap-8 lg:space-y-0 lg:grid-cols-2">
        <div className="bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Rekap PKL Mahasiswa
            </h4>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="relative p-4 h-76 w-full">
            <div className="h-auto w-full items-center justify-center p-5">
              <div className="place-self-center">
                {/* <img className="w-full h-full scale-100" src={chart3} /> */}
                <BarChartPKL />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md border border-slate-100 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b dark:border-primary">
            <h4 className="text-lg font-semibold text-gray-500 dark:text-light px-4">
              Rekap Skripsi Mahasiswa
            </h4>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="relative p-4 h-76 w-full">
            <div className="h-auto w-full items-center justify-center p-5">
              <div className="place-self-center">
                {/* <img className="w-full h-full scale-100" src={chart3} /> */}
                <BarChartSkripsi />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDept;
