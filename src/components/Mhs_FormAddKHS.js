import ListKHS from "./Mhs_ListKHS";

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FormAddKHS = () => {
  const { user } = useSelector((state) => state.auth);
  const [smt_khs, setSmt_khs] = useState("");
  const [jml_sks, setJml_sks] = useState("");
  const [jml_sksk, setJml_sksk] = useState("");
  const [ips, setIPS] = useState("");
  const [ipk, setIPK] = useState("");

  const [msg, setMsg] = useState("");

  let nim;
  if (user && user.nim) {
    nim = user.nim;
  }

  // for uploading file
  const [file, setFile] = useState("");
  const loadFile = (e) => {
    const file_khs = e.target.files[0];
    setFile(file_khs);
  };
  const createKHS = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nim", user && user.nim);
    formData.append("smt_khs", smt_khs);
    formData.append("status_khs", "0");
    formData.append("jml_sks", jml_sks);
    formData.append("jml_sksk", jml_sksk);
    formData.append("ips", ips);
    formData.append("ipk", ipk);
    try {
      await axios.post("http://localhost:5000/khs", formData);
      location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        window.alert(error.response.data.msg);
      }
    }
  };

  const li_angkatan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="min-h-[65vh] mb-16 p-12 pb-16 relative bg-white flex-initial w-10/12">
      <h3 className="text-3xl font-bold">Kartu Hasil Studi (KHS)</h3>
      <form className="mt-4" onSubmit={createKHS}>
        <div className="grid grid-cols-4 gap-4">
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="status"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Status Mahasiswa
            </label>
            <select
              defaultValue="1"
              required
              name="status"
              id="status"
              className="p-1.5 htmlForm-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            >
              <option value="1">AKTIF</option>
              <option value="0">NON-AKTIF</option>
            </select>
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="smt_khs"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Semester
            </label>
            <select
              required
              onChange={(e) => setSmt_khs(e.target.value)}
              onBlur={(e) => setSmt_khs(e.target.value)}
              name="smt_khs"
              id="smt_khs"
              className="p-1.5 htmlForm-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            >
              <option>--Pilih Semester--</option>
              {li_angkatan.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="jml_sks"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Jumlah SKS
            </label>
            <input
              required
              value={jml_sks}
              onChange={(e) => setJml_sks(e.target.value)}
              type="number"
              name="jml_sks"
              id="jml_sks"
              className="p-1.5 htmlForm-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="jml_sksk"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Jumlah SKS Kumulatif
            </label>
            <input
              required
              value={jml_sksk}
              onChange={(e) => setJml_sksk(e.target.value)}
              type="number"
              name="jml_sksk"
              id="jml_sksk"
              className="p-1.5 htmlForm-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="ips"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Indeks Prestasi
            </label>
            <input
              required
              value={ips}
              onChange={(e) => setIPS(e.target.value)}
              type="number"
              name="ips"
              id="ips"
              step="0.01"
              className="p-1.5 htmlForm-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="ipk"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Indeks Prestasi Kumulatif
            </label>
            <input
              required
              value={ipk}
              onChange={(e) => setIPK(e.target.value)}
              type="number"
              name="ipk"
              id="ipk"
              step="0.01"
              className="p-1.5 htmlForm-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="file_khs"
              className="form-label inline-block mb-2 text-gray-700"
            >
              File KHS
            </label>
            <input
              required
              onChange={loadFile}
              type="file"
              name="file_khs"
              id="file_khs"
              className="p-1.5 htmlForm-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="">
          <button className="rounded bg-green-600 text-white py-2 px-6">
            Simpan
          </button>
        </div>
      </form>

      <ListKHS />
    </div>
  );
};

export default FormAddKHS;
