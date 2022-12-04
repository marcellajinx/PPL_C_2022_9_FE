import React, { useEffect, useState } from "react";

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
import axios from "axios";

const VerifikasiPKL = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");

  const [pkl, setPKL] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(15);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  // for modal
  const [show, setShow] = useState();
  const [statusMhsShow, setStatusMhsShow] = useState("");
  const [statusPKLShow, setStatusPKLShow] = useState("");
  const [nilaiPKLShow, setNilaiPKLShow] = useState("");
  const [nimShow, setNIMShow] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = function (el) {
    setShow(true);
    setStatusMhsShow(el.status_mhs);
    setStatusPKLShow(el.status_pkl);
    setNilaiPKLShow(el.nilai_pkl);
    setNIMShow(el.nim);
  };
  const handleSubmit = function (nim) {
    updatePKL(nim);
    setShow(false);
  };

  // for updating file
  const [file, setFile] = useState("");
  const loadFile = (e) => {
    const file_pkl = e.target.files[0];
    setFile(file_pkl);
  };

  const updatePKL = async (nim) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("status_mhs", statusMhsShow);
    formData.append("status_pkl", statusPKLShow);
    formData.append("nilai_pkl", nilaiPKLShow);
    try {
      await axios.patch(`http://localhost:5000/pkl/${nim}`, formData);
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

  const [btnVerif, setBtnVerif] = useState(false);
  const [btnEdit, setBtnEdit] = useState(false);
  useEffect(() => {
    filterVerifPKL();
  }, [user, status, keyword, btnVerif, btnEdit]);

  async function filterVerifPKL() {
    try {
      let url = `http://localhost:5000/pkld/${user && user.nip}/`;
      keyword == "" ? (url += " /") : (url += `${keyword}/`);
      status == "" ? (url += " /") : (url += `${status}/`);
      const response = await fetch(url);
      let json = await response.json();
      setPKL(json);
    } catch (error) {
      setPKL([]);
    }
  }

  // Get current posts
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = pkl.slice(indexOfFirstData, indexOfLastData);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const clickBtnVerif = async (e, el) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/checkv/pkl`, {
        nim: el.nim,
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
              Praktek Kerja Lapangan
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="w-full form-group flex flex-col my-4">
                <label
                  htmlFor="status"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Status Mahasiswa
                </label>
                <select
                  required
                  value={statusMhsShow}
                  onChange={(e) => setStatusMhsShow(e.target.value)}
                  onBlur={(e) => setStatusMhsShow(e.target.value)}
                  name="status"
                  id="status"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>Pilih Status Mahasiswa</option>
                  <option
                    value="1"
                    selected={"1" === statusMhsShow ? true : false}
                  >
                    AKTIF
                  </option>
                  <option
                    value="0"
                    selected={"0" === statusMhsShow ? true : false}
                  >
                    NON-AKTIF
                  </option>
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="status_pkl"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Status PKL
                </label>
                <select
                  required
                  value={statusPKLShow}
                  onChange={(e) => setStatusPKLShow(e.target.value)}
                  onBlur={(e) => setStatusPKLShow(e.target.value)}
                  name="status_pkl"
                  id="status_pkl"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>Pilih Status PKL</option>
                  <option
                    value="1"
                    selected={"1" == statusPKLShow ? true : false}
                  >
                    Lulus
                  </option>
                  <option
                    value="0"
                    selected={"0" == statusPKLShow ? true : false}
                  >
                    Tidak Lulus
                  </option>
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="nilai_pkl"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Nilai PKL
                </label>
                <select
                  required
                  value={nilaiPKLShow}
                  onChange={(e) => setNilaiPKLShow(e.target.value)}
                  onBlur={(e) => setNilaiPKLShow(e.target.value)}
                  name="nilai_pkl"
                  id="nilai_pkl"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>Pilih Nilai PKL</option>
                  <option
                    value="A"
                    selected={"A" == nilaiPKLShow ? true : false}
                  >
                    A
                  </option>
                  <option
                    value="B"
                    selected={"B" == nilaiPKLShow ? true : false}
                  >
                    B
                  </option>
                  <option
                    value="C"
                    selected={"C" == nilaiPKLShow ? true : false}
                  >
                    C
                  </option>
                  <option
                    value="D"
                    selected={"D" == nilaiPKLShow ? true : false}
                  >
                    D
                  </option>
                  <option
                    value="E"
                    selected={"E" == nilaiPKLShow ? true : false}
                  >
                    E
                  </option>
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="file_pkl"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Berita Acara Seminar PKL
                </label>
                <input
                  required
                  onChange={loadFile}
                  type="file"
                  name="file_pkl"
                  id="file_pkl"
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
              Praktek Kerja Lapangan (PKL)
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
                        filterVerifPKL();
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
                        Nilai PKL
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
                    {!pkl.length ? (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <br />
                          <h4 className="font-bold">No PKL Found</h4>
                        </td>
                        <td></td>
                        <td></td>
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
                              {el.status_mhs === "1" ? "AKTIF" : "TIDAK AKTIF"}
                            </td>
                            <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap border-r">
                              {el.nilai_pkl}
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
                                      el.status_verifikasi === "1"
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
                              {el.status_verifikasi === "1"
                                ? "VERIFIED"
                                : "NOT VERIFIED"}
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
            totalData={pkl.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default VerifikasiPKL;
