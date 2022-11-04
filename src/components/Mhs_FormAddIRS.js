import ListIRS from "./Mhs_ListIRS";

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FormAddIRS = () => {
  const { user } = useSelector((state) => state.auth);
  const [smt_irs, setSmt_irs] = useState("");
  const [jml_sks, setJml_sks] = useState("");
  const [file_irs, setFile_irs] = useState("");

  const [msg, setMsg] = useState("");

  let nim;
  if (user && user.nim) {
    nim = user.nim;
  }

  const createIRS = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/irs", {
        nim: nim,
        smt_irs: smt_irs,
        status_irs: "0",
        jml_sks: jml_sks,
        file_irs: file_irs,
      });
      location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="min-h-[70vh] mb-16 p-12 pb-16 relative bg-white flex-initial w-10/12">
      <h3>Isian Rencana Studi (IRS)</h3>
      <form className="mt-4" onSubmit={createIRS}>
        <div className="grid grid-cols-5 gap-4">
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
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            >
              <option value="1">AKTIF</option>
              <option value="0">NON-AKTIF</option>
            </select>
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              htmlFor="smt_irs"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Semester Aktif
            </label>
            <select
              value={smt_irs}
              required
              onChange={(e) => setSmt_irs(e.target.value)}
              onBlur={(e) => setSmt_irs(e.target.value)}
              name="smt_irs"
              id="smt_irs"
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
              value={file_irs}
              onChange={(e) => setFile_irs(e.target.value)}
              type="file"
              name="file_irs"
              id="file_irs"
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="grid place-items-center">
            <button className="mt-5 bg-green-300 text-white font-semibold py-2 px-6">
              Simpan
            </button>
          </div>
        </div>
      </form>

      <ListIRS />
    </div>
  );
};

export default FormAddIRS;
