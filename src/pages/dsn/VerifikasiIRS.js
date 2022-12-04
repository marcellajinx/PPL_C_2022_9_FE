import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

import pencil from "../../../public/images/pencil.png";
import view from "../../../public/images/view.png";
import checklist from "../../../public/images/checklist.png";
import Layout from "../Layout";
import Pagination from "../../components/Pagination";

const VerifikasiIRS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");

  const [irs, setIRS] = useState([]); // all irs may with or not with filter and/or search
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(15);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  // for modal
  const [show, setShow] = useState();
  const [semShow, setSemShow] = useState("");
  const [sksShow, setSKSShow] = useState("");
  const [nimShow, setNIMShow] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = function (el) {
    setShow(true);
    setSemShow(el.smt_irs);
    setSKSShow(el.jml_sks);
    setNIMShow(el.nim);
    // setFileShow(el.fire_irs);
  };
  const handleSubmit = function (nim) {
    updateIRS(nim);
    setShow(false);
  };

  // for updating file
  const [file, setFile] = useState("");
  // const [fileShow, setFileShow] = useState("");
  const loadFile = (e) => {
    const file_irs = e.target.files[0];
    setFile(file_irs);
  };

  const updateIRS = async (nim) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("smt_irs", semShow);
    formData.append("jml_sks", sksShow);
    try {
      await axios.patch(`http://localhost:5000/irs/${nim}`, formData);
      btnEdit === true ? setBtnEdit(false) : setBtnEdit(true); // trigger change
      // location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        window.alert(error.response.data.msg);
      }
    }
  };

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

  // useEffect(() => {
  //   getAllIRS();
  // }, [irs]);

  // async function getAllIRS() {
  //   try {
  //     let response;
  //     response = await fetch(`http://localhost:5000/irs`);
  //     let json = await response.json();
  //     if (!Array.isArray(json) && json != {}) {
  //       json = [json];
  //     }
  //     setIRS(json);
  //   } catch (error) {
  //     setIRS([]);
  //   }
  // }

  const [btnVerif, setBtnVerif] = useState(false);
  const [btnEdit, setBtnEdit] = useState(false);
  useEffect(() => {
    filterVerifIRS();
  }, [user, status, keyword, btnVerif, btnEdit]);

  async function filterVerifIRS() {
    try {
      let url = `http://localhost:5000/irsd/${user && user.nip}/`;
      keyword == "" ? (url += " /") : (url += `${keyword}/`);
      status == "" ? (url += " /") : (url += `${status}/`);
      const response = await fetch(url);
      let json = await response.json();
      setIRS(json);
    } catch (error) {
      setIRS([]);
    }
  }

  // Get current posts
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = irs.slice(indexOfFirstData, indexOfLastData);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const clickBtnVerif = async (e, el) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/checkv/irs`, {
        nim: el.nim,
        smt_irs: el.smt_irs,
      });
      btnVerif === true ? setBtnVerif(false) : setBtnVerif(true); // trigger change
      // location.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  // const li_angkatan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Layout>
      <div className="mb-16 p-16 pb-16 relative bg-white flex-initial w-10/12">
        <Modal
          show={show}
          onHide={handleClose}
          className="rounded-xl fade w-1/3 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 p-8 m-0 fixed modal show bg-slate-100"
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-bold text-2xl modal-title h4">
              Isian Rencana Studi
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              {/* <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="smt_irs"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Semester Aktif
                </label>
                <select
                  value={semShow}
                  required
                  onChange={(e) => setSemShow(e.target.value)}
                  onBlur={(e) => setSemShow(e.target.value)}
                  name="smt_irs"
                  id="smt_irs"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>--Pilih Semester--</option>
                  {li_angkatan.map((opt) => (
                    <option
                      value={opt}
                      selected={opt == semShow ? true : false}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="jml_sks"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Jumlah SKS
                </label>
                <input
                  required
                  value={sksShow}
                  onChange={(e) => setSKSShow(e.target.value)}
                  type="number"
                  name="jml_sks"
                  id="jml_sks"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="file_irs"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  File IRS
                </label>
                <input
                  required
                  // value={fileShow}
                  onChange={loadFile}
                  type="file"
                  name="file_irs"
                  id="file_irs"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleClose}
              className="mr-5 rounded-md py-2 px-5 bg-slate-800 text-white"
            >
              Close
            </Button>
            <Button
              onClick={(e) => handleSubmit(nimShow)}
              className="text-white rounded-md py-2 px-5 bg-green-500"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="mb-4 pb-1 relative bg-white flex-initial">
          <div className="flow-root">
            <h3 className="text-lg font-normal float-left flex my-1">
              Verifikasi Data Mahasiswa Informatika <br />
              Isian Rencana Studi (IRS)
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
                        filterVerifIRS();
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
                        SKS Semester
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
                    {!irs.length ? (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <br />
                          <h4 className="font-bold">No IRS Found</h4>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    ) : (
                      currentData.map((el, idx) => {
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
                              {el.smt_irs}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.jml_sks}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              <div className="flex justify-between">
                                <button
                                  type="button"
                                  onClick={() => printJS(el.url)}
                                >
                                  <img
                                    className="h-6 py-1 align-center"
                                    src={view}
                                  />
                                </button>

                                <a onClick={() => handleShow(el)}>
                                  <img
                                    className="h-6 align-center"
                                    src={pencil}
                                  />
                                </a>

                                <a>
                                  <div
                                    id="checklist"
                                    className={
                                      el.status_irs === "1"
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
                              {el.status_irs === "1"
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
          <Pagination
            dataPerPage={dataPerPage}
            totalData={irs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default VerifikasiIRS;
