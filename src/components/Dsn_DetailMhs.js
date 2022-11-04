import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Layout from "../pages/Layout";

const DetailMhsDsn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [mhs, setMhs] = useState("");
  const [msg, setMsg] = useState("");
  const [irs, setIRS] = useState([]);

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

  useEffect(() => {
    const getMhsByNIM = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/mahasiswa/${id}`
        );
        setMhs(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    const getIRSByNIM = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/irs/${id}`);
        setIRS(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getIRSByNIM();
    getMhsByNIM();
  }, [id]);

  return (
    <Layout>
      <div className="min-h-[65vh] mb-16 p-12 pb-4 relative bg-white flex-initial w-10/12">
        {/* <form className="mt-4">
        <div className="grid grid-cols-2 gap-4 w-2/4">
          <div className="form-group flex flex-col my-4">
            <label
              for="nama"
              className="form-label inline-block mb-2 text-gray-700"
            ></label>
            <input
              type="text"
              name="nama"
              id="nama"
              value={nama}
              disabled
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="grid place-flex justify-start ...">
            <button
              type="button"
              class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
            >
              Cari
            </button>
          </div>
        </div>
      </form> */}

        <div class="flow-root">
          <h3 className="text-2xl font-normal float-left">
            Progress Perkembangan Mahasiswa Informatika
          </h3>
          <div className="float-right"></div>
        </div>
        <h3 className="text-2xl font-normal">
          Fakultas Sains dan Matematika UNDIP
        </h3>
        <div className="bg-white-400 px-4 py-2 m-2"></div>

        <div className="flex">
          <div className="dash-foto">
            <div className="shadow-md w-52 h-60 mr-8 bg-slate-100 border border-slate-100"></div>
          </div>

          {/* <div className="dash-profile">
          <div className="form-group flex flex-col">
            <label
              for="nama"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Nama Mahasiswa
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              value={nama}
              disabled
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              for="nama"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              NIM
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              for="angkatan"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Angkatan
            </label>
            <select
              name="angkatan"
              id="angkatan"
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 text-xl focus:outline-none"
            >
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="form-group flex flex-col my-4">
            <label
              for="nama"
              className="form-label inline-block mb-2 text-gray-700 text-xl"
            >
              Dosen Wali
            </label>
            <input
              type="text"
              name="nama"
              id="nama"
              className="p-1.5 form-control border border-solid border-gray-300 rounded focus:border-gray-500 focus:outline-none"
            />
          </div>
        </div> */}

          <div className="dash-profile">
            <table className="">
              <tbody>
                <tr>
                  <td>NIM</td>
                  <td>: {mhs.nim}</td>
                </tr>
                <tr>
                  <td>Nama Lengkap </td>
                  <td>: {mhs.nama}</td>
                </tr>
                <tr>
                  <td>Jalur Masuk</td>
                  <td>: {mhs.jalur_masuk}</td>
                </tr>
                <tr>
                  <td>No. HP</td>
                  <td>: {mhs.no_hp}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>: {mhs.email}</td>
                </tr>
                <tr>
                  <td>Alamat</td>
                  <td>: {mhs.alamat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-group flex justify-center ">
          <label
            for="jlh_sks"
            className="form-label inline-block mb-2 text-gray-700 text-xl"
          >
            Semester
          </label>
        </div>
        <div class="justify-items-center grid grid-cols-5 gap-3">
          {irs.map((el, idx) => {
            <div class="w-4/5">
              <button class="w-full mt-10 bg-blue-500 text-white font-semibold py-2 px-11">
                {idx}
              </button>
            </div>;
          })}
        </div>
      </div>
    </Layout>
  );
};

export default DetailMhsDsn;
