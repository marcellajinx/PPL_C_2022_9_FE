import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormAddPKL = () => {
  const { isError, user } = useSelector((state) => state.auth);
  const [status_mhs, setStatus_mhs] = useState("");
  const [status_pkl, setStatus_pkl] = useState("");
  const [nilai_pkl, setNilai_pkl] = useState("");
  const [smt_pkl, setSmt_pkl] = useState("");
  const navigate = useNavigate();

  const [pkl, setPKL] = useState([]);

  const [msg, setMsg] = useState("");

  let nim;
  if (user && user.nim) {
    nim = user.nim;
  }

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (user.no_hp === "" || user.no_hp === "NOT SET") {
        navigate("/data");
      }
    }
  }, [isError, user, navigate]);

  // for uploading file
  const [file, setFile] = useState("");
  const loadFile = (e) => {
    const file_pkl = e.target.files[0];
    setFile(file_pkl);
  };
  const createPKL = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nim", user && user.nim);
    formData.append("status_mhs", status_mhs);
    formData.append("status_pkl", status_pkl);
    formData.append("smt_pkl", smt_pkl);
    formData.append("nilai_pkl", nilai_pkl);
    formData.append("file_pkl", file_pkl);
    formData.append("status_verifikasi", "0");
    try {
      await axios.post("http://localhost:5000/pkl", formData);
      location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        window.alert(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getPKLByNIM();
  }, [nim]);

  const getPKLByNIM = async () => {
    try {
      const response = await fetch(`http://localhost:5000/pkl/${nim}`);
      let json = await response.json();
      setPKL(json[0]);
      setStatus_mhs(json[0].status_mhs);
      setStatus_pkl(json[0].status_pkl);
      setNilai_pkl(json[0].nilai_pkl);
      setSmt_pkl(json[0].smt_pkl);
    } catch (error) {
      console.log(error);
      setPKL([]);
      setStatus_mhs("");
      setStatus_pkl("");
      setNilai_pkl("");
      setSmt_pkl("");
    }
  };

  let sem = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className="min-h-[70vh] mb-16 p-12 pb-16 relative bg-white flex-initial w-10/12">
      <h3 className="text-3xl font-bold">Praktek Kerja Lapangan (PKL)</h3>
      <div className="mb-12 flex mt-6">
        <div className="dash-foto">
          <div className="shadow-md w-48 h-64 mr-8 bg-slate-100 border border-slate-100 grid place-items-center">
            <img src={user && user.url} alt="Foto profil" className="w-11/12" />
          </div>
        </div>

        <div className="flex-initial w-2/3 ">
          <form onSubmit={createPKL} className="flex justify-between">
            <div className="w-1/2 mr-12">
              <div className="w-full form-group flex flex-col my-4">
                <label
                  htmlFor="status"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Status Mahasiswa
                </label>
                <select
                  required
                  value={status_mhs}
                  onChange={(e) => setStatus_mhs(e.target.value)}
                  onBlur={(e) => setStatus_mhs(e.target.value)}
                  name="status"
                  id="status"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>Pilih Status Mahasiswa</option>
                  <option value="1" selected={"1" === status_mhs}>
                    AKTIF
                  </option>
                  <option value="0" selected={"0" === status_mhs}>
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
                  value={status_pkl}
                  onChange={(e) => setStatus_pkl(e.target.value)}
                  onBlur={(e) => setStatus_pkl(e.target.value)}
                  name="status_pkl"
                  id="status_pkl"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>Pilih Status PKL</option>
                  <option value="1">Lulus</option>
                  <option value="0">Tidak Lulus</option>
                </select>
              </div>
            </div>
            <div className="w-1/2">
              <div className="form-group flex my-4 w-full">
                <div className="w-full flex flex-col mr-4">
                  <label
                    htmlFor="nilai_pkl"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Nilai PKL
                  </label>
                  <select
                    required
                    value={nilai_pkl}
                    onChange={(e) => setNilai_pkl(e.target.value)}
                    onBlur={(e) => setNilai_pkl(e.target.value)}
                    name="nilai_pkl"
                    id="nilai_pkl"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  >
                    <option>Pilih Nilai PKL</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
                </div>
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="nilai_pkl"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Semester PKL
                  </label>
                  <select
                    required
                    value={smt_pkl}
                    onChange={(e) => setSmt_pkl(e.target.value)}
                    onBlur={(e) => setSmt_pkl(e.target.value)}
                    name="smt_pkl"
                    id="smt_pkl"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  >
                    <option>Pilih Semester</option>
                    {sem.map((opt) => (
                      <option
                        value={opt}
                        selected={opt == smt_pkl ? true : false}
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="file_pkl"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Berita Acara Seminar PKL
                </label>
                {pkl.length === 0 ? (
                  <input
                    required
                    onChange={loadFile}
                    type="file"
                    name="file_pkl"
                    id="file_pkl"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  />
                ) : (
                  <div className="text-center rounded bg-yellow-500 text-white w-36 py-2 align-left">
                    <button type="button" onClick={() => printJS(pkl.url)}>
                      Lihat Dokumen
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end">
                {pkl.length === 0 ? (
                  <button className="mt-5 rounded bg-green-600 text-white py-2 px-6">
                    Simpan
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddPKL;
