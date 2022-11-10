import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Layout from "../pages/Layout";

const DetailMhsDsn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [mhs, setMhs] = useState("");
  const [msg, setMsg] = useState("");
  const [irs, setIRS] = useState([]);
  const [khs, setKHS] = useState([]);
  const [pkl, setPKL] = useState([]);
  const [skripsi, setSkripsi] = useState([]);
  const [activeBox, setActiveBox] = useState(1);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if ((user && !user.nip) || (user && user.nip.slice(0, 2) !== "99")) {
      // kalo ga dosen, cabut
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  useEffect(() => {
    const getMhsByNIM = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/mahasiswa/${id}`
        );
        setMhs(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const getIRSByNIM = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/irs/${id}`);
        setIRS(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const getKHSByNIM = async () => {
      try {
        const response = await fetch(`http://localhost:5000/khs/${id}`);
        let json = await response.json();
        if (!Array.isArray(json)) {
          json = [json];
        }
        setKHS(json);
      } catch (error) {
        setKHS([]);
      }
    };
    const getPKLByNIM = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pkl/${id}`);
        let json = await response.json();
        setPKL(json[0]);
        // setStatus_mhs(json[0].status_mhs);
      } catch (error) {
        console.log(error);
        setPKL([]);
      }
    };

    const getSkripsiByNIM = async () => {
      try {
        const response = await fetch(`http://localhost:5000/skripsi/${id}`);
        let json = await response.json();
        setSkripsi(json[0]);
        // setStatus_mhs(json[0].status_mhs);
      } catch (error) {
        console.log(error);
        setSkripsi([]);
      }
    };

    getIRSByNIM();
    getMhsByNIM();
    getPKLByNIM();
    getSkripsiByNIM();
    getKHSByNIM();
  }, [id]);

  let sem = [...Array(14).keys()];
  let data = [];
  sem.map((el) => {
    data[el + 1] = {
      irs: null,
      khs: null,
      pkl: null,
      skripsi: null,
    };
  });

  if (
    pkl.length !== 0 &&
    skripsi.length !== 0 &&
    irs.length !== 0 &&
    khs.length !== 0
  ) {
    irs.map((el) => {
      data[el.smt_irs]["irs"] = el;
    });
    khs.map((el) => {
      data[el.smt_khs]["khs"] = el;
    });
    data[pkl.smt_pkl]["pkl"] = pkl;
    data[skripsi.smt_skripsi]["skripsi"] = skripsi;
  }

  let colorBox = "px-5 py-2";
  return (
    <Layout>
      <div className="min-h-[65vh] mb-16 p-12 pb-4 relative bg-white flex-initial w-10/12">
        <div class="flow-root">
          <h3 className="text-2xl font-normal float-left">
            Progress Perkembangan Mahasiswa Informatika
          </h3>
          <div className="float-right"></div>
        </div>
        <h3 className="text-2xl font-normal">
          Fakultas Sains dan Matematika UNDIP
        </h3>

        <div className="flex mt-8">
          <div className="dash-foto">
            <div className="shadow-md w-48 h-64 mr-8 bg-slate-100 border border-slate-100 grid place-items-center">
              <img src={mhs.url} alt="Foto profil" className="w-11/12" />
            </div>
          </div>

          <div className="dash-profile pt-5">
            <table className="">
              <tbody>
                <tr className="leading-7">
                  <td>NIM</td>
                  <td>: {mhs.nim}</td>
                </tr>
                <tr className="leading-7">
                  <td>Nama Lengkap </td>
                  <td>: {mhs.nama}</td>
                </tr>
                <tr className="leading-7">
                  <td>Jalur Masuk</td>
                  <td>: {mhs.jalur_masuk}</td>
                </tr>
                <tr className="leading-7">
                  <td>No. HP</td>
                  <td>: {mhs.no_hp}</td>
                </tr>
                <tr className="leading-7">
                  <td>Email</td>
                  <td>: {mhs.email}</td>
                </tr>
                <tr className="leading-7">
                  <td>Alamat</td>
                  <td>: {mhs.alamat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="justify-items-center grid grid-cols-5 gap-x-3 gap-y-8 mt-12 pb-12">
          {data.map((key, idx) => {
            if (idx != 15) {
              if (data[idx].irs === null || data[idx].khs === null) {
                colorBox =
                  "bg-red-700 text-white w-4/5 py-3 text-center font-bold";
              } else {
                colorBox =
                  "bg-indigo-500 text-white w-4/5 py-3 text-center font-bold";
                if (data[idx].pkl !== null) {
                  colorBox =
                    "bg-yellow-300 text-white w-4/5 py-3 text-center font-bold";
                }

                if (data[idx].skripsi !== null) {
                  colorBox =
                    "bg-green-400 text-white w-4/5 py-3 text-center font-bold";
                }
              }
              return (
                <>
                  <button
                    className={colorBox}
                    data-modal-toggle="defaultModal"
                    onClick={() => setActiveBox(idx)}
                  >
                    {idx}
                  </button>

                  <div
                    id="defaultModal"
                    tabindex="-1"
                    aria-hidden="true"
                    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
                  >
                    <div class="relative w-full max-w-md h-full md:h-auto">
                      <div class="p-4 relative bg-white rounded-lg shadow">
                        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                          <ul
                            class="flex flex-wrap -mb-px text-sm font-medium text-center"
                            id="myTab"
                            data-tabs-toggle="#myTabContent"
                            role="tablist"
                          >
                            <li class="mr-2" role="presentation">
                              <button
                                class="inline-block p-4 rounded-t-lg border-b-2"
                                id="profile-tab"
                                data-tabs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                              >
                                IRS
                              </button>
                            </li>
                            <li class="mr-2" role="presentation">
                              <button
                                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
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
                                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
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
                                class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="contacts-tab"
                                data-tabs-target="#contacts"
                                type="button"
                                role="tab"
                                aria-controls="contacts"
                                aria-selected="false"
                              >
                                Skripsi
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div id="myTabContent" className="h-48">
                          <div
                            class="flex justify-center items-center min-h-full p-4 rounded-lg bg-slate-200 text-center "
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                          >
                            <div class="text-black">
                              <p class="text-3xl py-3 font-bold">
                                {data[activeBox]["irs"] !== null
                                  ? data[activeBox]["irs"].jml_sks + " "
                                  : "0 "}
                                SKS
                              </p>
                              {data[activeBox]["irs"] === null ? (
                                ""
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    data[activeBox]["irs"] !== null
                                      ? printJS(data[activeBox]["irs"].url) +
                                        " "
                                      : " "
                                  }
                                >
                                  Lihat IRS
                                </button>
                              )}
                            </div>
                          </div>
                          <div
                            class="min-h-full hidden p-4 bg-slate-200 rounded-lg"
                            id="dashboard"
                            role="tabpanel"
                            aria-labelledby="dashboard-tab"
                          >
                            <div className="flex pt-8 px-8">
                              <div className="w-1/2">
                                <p>IP Semester</p>
                                <p>IP Kuantitatif</p>
                                <p>SKS Semester</p>
                                <p>SKS Kuantitatif</p>
                              </div>
                              <div>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["khs"] != null
                                      ? data[activeBox]["khs"].ips
                                      : "-")}
                                </p>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["khs"] != null
                                      ? data[activeBox]["khs"].ipk
                                      : "-")}
                                </p>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["khs"] != null
                                      ? data[activeBox]["khs"].jml_sks
                                      : "-")}
                                </p>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["khs"] != null
                                      ? data[activeBox]["khs"].jml_sksk
                                      : "-")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="flex justify-center items-center min-h-full p-4 rounded-lg bg-slate-200 text-center "
                            id="settings"
                            role="tabpanel"
                            aria-labelledby="settings-tab"
                          >
                            <div className="flex justify-between w-4/5">
                              <div className="w-full border-r-2 border-slate-800">
                                <p>Nilai</p>
                                <p className="text-3xl py-3">
                                  {data[activeBox]["pkl"] != null
                                    ? data[activeBox]["pkl"].nilai_pkl
                                    : "-"}
                                </p>
                              </div>
                              <div className="w-full">
                                <p>Status</p>
                                <p className="text-3xl py-3">
                                  {data[activeBox]["pkl"] != null
                                    ? data[activeBox]["pkl"].status_pkl == "1"
                                      ? "LULUS"
                                      : "TIDAK LULUS"
                                    : "-"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            class="min-h-full hidden p-4 bg-slate-200 rounded-lg"
                            id="contacts"
                            role="tabpanel"
                            aria-labelledby="contacts-tab"
                          >
                            <div className="flex pt-8 px-8">
                              <div className="w-1/2">
                                <p>Status Skripsi</p>
                                <p>Nilai Skripsi</p>
                                <p>Lama Studi</p>
                                <p>Tanggal Sidang</p>
                              </div>
                              <div>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["skripsi"] != null
                                      ? data[activeBox]["skripsi"]
                                          .status_skripsi
                                      : "-")}
                                </p>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["skripsi"] != null
                                      ? data[activeBox]["skripsi"].nilai_skripsi
                                      : "-")}
                                </p>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["skripsi"] != null
                                      ? data[activeBox]["skripsi"].lama_studi
                                      : "-")}
                                </p>
                                <p>
                                  :
                                  {" " +
                                    (data[activeBox]["skripsi"] != null
                                      ? data[activeBox]["skripsi"].tgl_sidang
                                      : "-")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="flex items-center py-3 space-x-2 rounded-b">
                          <button
                            data-modal-toggle="defaultModal"
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </Layout>
  );
};

export default DetailMhsDsn;
