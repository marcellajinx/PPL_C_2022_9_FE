import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

import pencil from "../../../public/images/pencil.png";
import view from "../../../public/images/view.png";
import checklist from "../../../public/images/checklist.png";
import Layout from "../Layout";
import axios from "axios";

const VerifikasiKHS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");

  const [khs, setKHS] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

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
    filterVerifKHS();
  }, [user, status, keyword]);

  async function filterVerifKHS() {
    try {
      let url = `http://localhost:5000/khsd/${user && user.nip}/`;
      keyword == "" ? (url += " /") : (url += `${keyword}/`);
      status == "" ? (url += " /") : (url += `${status}/`);
      const response = await fetch(url);
      let json = await response.json();
      setKHS(json);
    } catch (error) {
      setKHS([]);
    }
  }

  const clickBtnVerif = async (e, el) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/checkv/khs`, {
        nim: el.nim,
        smt_khs: el.smt_khs,
      });
      el.status_verifikasi = "1"; // trigger change
      // location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Layout>
      <div className="mb-16 p-16 pb-16 relative bg-white flex-initial w-10/12">
        <div className="mb-4 pb-1 relative bg-white flex-initial">
          <div className="flow-root">
            <h3 className="text-lg font-normal float-left flex my-1">
              Verifikasi Data Mahasiswa Informatika <br />
              Kartu Hasil Studi (KHS)
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
                        filterVerifKHS();
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
                    name="status"
                    id="status"
                    className="p-2 w-44 form-control border border-slate-500 rounded"
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Status</option>
                    <option value="1">VERIFIED</option>
                    <option value="0">NOT VERIFIED</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-5">
          <div className="overflow-x-auto sm:-mx-4 lg:-mx-8">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="mx-2 table-auto min-w-full text-center">
                  <thead className="border-b bg-gray-300">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r border-l"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        NIM
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        Angkatan
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        Status Mhs
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        SMT
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        SKS Kuantitatif
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        Aksi
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-grey py-4 border-r"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!khs.length ? (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <br />
                          <h4 className="font-bold">No KHS Found</h4>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    ) : (
                      khs.map((el, idx) => {
                        return (
                          <tr className="bg-white border-b">
                            <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                              {idx + 1}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.nim}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.tb_mh.nama}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.tb_mh.angkatan}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.tb_mh.status_mhs === "1"
                                ? "AKTIF"
                                : "TIDAK AKTIF"}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.smt_khs}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.jml_sksk}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              <div className="flex justify-between">
                                <a>
                                  <img
                                    className="h-6 py-1 align-center"
                                    src={view}
                                  />
                                </a>

                                <a>
                                  <img
                                    className="h-6 align-center"
                                    src={pencil}
                                  />
                                </a>

                                <a>
                                  <div
                                    id="checklist"
                                    className={
                                      el.status_khs === "1"
                                        ? "h-6 w-6 mx-auto bg-green-300 rounded-xl grid place-items-center"
                                        : "h-6 w-6 mx-auto bg-slate-200 rounded-xl grid place-items-center"
                                    }
                                    onClick={(e) => clickBtnVerif(e, el)}
                                  >
                                    <img
                                      className="h-4 align-center"
                                      src={checklist}
                                    />
                                  </div>
                                </a>
                              </div>
                            </td>
                            <td className="text-sm text-green-900 font-light py-4 whitespace-nowrap border-r">
                              {el.status_khs === "1"
                                ? "VERIFIED"
                                : "NOT VERIFIED"}
                              {/* <select
                              name="status_verifikasi"
                              id="status_verifikasi"
                              value={el.status_verifikasi}
                              className="p-1.5 ml-6 w-24 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                              onChange={(e) =>
                                setStatusVerifikasi(e.target.value)
                              }
                              onBlur={(e) =>
                                setStatusVerifikasi(e.target.value)
                              }
                            >
                              <option
                                value="0"
                                {...(el.status_verifikasi === "0"
                                  ? "selected"
                                  : "")}
                              >
                                Verified
                              </option>
                              <option
                                value="1"
                                {...(el.status_verifikasi === "1"
                                  ? "selected"
                                  : "")}
                              >
                                Not Verified
                              </option>
                            </select> */}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifikasiKHS;
