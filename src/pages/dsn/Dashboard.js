import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LineChartPerwalian from "../../components/Chart_LinePerwalian";
import { getMe } from "../../features/authSlice";

const DashboardDsn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [kontak, setKontak] = useState("");
  const [nip, setNIP] = useState("");
  const [angkatan, setAngkatan] = useState("2016");
  const [dataPerwalian, setDataPerwalian] = useState([]);

  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (user.nip.slice(0, 2) !== "99") {
        navigate("/dashboard");
      }
    }
  }, [isError, user, navigate]);

  useEffect(() => {
    getDsnByNIP();
  }, []);

  const getDsnByNIP = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doswal/${id}`);
      setNama(response.data.nama);
      setEmail(response.data.email);
      setKontak(response.data.no_hp);
      setNIP(response.data.nip);

      setFile(response.data.image);
      setPreview(response.data.url);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    getDataPerwalian();
  }, [angkatan]);

  const getDataPerwalian = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chart/dashdosen/${
          user && user.kode_wali
        }/${angkatan}`
      );
      let json = await response.json();
      setDataPerwalian(json);
    } catch (error) {
      setDataPerwalian([]);
    }
  };

  let id;
  if (user && user.kode_wali) {
    id = user.kode_wali;
  }

  const updateDataDsn = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("kontak", kontak);
    formData.append("nip", nip);
    try {
      await axios.patch(`http://localhost:5000/dosen/${nip}`, formData);
      location.reload();
      // navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        window.alert(error.response.data.msg);
      }
    }
  };

  const li_angkatan = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

  return (
    <div className="md:container md:mx-1">
      <div className="mb-16 p-16 pb-16 relative bg-white flex-initial">
        {/* <div className="mb-10 p-5 pb-1 relative bg-white flex-initial">
          <div class="flow-root">
            <h3 className="text-lg font-normal float-left flex my-1">
              Dashboard
            </h3>
          </div>
        </div> */}
        <div className="bg-white-400">
          <form onSubmit={updateDataDsn}>
            <div className="grid grid-cols-3 gap-4 row1 mb-10">
              <div className="coleft">
                <div className="form-group flex flex-col my-4 px-5">
                  <label
                    for="nama"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Nama Dosen
                  </label>
                  <input
                    required
                    disabled
                    value={user && user.nama}
                    type="text"
                    name="nama_dsn"
                    id="nama_dsn"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div className="form-group flex flex-col my-4 px-5">
                  <label
                    for="nip"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Nomor Induk Pegawai
                  </label>
                  <input
                    value={user && user.nip}
                    required
                    disabled
                    type="text"
                    name="nip"
                    id="nip"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="coright">
                <div className="form-group flex flex-col my-4 px-5">
                  <label
                    for="email_dsn"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email_dsn"
                    id="email_dsn"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div className="form-group flex flex-col my-4 px-5">
                  <label
                    for="no_hp"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    No. Telepon
                  </label>
                  <input
                    required
                    value={kontak}
                    onChange={(e) => setKontak(e.target.value)}
                    type="text"
                    name="no_hp"
                    id="no_hp"
                    className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="mr-5 mt-8 bg-green-300 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-6">
                    Simpan
                  </button>
                </div>
              </div>
              <div className="w-3/5 mx-auto">
                <div className="grid place-items-center shadow-md w-48 h-56 m-8">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Foto Mahasiswa"
                      className="w-10/12"
                    />
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
          </form>
        </div>
      </div>
      {/* <div className="mb-16 p-12 pb-4 relative bg-white flex-initial"> */}
      <div class="grid bg-white-600 grid-rows-2 grid-flow-col gap-4 auto-cols-auto">
        <div className="flex justify-between bg-gray-100">
          <div className="mb-16 mr-8 p-12 pb-4 relative bg-white flex-initial w-3/5">
            <div className="grid content-start hover:content-around">
              <label
                for="nama"
                className="form-label inline-block mb-2 text-center text-gray-700"
              >
                Grafik Jumlah Mahasiswa Perwalian
              </label>
            </div>
            <div class="flex flex-col justify-center items-center">
              {/* <img class="object-cover h-2/3 w-3/4" src={chart} /> */}
              <LineChartPerwalian kode_wali={user && user.kode_wali} />
            </div>
          </div>
          <div className="mb-16 p-12 pb-4 relative bg-white flex-initial">
            <div className="grid content-start hover:content-around">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label
                  for="angkatan"
                  className="form-label inline-block mb-2 text-gray-700"
                >
                  Angkatan:
                </label>
                <select
                  name="angkatan"
                  id="angkatan"
                  className="p-1.5 ml-6 w-24 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
                  onChange={(e) => setAngkatan(e.target.value)}
                  onBlur={(e) => setAngkatan(e.target.value)}
                >
                  {li_angkatan.map((li) => (
                    <option value={li} key={li}>
                      {li}
                    </option>
                  ))}
                </select>
              </form>
            </div>

            <div class="rounded-2xl flex-col bg-white flex pt-3">
              <div class="grid gap-6 grid-cols-2 mb-3">
                <div class="flex-1 p-2">
                  <div class="justify-between items-center">
                    <div class="flex">
                      <div class="flex justify-between items-center pr-4">
                        <div class="bg-purple-200 rounded-lg flex items-center justify-center h-full w-20">
                          <span class="inline-flex justify-center items-center">
                            <img src="https://iili.io/DgAjff.png" />
                          </span>
                        </div>
                      </div>

                      <div class="flex justify-between items-center">
                        <div class="flex flex-col justify-center">
                          <h3 class="text-lg leading-tight text-gray-500">
                            Mahasiswa Perwalian Aktif
                          </h3>
                          <h1 class="text-2xl leading-tight font-semibold">
                            {dataPerwalian.perwalianaktif}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex-1 p-2">
                  <div class="justify-between items-center">
                    <div class="flex">
                      <div class="flex justify-between items-center pr-4">
                        <div class="bg-yellow-100 rounded-lg flex items-center justify-center h-full w-20">
                          <span class="inline-flex justify-center items-center">
                            <img src="https://iili.io/DgAjff.png" />
                          </span>
                        </div>
                      </div>

                      <div class="flex justify-between items-center">
                        <div class="flex flex-col justify-center">
                          <h3 class="text-lg leading-tight text-gray-500">
                            Mahasiswa Perwalian Cuti
                          </h3>
                          <h1 class="text-2xl leading-tight font-semibold">
                            {dataPerwalian.perwaliancuti}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex-1 p-2">
                  <div class="justify-between items-center">
                    <div class="flex">
                      <div class="flex justify-between items-center pr-4">
                        <div class="bg-green-200 rounded-lg flex items-center justify-center h-full w-20">
                          <span class="inline-flex justify-center items-center ">
                            <img src="https://iili.io/DgAjff.png" />
                          </span>
                        </div>
                      </div>

                      <div class="flex justify-between items-center">
                        <div class="flex flex-col justify-center">
                          <h3 class="text-lg leading-tight text-gray-500">
                            Mahasiswa Perwalian PKL
                          </h3>
                          <h1 class="text-2xl leading-tight font-semibold">
                            {dataPerwalian.perwalianpkl}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex-1 p-2">
                  <div class="justify-between items-center">
                    <div class="flex">
                      <div class="flex justify-between items-center pr-4">
                        <div class="bg-blue-200 rounded-lg flex items-center justify-center h-full w-20">
                          <span class="inline-flex justify-center items-center">
                            <img src="https://iili.io/DgAjff.png" />
                          </span>
                        </div>
                      </div>

                      <div class="flex justify-between items-center">
                        <div class="flex flex-col justify-center">
                          <h3 class="text-lg leading-tight text-gray-500">
                            Mahasiswa Perwalian Skripsi
                          </h3>
                          <h1 class="text-2xl leading-tight font-semibold">
                            {dataPerwalian.perwalianskripsi}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDsn;
