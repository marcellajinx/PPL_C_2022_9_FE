import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormAddSkripsi = () => {
  const { isError, user } = useSelector((state) => state.auth);
  const [status_mhs, setStatus_mhs] = useState("");
  const [status_skripsi, setStatus_skripsi] = useState("");
  const [smt_skripsi, setSmt_skripsi] = useState("");
  const [nilai_skripsi, setNilai_skripsi] = useState("");
  const [lama_studi, setLama_studi] = useState("");
  const [tgl_sidang, setTgl_sidang] = useState("");
  const navigate = useNavigate();

  const [skripsi, setSkripsi] = useState([]);

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
    const file_skripsi = e.target.files[0];
    setFile(file_skripsi);
  };
  const createSkripsi = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nim", user && user.nim);
    formData.append("status_mhs", status_mhs);
    formData.append("status_skripsi", status_skripsi);
    formData.append("smt_skripsi", smt_skripsi);
    formData.append("nilai_skripsi", nilai_skripsi);
    formData.append("lama_studi", lama_studi);
    formData.append("tgl_sidang", tgl_sidang);
    formData.append("file_skripsi", file_skripsi);
    formData.append("status_verifikasi", "0");
    try {
      await axios.post("http://localhost:5000/skripsi", formData);
      location.reload();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        window.alert(error.response.data.msg);
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
      setSkripsi(json[0]);
      setStatus_mhs(json[0].status_mhs);
      setStatus_skripsi(json[0].status_skripsi);
      setNilai_skripsi(json[0].nilai_skripsi);
      setLama_studi(json[0].lama_studi);
      setTgl_sidang(json[0].tgl_sidang);
      setSmt_skripsi(json[0].smt_skripsi);
    } catch (error) {
      console.log(error);
      setSkripsi([]);
      setStatus_mhs("");
      setStatus_skripsi("");
      setNilai_skripsi("");
      setLama_studi("");
      setTgl_sidang("");
      setSmt_skripsi("");
    }
  };

  let sem = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <div className="min-h-[65vh] mb-16 p-12 pb-16 relative bg-white flex-initial w-10/12">
      <h3 className="text-3xl font-bold">Skripsi</h3>
      <div className="flex mt-6">
        <div className="dash-foto">
          <div className="shadow-md w-48 h-64 mr-8 bg-slate-100 border border-slate-100 grid place-items-center">
            <img src={user && user.url} alt="Foto profil" className="w-11/12" />
          </div>
        </div>

        <div className="flex-initial w-4/5">
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
              <div className="form-group flex my-4 w-full">
                <div className="w-full flex flex-col mr-4">
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
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="nilai_skripsi"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Semester Skripsi
                  </label>
                  <select
                    required
                    value={smt_skripsi}
                    onChange={(e) => setSmt_skripsi(e.target.value)}
                    onBlur={(e) => setSmt_skripsi(e.target.value)}
                    name="smt_skripsi"
                    id="smt_skripsi"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  >
                    <option>Pilih Semester</option>
                    {sem.map((opt) => (
                      <option
                        value={opt}
                        selected={opt == smt_skripsi ? true : false}
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
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
                {skripsi.length === 0 ? (
                  <input
                    required
                    onChange={loadFile}
                    type="file"
                    name="file_skripsi"
                    id="file_skripsi"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  />
                ) : (
                  <div className="text-center rounded bg-yellow-500 text-white w-36 py-2 align-left">
                    <button type="button" onClick={() => printJS(skripsi.url)}>
                      Lihat Dokumen
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end">
                {skripsi.length === 0 ? (
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

export default FormAddSkripsi;
