import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import alert from "../../public/images/alert.png";

const FormUpdateDataMhs = () => {
  const { user } = useSelector((state) => state.auth);

  const [nama, setNama] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [email, setEmail] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [kontak, setKontak] = useState("");
  const [nim, setNIM] = useState("");
  const [status, setStatus] = useState("");
  const [jalur_masuk, setJalurMasuk] = useState("");
  const [doswal, setDoswal] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kota, setKota] = useState("");
  const [kodepos, setKodePos] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kelurahan, setKelurahan] = useState("");

  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [postal, setPostal] = useState([]);

  const [doswals, setDoswals] = useState([]);

  useEffect(() => {
    getAllProvinces();
    getAllDoswal();
    getVillageName();
  }, []);

  const getAllProvinces = async () => {
    const response = await axios.get("http://localhost:5000/provinces");
    setProvinces(response.data);
  };

  useEffect(() => {
    getVillageName();
  }, [kelurahan]);

  const getVillageName = async () => {
    if (kelurahan !== "") {
      const response = await axios.get(
        `http://localhost:5000/village/${kelurahan}`
      );
      setVillage(response.data[0].name);
    }
  };

  const getAllDoswal = async () => {
    try {
      const response = await fetch("http://localhost:5000/doswal");
      let json = await response.json();
      if (!Array.isArray(json)) {
        json = [json];
      }
      setDoswals(json);
    } catch (error) {
      setDoswals([]);
    }
  };

  useEffect(() => {
    getRegenciesByProvince();
  }, [provinsi]);
  async function getRegenciesByProvince() {
    try {
      const response = await fetch(
        `http://localhost:5000/regencies/${provinsi}`
      );
      const json = await response.json();
      setRegencies(json);
    } catch (error) {
      setRegencies([]);
    }
  }

  useEffect(() => {
    getDistrictsByRegency();
  }, [regencies, kota]);
  async function getDistrictsByRegency() {
    try {
      const response = await fetch(`http://localhost:5000/districts/${kota}`);
      const json = await response.json();
      setDistricts(json);
    } catch (error) {
      setDistricts([]);
    }
  }

  useEffect(() => {
    getVillagesByDistrict();
  }, [districts, kecamatan]);
  async function getVillagesByDistrict() {
    try {
      const response = await fetch(
        `http://localhost:5000/villages/${kecamatan}`
      );
      const json = await response.json();
      setVillages(json);
    } catch (error) {
      setVillages([]);
    }
  }

  useEffect(() => {
    getPostalByVillage();
  }, [village]);
  async function getPostalByVillage() {
    try {
      const response = await fetch(`http://localhost:5000/postal/${village}`);
      const json = await response.json();
      setPostal(json);
    } catch (error) {
      setPostal([]);
    }
  }

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // const { id } = useParams();
  let id;
  if (user && user.nim) {
    id = user.nim;
  }

  useEffect(() => {
    const getMhsByNIM = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/mahasiswa/${id}`
        );

        setNama(response.data.nama);
        setAngkatan(response.data.angkatan);
        setEmail(response.data.email);
        setTempatLahir(response.data.tempat_lahir);
        setKontak(response.data.no_hp);
        setNIM(response.data.nim);
        setStatus(response.data.status_mhs);
        setJalurMasuk(response.data.jalur_masuk);
        setDoswal(response.data.kode_wali);
        setTglLahir(response.data.tgl_lahir);
        setAlamat(response.data.alamat);
        setProvinsi(response.data.provinsi);
        setKota(response.data.kota);
        setKelurahan(response.data.kelurahan);
        setKecamatan(response.data.kecamatan);
        setKodePos(response.data.kodepos);

        setFile(response.data.image);
        setPreview(response.data.url);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getMhsByNIM();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateDataMhs = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", nama);
    formData.append("angkatan", angkatan);
    formData.append("email", email);
    formData.append("tempat_lahir", tempat_lahir);
    formData.append("kontak", kontak);
    formData.append("nim", nim);
    formData.append("status", status);
    formData.append("jalur_masuk", jalur_masuk);
    formData.append("doswal", doswal);
    formData.append("tgl_lahir", tgl_lahir);
    formData.append("alamat", alamat);
    formData.append("kota", kota);
    formData.append("kecamatan", kecamatan);
    formData.append("kelurahan", kelurahan);
    formData.append("kodepos", kodepos);
    formData.append("provinsi", provinsi);

    try {
      //   let userData = {}; // creates a user json
      // formData.forEach(function(value, key){
      //     userData[key] = value;  // populates user json with form data
      // });
      await axios.patch(
        `http://localhost:5000/mahasiswa/${nim}`,
        formData
        // , {
        // headers: {
        //   "Content-type": "application/x-www-form-urlencoded",
        // },
        // nama: nama,
        // angkatan: angkatan,
        // email: email,
        // tempat_lahir: tempat_lahir,
        // kontak: kontak,
        // nim: nim,
        // status: status,
        // jalur_masuk: jalur_masuk,
        // doswal: doswal,
        // tgl_lahir: tgl_lahir,
        // alamat: alamat,
        // provinsi: provinsi,
        // kota: kota,
        // kecamatan: kecamatan,
        // kelurahan: kelurahan,
        // kodepos: kodepos,
        // image: file,
        // url: preview
        // }
      );
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        window.alert(error.response.data.msg);
      }
    }
  };

  const li_angkatan = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const li_jalur = ["SNMPTN", "SBMPTN", "SBUB", "SM", "Kemitraan"];

  return (
    <div className="mb-16 p-12 relative bg-white flex-initial w-10/12">
      <div className="alert text-white p-8 bg-red-400">
        <div className="flex justify-between text-2xl">
          <div className="font-bold">
            HARAP LAKUKAN PENGISIAN DATA HINGGA SELESAI UNTUK DAPAT MENGGUNAKAN
            FITUR LAIN. <br />
            <span className="italic">
              Do fill out entire data to use other features.
            </span>
          </div>
          <img src={alert} className="h-15 m-auto w-auto" />
        </div>
      </div>

      <div className="form pt-4">
        <form onSubmit={updateDataMhs}>
          <div className="grid grid-cols-3 gap-4 row1">
            <div className="coleft">
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="nama"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Nama Mahasiswa
                </label>
                <input
                  disabled
                  value={nama}
                  type="text"
                  name="nama"
                  id="nama"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="angkatan"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Angkatan
                </label>
                <select
                  value={angkatan}
                  disabled
                  name="angkatan"
                  id="angkatan"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">Pilih Angkatan</option>
                  {li_angkatan.map((opt) => (
                    <option
                      value={opt}
                      selected={angkatan == opt ? true : false}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="password"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Password
                </label>
                <input
                  disabled
                  type="password"
                  name="password"
                  id="password"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div> */}

              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="tempat_lahir"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Tempat Lahir
                </label>
                <input
                  required
                  value={tempat_lahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  type="text"
                  name="tempat_lahir"
                  id="tempat_lahir"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="kontak"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  No. Telepon
                </label>
                <input
                  required
                  value={kontak}
                  onChange={(e) => setKontak(e.target.value)}
                  type="text"
                  name="kontak"
                  id="kontak"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="jalur_masuk"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Jalur Masuk
                </label>
                <select
                  required
                  value={jalur_masuk}
                  onChange={(e) => setJalurMasuk(e.target.value)}
                  name="jalur_masuk"
                  id="jalur_masuk"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">Pilih Jalur Masuk</option>
                  {li_jalur.map((opt) => (
                    <option
                      value={opt}
                      selected={jalur_masuk == opt ? true : false}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="coright">
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="nim"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Nomor Induk Mahasiswa
                </label>
                <input
                  value={nim}
                  disabled
                  type="text"
                  name="nim"
                  id="nim"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="status"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Status Mahasiswa
                </label>
                <select
                  disabled
                  value={status}
                  name="status"
                  id="status"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">Pilih Status</option>
                  <option value="1" selected={status == 1 ? true : false}>
                    AKTIF
                  </option>
                  <option value="0" selected={status == 0 ? true : false}>
                    NON-AKTIF
                  </option>
                </select>
              </div>

              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="tgl_lahir"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Tanggal Lahir
                </label>
                <input
                  required
                  value={tgl_lahir}
                  onChange={(e) => setTglLahir(e.target.value)}
                  type="date"
                  name="tgl_lahir"
                  id="tgl_lahir"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="email"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Email
                </label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="doswal"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Dosen Wali
                </label>
                <select
                  required
                  defaultValue="1"
                  value={doswal}
                  onChange={(e) => setDoswal(e.target.value)}
                  name="doswal"
                  id="doswal"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">--Pilih Dosen Wali--</option>
                  {doswals.map((opt) => (
                    <option
                      value={opt.kode_wali}
                      selected={doswal == opt.kode_wali ? true : false}
                    >
                      {opt.nama}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-3/5 mx-auto">
              <div className="grid place-items-center shadow-md w-48 h-64 m-8">
                {preview ? (
                  <img src={preview} alt="Foto Mahasiswa" className="w-10/12" />
                ) : (
                  ""
                )}
              </div>
              <div className="ml-8 bg-transparent py-2  rounded">
                <input
                  type="file"
                  className="file-input"
                  onChange={loadImage}
                />
              </div>
            </div>
          </div>

          <br />
          <hr />

          <div className="grid grid-cols-3 gap-4 row2">
            <div className="coleft">
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="Alamat"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Alamat Mahasiswa
                </label>
                <input
                  required
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  type="text"
                  name="Alamat"
                  id="Alamat"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                />
              </div>

              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="kota"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Kabupaten/Kota
                </label>
                <select
                  required
                  value={kota}
                  onChange={(e) => {
                    setKota(e.target.value);
                    setRegency(e.target.value);
                    getDistrictsByRegency();
                  }}
                  onBlur={(e) => {
                    setKota(e.target.value);
                    setRegency(e.target.value);
                    getDistrictsByRegency();
                  }}
                  name="kota"
                  id="kota"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">--Pilih Kota-</option>
                  {regencies.map((opt) => (
                    <option
                      value={opt.id}
                      selected={kota == opt.id ? true : false}
                    >
                      {opt.name}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="kelurahan"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Kelurahan
                </label>
                <select
                  required
                  value={kelurahan}
                  onChange={(e) => {
                    setKelurahan(e.target.value);
                    setVillage(e.target.name);
                    getPostalByVillage();
                  }}
                  onBlur={(e) => {
                    setKelurahan(e.target.value);
                    setVillage(e.target.name);
                    getPostalByVillage();
                  }}
                  name="kelurahan"
                  id="kelurahan"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">--Pilih Kelurahan-</option>
                  {villages.map((opt) => (
                    <option
                      value={`${opt.id}`}
                      label={`${opt.name}`}
                      selected={kelurahan == opt.id ? true : false}
                    >
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="coright">
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="form-group flex flex-col my-4">
                  <label
                    htmlFor="rt"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    RT
                  </label>
                  <select
                    value={rt}
                    onChange={(e) => setRT(e.target.value)}
                    name="rt"
                    id="rt"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  >
                    <option value="">--Pilih RT-</option>
                  </select>
                </div>
                <div className="form-group flex flex-col my-4">
                  <label
                    htmlFor="rw"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    RW
                  </label>
                  <select
                    value={rw}
                    onChange={(e) => setRW(e.target.value)}
                    name="rw"
                    id="rw"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  >
                    <option value="0">--Pilih RW-</option>
                  </select>
                </div>
              </div> */}
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="provinsi"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Provinsi
                </label>
                <select
                  required
                  value={provinsi}
                  onChange={(e) => {
                    setProvinsi(e.target.value);
                    setProvince(e.target.value);
                    getRegenciesByProvince();
                  }}
                  onBlur={(e) => {
                    setProvinsi(e.target.value);
                    setProvince(e.target.value);
                    getRegenciesByProvince();
                  }}
                  name="provinsi"
                  id="provinsi"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">--Pilih Provinsi--</option>
                  {provinces.map((opt) => (
                    <option
                      value={opt.id}
                      selected={provinsi == opt.id ? true : false}
                    >
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="kecamatan"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Kecamatan
                </label>
                <select
                  required
                  value={kecamatan}
                  onChange={(e) => {
                    setKecamatan(e.target.value);
                    setDistrict(e.target.value);
                    getVillagesByDistrict();
                  }}
                  onBlur={(e) => {
                    setKecamatan(e.target.value);
                    setDistrict(e.target.value);
                    getVillagesByDistrict();
                  }}
                  name="kecamatan"
                  id="kecamatan"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">--Pilih Kecamatan--</option>
                  {districts.map((opt) => (
                    <option
                      value={opt.id}
                      selected={kecamatan == opt.id ? true : false}
                    >
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group flex flex-col my-4">
                <label
                  htmlFor="kodepos"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Kode Pos
                </label>
                <select
                  required
                  value={kodepos}
                  onChange={(e) => setKodePos(e.target.value)}
                  onBlur={(e) => setKodePos(e.target.value)}
                  name="kodepos"
                  id="kodepos"
                  className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                >
                  <option value="">--Pilih Kode Pos-</option>
                  {postal.map((opt) => (
                    <option
                      value={opt.kodepos}
                      selected={kodepos == opt.kodepos ? true : false}
                    >
                      {opt.kodepos}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="ml-6 rounded bg-green-600 text-white py-2 px-6 hover:bg-blue-500 font-semibold hover:text-white">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateDataMhs;
