import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LineChartPerwalian from "../../components/Chart_LinePerwalian";
import { getMe } from "../../features/authSlice";

import chart2 from "../../../public/images/chart.png";
import Layout from "../Layout";
const DetailMhsDsn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kontak, setKontak] = useState("");
  const [nip, setNIP] = useState("");
  const [angkatan, setAngkatan] = useState("2016");
  const [dataPerwalian, setDataPerwalian] = useState([]);

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
    getDsnByNIP();
  }, []);

  const getDsnByNIP = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doswal/${id}`);
      setNama(response.data.nama);
      setEmail(response.data.email);
      setKontak(response.data.no_hp);
      setNIP(response.data.nip);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getDataPerwalian();
  }, [dataPerwalian]);

  const getDataPerwalian = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chart/dashdosen/${
          user && user.kode_wali
        }/${angkatan}`
      );
      let json = await response.json();
      setDataPerwalian(json);
    } catch (error) {
      setDataPerwalian([]);
    }
  };

  let id;
  if (user && user.kode_wali) {
    id = user.kode_wali;
  }

  const updateDataDsn = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/dosen/${nip}`, {
        nama: nama,
        email: email,
        kontak: kontak,
        nip: nip,
      });
      location.reload();
      // navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const li_angkatan = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

  return (
    <Layout>
      <div className="mb-16 p-16 pb-16 relative bg-white flex-initial w-10/12">
        <div className="mb-10 p-5 pb-1 relative bg-white flex-initial">
          <div class="flow-root">
            <h3 className="text-lg font-normal float-left flex my-1">
              Progress Perkembangan Mahasiswa Informatika
            </h3>
          </div>
          <h3 className="text-lg font-normal">Fakultas Sains dan Matematika</h3>
        </div>
        <div className="bg-white-400 px-4 py-2 m-2">
          <div className="flex">
            <div className="dash-foto">
              <div className="shadow-md w-52 h-60 mr-8 bg-slate-100 border border-slate-100"></div>
            </div>

            <div className="dash-profile">
              <div className="form-group flex flex-col">
                <label
                  for="nama"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Nama Mahasiswa
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  for="nama"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  NIM
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  for="angkatan"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Angkatan
                </label>
                <select
                  name="angkatan"
                  id="angkatan"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  for="nama"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Dosen Wali
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="form-group flex justify-center ">
            <label
              for="jlh_sks"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Semester
            </label>
          </div>
          <div class="flex justify-items-center grid grid-cols-5 gap-3">
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-blue-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                01
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-blue-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                02
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-blue-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                03
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-blue-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                04
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-blue-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                05
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-yellow-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                06
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-blue-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                07
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-green-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                08
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-red-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                09
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-red-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                10
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-red-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                11
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-red-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                12
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-red-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                13
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-red-500 text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                14
              </button>
            </div>
            <div class="w-4/5">
              <button
                class="w-full mt-10 bg-black text-white font-semibold py-2 px-11 rounded-md"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                15
              </button>
            </div>
          </div>
          <div
            class="modal fade fixed top-0 left-0 w-1/3 outline-none overflow-x overflow-y-auto"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
          >
            <div class="modal-dialog relative w-auto pointer-events-none">
              <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div class="modal-body relative p-4">
                  <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul
                      class="flex flex-wrap -mb-px text-sm font-medium text-center"
                      id="myTab"
                      data-tabs-toggle="#myTabContent"
                      role="tablist"
                    >
                      <li class="mr-2" role="presentation">
                        <button
                          class="inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
                          id="profile-tab"
                          data-tabs-target="#profile"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="true"
                        >
                          IRS
                        </button>
                      </li>
                      <li class="mr-2" role="presentation">
                        <button
                          class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
                          id="dashboard-tab"
                          data-tabs-target="#dashboard"
                          type="button"
                          role="tab"
                          aria-controls="dashboard"
                          aria-selected="false"
                        >
                          KHS
                        </button>
                      </li>
                      <li class="mr-2" role="presentation">
                        <button
                          class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
                          id="settings-tab"
                          data-tabs-target="#settings"
                          type="button"
                          role="tab"
                          aria-controls="settings"
                          aria-selected="false"
                        >
                          PKL
                        </button>
                      </li>
                      <li role="presentation">
                        <button
                          class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
                          id="contacts-tab"
                          data-tabs-target="#contacts"
                          type="button"
                          role="tab"
                          aria-controls="contacts"
                          aria-selected="false"
                        >
                          SKRIPSI
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div id="myTabContent">
                    <div
                      class="p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {" "}
                        <strong class="font-medium text-gray-800 dark:text-white"></strong>
                      </p>
                      <p class="text-center ...">25 SKS </p>
                      <p class="text-center ...">
                        <button class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-1 px-3 border border-gray-400 rounded shadow">
                          Detail
                        </button>
                      </p>
                    </div>
                    <div
                      class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                      id="dashboard"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab"
                    >
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        {" "}
                        <strong class="font-medium text-gray-800 dark:text-white"></strong>{" "}
                      </p>
                      <div className="dash-profile flex justify-center">
                        <table className="">
                          <tbody>
                            <tr>
                              <td>SKS Semester</td>
                              <td> : 25</td>
                            </tr>
                            <tr>
                              <td>IP Semester</td>
                              <td> : 3.99</td>
                            </tr>
                            <tr>
                              <td>SKS Kumulatif</td>
                              <td> : 102</td>
                            </tr>
                            <tr>
                              <td>IP Kumulatif</td>
                              <td> : 3.89</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                      id="settings"
                      role="tabpanel"
                      aria-labelledby="settings-tab"
                    >
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        <strong class="font-medium text-gray-800 dark:text-white"></strong>
                      </p>
                      <table className="mx-auto flex-inline w-1/3 table-auto px-10 py-1 border border-black">
                        <thead></thead>
                        <tbody className="text-center">
                          <br />
                          <div className="flex justify-center">
                            <div className="border-r-2 border-black px-10">
                              <p>Nilai</p>
                              <p>A</p>
                            </div>
                            <div className="px-10">
                              <p>Status</p>
                              <p>LULUS</p>
                            </div>
                          </div>
                          <br />
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="hidden p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                      id="contacts"
                      role="tabpanel"
                      aria-labelledby="contacts-tab"
                    >
                      <p class="text-sm text-gray-500 dark:text-gray-400">
                        <strong class="font-medium text-gray-800 dark:text-white"></strong>
                      </p>
                      <div className="dash-profile flex justify-center">
                        <table className="">
                          <tbody>
                            <tr>
                              <td>Status</td>
                              <td> : Sedang Mengambil</td>
                            </tr>
                            <tr>
                              <td>Nilai</td>
                              <td> : N/A</td>
                            </tr>
                            <tr>
                              <td>Tanggal Sidang</td>
                              <td> : 05 Mei 2030</td>
                            </tr>
                            <tr>
                              <td>Lama Studi</td>
                              <td> : 9 Semester</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailMhsDsn;
