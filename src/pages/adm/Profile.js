import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout";

const ProfileAdm = () => {
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
      if (user && user.nip.slice(0, 2) !== "88") {
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
      console.log(json);
      if (!Array.isArray(json) && json != {}) {
        json = [json];
      }
      setAdmin(json);
    } catch (error) {
      setAdmin([]);
    }
  }

  return (
    <Layout>
      <div className="min-h-[68vh] mb-16 relative flex-initial w-10/12 flex">
        <div className="flex inset-y-0 left-0 pb-12">
          <div className="bg-white p-12 left-0 w-11/12 gap-4">
            <div className="grid grid-cols-3 gap-8 py-4 ">
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
            </div>
            <br />
            <h1 className="font-bold text-lg">Daftar Operator Sistem</h1>
            <table class="w-full table-auto border-collapse border border-slate-500 text-center">
              <thead>
                <tr class="text-white">
                  <th class="border border-slate-600 bg-slate-500">No</th>
                  <th class="border border-slate-600 bg-slate-500 w-64">NIP</th>
                  <th class="border border-slate-600 bg-slate-500 w-96">
                    Nama
                  </th>
                </tr>
              </thead>
              <tbody>
                {admin.map((adm, idx) => {
                  return (
                    <tr class="bg-white border-b">
                      <td class="border border-slate-600">{idx + 1}</td>
                      <td class="border border-slate-600">{adm.nama}</td>
                      <td class="border border-slate-600">{adm.nip}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pl-8 inset-y-0 right-0 flex">
            <div className="relative grid grid-rows-1 gap-4 w-81">
              <div className="bg-white rounded-lg p-8 text-center">
                <h1 className="font-bold">Informasi Akun</h1>
                <div className="dash-foto px-12 py-4">
                  <div className="shadow-md bg-red-600 bg-slate-100 border border-slate-100">
                    <div className="p-3 inline-flex justify-center w-52 h-60">
                      <img
                        className="max-w-full h-auto"
                        src="https://iili.io/bJfHv9.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div>{user && user.nama}</div>
                <div>{user && user.nip}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileAdm;
