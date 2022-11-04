import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

import Layout from "../Layout";
import { useState } from "react";
import ResultMhs from "../../components/Dept_ResultMhs";

import print from "print-js";

const MahasiswaForDept = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [keyword, setKeyword] = useState("");
  const [mahasiswa, setMahasiswa] = useState([]);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (!user.nip) {
        // kalo ga dept, cabut
        navigate("/dashboard");
      }
    }
  }, [isError, user, navigate]);

  useEffect(() => {
    requestStudents();
  }, []);

  async function requestStudents() {
    try {
      let response;
      if (keyword == "") {
        response = await fetch(`http://localhost:5000/mahasiswa`);
      } else {
        response = await fetch(`http://localhost:5000/mahasiswas/${keyword}//`);
      }
      let json = await response.json();
      setMahasiswa(json);
    } catch (error) {
      setMahasiswa([]);
    }
  }

  return (
    <Layout>
      <div className="mb-16 p-16 pb-16 relative bg-white flex-initial w-10/12">
        <div className="mb-10 p-5 pb-1 relative bg-white flex-initial">
          <div class="flow-root">
            <h3 className="text-lg font-normal float-left flex my-1">
              Data Mahasiswa Informatika
            </h3>
            <div className="float-right">
              <button
                onClick={() => printJS("cetak", "html")}
                type="button"
                class=" px-6 pt-2.5 pb-2 bg-yellow-500 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="download"
                  class="w-3 mr-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                  ></path>
                </svg>
                cetak
              </button>
            </div>
          </div>
          <h3 className="text-lg font-normal">
            Fakultas Sains dan Matermatika
          </h3>
        </div>
        <div class="mb-5 px-5 relative bg-white flex-initial row flex my-4">
          <div className="offset-md-2 col md-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                requestStudents();
              }}
            >
              <label htmlFor="keyword">
                <input
                  class="form-control px-2 py-1 border bg-gray-300"
                  id="keyword"
                  placeholder="Cari Nama atau NIM"
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    requestStudents();
                  }}
                />
              </label>
            </form>
          </div>
        </div>

        <div class="flex flex-col px-5">
          <div class="overflow-x-auto">
            <div class="py-4 inline-block min-w-full" id="cetak">
              <ResultMhs mahasiswa={mahasiswa} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MahasiswaForDept;
