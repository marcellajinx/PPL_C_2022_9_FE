import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import PieChartStatus from "../../components/Chart_PieStatus";
import ResultStatus from "../../components/Dsn_ResultStatus";

import Layout from "../Layout";
const DataMhsDsn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const [status, setStatus] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [keyword, setKeyword] = useState("");
  const [mahasiswa, setMahasiswa] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (user && user.nip.slice(0, 2) !== "99") {
        navigate("/dashboard");
      }
    }
  }, [isError, user, navigate]);

  useEffect(() => {
    requestStudents();
  }, [angkatan, status, keyword]);

  async function requestStudents() {
    try {
      let response;
      if (keyword == "" && status == "" && angkatan == "") {
        response = await fetch(`http://localhost:5000/mahasiswa`);
      } else {
        let url = "http://localhost:5000/mahasiswas/";
        keyword == "" ? (url += " /") : (url += `${keyword}/`);
        status == "" ? (url += " /") : (url += `${status}/`);
        angkatan == "" ? (url += " /") : (url += `${angkatan}`);
        response = await fetch(url);
      }
      let json = await response.json();
      setMahasiswa(json);
    } catch (error) {
      setMahasiswa([]);
    }
  }

  const li_angkatan = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

  return (
    <Layout>
      <div className="mb-16 p-16 pb-16 relative bg-white flex-initial w-10/12">
        <div className="mb-10 p-5 pb-1 relative bg-white flex-initial">
          <div class="flow-root">
            <h3 className="text-lg font-normal float-left flex my-1">
              Rekap Data Status Mahasiswa Informatika
            </h3>
            <div className="float-right">
              <button
                type="button"
                class="inline-block px-6 pt-2.5 pb-2 bg-yellow-500 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="download"
                  class="w-3 mr-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                cetak
              </button>
            </div>
          </div>
          <h3 className="text-lg font-normal">
            Fakultas Sains dan Matematika UNDIP
          </h3>
        </div>

        <div className="mx-96 mb-6 p-5 pb-5 bg-white-400">
          <div class="flex flex-wrap justify-center">
            {/* <img class="w-120 h-110" alt="..." src={chart2} /> */}
            <PieChartStatus />
          </div>
        </div>

        {/* <div className="p-5 mb-10">
          <div className="float-root ">
            <button
              type="button"
              class="inline-block px-6 pt-2.5 pb-2 bg-green-500 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
            >
              Rekap Data
            </button>
          </div>
        </div> */}

        <div class="flow-root p-5">
          <h3 className="text-lg font-normal float-left">
            Daftar Status Mahasiswa Informatika
          </h3>
          <div class="float-right flex space-x-2">
            <div className="form-label inline-block mb-2 text-gray-600">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label htmlFor="keyword">
                  <input
                    class="form-control pl-6 pr-12 py-2 rounded border border-slate-500"
                    id="keyword"
                    placeholder="Cari Nama atau NIM"
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      requestStudents();
                    }}
                  />
                </label>
              </form>
            </div>
            <div className="form-label inline-block mb-2 text-gray-600">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <select
                  name="angkatan"
                  id="angkatan"
                  className="p-2 w-36 form-control rounded border border-slate-500"
                  onChange={(e) => setAngkatan(e.target.value)}
                  onBlur={(e) => setAngkatan(e.target.value)}
                >
                  <option value="">Angkatan</option>
                  {li_angkatan.map((li) => (
                    <option value={li} key={li}>
                      {li}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div className="form-label inline-block mb-2 text-gray-600">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <select
                  name="status"
                  id="status"
                  className="p-2 w-36 form-control border border-slate-500 rounded"
                  onChange={(e) => setStatus(e.target.value)}
                  onBlur={(e) => setStatus(e.target.value)}
                >
                  <option value="">Status</option>
                  <option value="1">AKTIF</option>
                  <option value="0">TIDAK AKTIF</option>
                </select>
              </form>
            </div>
          </div>
          <h3 className="text-lg font-normal flex my-8 mb-5">
            Fakultas Sains dan Matematika UNDIP
          </h3>
        </div>
        <div class="flex flex-col px-5">
          <div class="overflow-x-auto sm:-mx-4 lg:-mx-8">
            <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                {/* <table class="min-w-full text-center">
                  <thead class="border-b bg-gray-300">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-grey px-6 py-4 border-r border-l"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-grey px-6 py-4 border-r"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-grey px-6 py-4 border-r"
                      >
                        NIM
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-grey px-6 py-4 border-r"
                      >
                        Angkatan
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-grey px-6 py-4 border-r"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                        1
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        London Fog Heather Est
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        24060120120000
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        2020
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        Aktif
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                        2
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        London Fog Heather Est
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        24060120120000
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        2020
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        Aktif
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                        3
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        London Fog Heather Est
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        24060120120000
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        2020
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        Aktif
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                        4
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        London Fog Heather Est
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        24060120120000
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        2020
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        Aktif
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                        5
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        London Fog Heather Est
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        24060120120000
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        2020
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        Aktif
                      </td>
                    </tr>
                    <tr class="bg-white border-b">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                        6
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        London Fog Heather Est
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        24060120120000
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        2020
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                        Aktif
                      </td>
                    </tr>
                  </tbody>
                </table> */}
                <ResultStatus mahasiswa={mahasiswa} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataMhsDsn;
