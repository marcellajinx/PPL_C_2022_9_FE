import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FormAddPKL = () => {
  const { user } = useSelector((state) => state.auth);
  const [status_mhs, setStatus_mhs] = useState("");
  const [status_pkl, setStatus_pkl] = useState("");
  const [nilai_pkl, setNilai_pkl] = useState("");
  const [file_pkl, setFile_pkl] = useState("");

  const [pkl, setPKL] = useState({});

  const [msg, setMsg] = useState("");

  let nim;
  if (user && user.nim) {
    nim = user.nim;
  }

  const createPKL = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/pkl", {
        nim: nim,
        status_mhs: status_mhs,
        status_pkl: status_pkl,
        nilai_pkl: nilai_pkl,
        file_pkl: file_pkl,
        status_verifikasi: "0",
      });
      location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getPKLByNIM();
  }, [user]);

  const getPKLByNIM = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/pkl/${user && user.nim}`
      );
      let json = await response.json();
      setStatus_mhs(json[0].status_mhs);
      setStatus_pkl(json[0].status_pkl);
      setNilai_pkl(json[0].nilai_pkl);
    } catch (error) {
      setStatus_mhs("");
      setStatus_pkl("");
      setNilai_pkl("");
    }
  };

  return (
    <div className="min-h-[70vh] mb-16 p-12 pb-16 relative bg-white flex-initial w-10/12">
      <h3 className="text-3xl font-bold">Praktek Kerja Lapangan</h3>
      <div className="mb-12 flex mt-6">
        <div className="dash-foto">
          <div className="shadow-md w-52 h-60 mr-8 bg-slate-100 border border-slate-100"></div>
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
                  <option value="1" selected={status_mhs === pkl.status_mhs}>
                    AKTIF
                  </option>
                  <option value="0" selected={status_mhs === pkl.status_mhs}>
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
              <div className="form-group flex flex-col my-4">
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
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="file_pkl"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Berita Acara Seminar PKL
                </label>
                <input
                  required
                  onChange={(e) => setFile_pkl(e.target.value)}
                  type="file"
                  name="file_pkl"
                  id="file_pkl"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="mt-5 bg-green-300 text-white font-semibold py-2 px-6"
                  disabled={
                    status_mhs !== "" && status_pkl !== "" && nilai_pkl !== ""
                  }
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddPKL;
