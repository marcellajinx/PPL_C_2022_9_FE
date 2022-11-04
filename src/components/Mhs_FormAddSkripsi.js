import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FormAddSkripsi = () => {
  const { user } = useSelector((state) => state.auth);
  const [status_mhs, setStatus_mhs] = useState("");
  const [status_skripsi, setStatus_skripsi] = useState("");
  const [nilai_skripsi, setNilai_skripsi] = useState("");
  const [lama_studi, setLama_studi] = useState("");
  const [tgl_sidang, setTgl_sidang] = useState("");
  const [file_skripsi, setFile_skripsi] = useState("");

  const [msg, setMsg] = useState("");

  let nim;
  if (user && user.nim) {
    nim = user.nim;
  }

  const createSkripsi = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/skripsi", {
        nim: nim,
        status_mhs: status_mhs,
        status_skripsi: status_skripsi,
        nilai_skripsi: nilai_skripsi,
        lama_studi: lama_studi,
        tgl_sidang: tgl_sidang,
        file_skripsi: file_skripsi,
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
    getSkripsiByNIM();
  }, [user]);

  const getSkripsiByNIM = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/skripsi/${user && user.nim}`
      );
      let json = await response.json();
      setStatus_mhs(json[0].status_mhs);
      setStatus_skripsi(json[0].status_skripsi);
      setNilai_skripsi(json[0].nilai_skripsi);
      setLama_studi(json[0].lama_studi);
      setTgl_sidang(json[0].tgl_sidang);
    } catch (error) {
      setStatus_mhs("");
      setStatus_skripsi("");
      setNilai_skripsi("");
      setLama_studi("");
      setTgl_sidang("");
    }
  };

  return (
    <div className="min-h-[65vh] mb-16 p-12 pb-16 relative bg-white flex-initial w-10/12">
      <h3 className="text-3xl font-bold">Skripsi</h3>
      <div className="flex mt-6">
       <div className="dash-foto">
          <div className="shadow-md w-48 h-64 mr-8 bg-slate-100 border border-slate-100 grid place-items-center">
            <img src = {user && user.url} alt="Foto profil" className="w-11/12"/>
          </div>
        </div>


        <div className="flex-initial w-2/3">
          <form onSubmit={createSkripsi} className="flex justify-between">
            <div className="w-1/2 mr-12">
              <div className="form-group flex flex-col my-4">
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
                  <option>--Pilih Status Mahasiswa--</option>
                  <option value="1">AKTIF</option>
                  <option value="0">NON-AKTIF</option>
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="status_skripsi"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Status Skripsi
                </label>
                <select
                  value={status_skripsi}
                  required
                  onChange={(e) => setStatus_skripsi(e.target.value)}
                  onBlur={(e) => setStatus_skripsi(e.target.value)}
                  name="status_skripsi"
                  id="status_skripsi"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>--Pilih Status Skripsi--</option>
                  <option value="1">Lulus</option>
                  <option value="0">Tidak Lulus</option>
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="nilai_skripsi"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Nilai Skripsi
                </label>
                <select
                  value={nilai_skripsi}
                  required
                  onChange={(e) => setNilai_skripsi(e.target.value)}
                  onBlur={(e) => setNilai_skripsi(e.target.value)}
                  name="nilai_skripsi"
                  id="nilai_skripsi"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option>--Pilih Nilai Skripsi--</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>
            <div className="w-1/2">
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="lama_studi"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Lama Studi (Semester)
                </label>
                <input
                  required
                  value={lama_studi}
                  onChange={(e) => setLama_studi(e.target.value)}
                  type="number"
                  name="lama_studi"
                  id="lama_studi"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="tgl_sidang"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Tanggal Sidang Skripsi
                </label>
                <input
                  required
                  value={tgl_sidang}
                  onChange={(e) => setTgl_sidang(e.target.value)}
                  type="date"
                  name="tgl_sidang"
                  id="tgl_sidang"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="file_skripsi"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Berita Acara Sidang Skripsi
                </label>
                <input
                  required
                  value={file_skripsi}
                  onChange={(e) => setFile_skripsi(e.target.value)}
                  type="file"
                  name="file_skripsi"
                  id="file_skripsi"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="mt-5 bg-green-300 text-white font-semibold py-2 px-6"
                  disabled={
                    status_mhs === "" &&
                    status_skripsi === "" &&
                    tgl_sidang === "" &&
                    nilai_skripsi === "" &&
                    lama_studi === ""
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

export default FormAddSkripsi;
