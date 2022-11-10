import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResultDsn from "../../components/Dept_ResultDsn";
import { getMe } from "../../features/authSlice";

import Layout from "../Layout";
import Pagination from "../../components/Pagination";

const DosenForDept = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(15);
  const [dosen, setDosen] = useState([]);

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
    requestLecturers();
  }, [keyword]);

  async function requestLecturers() {
    try {
      let response;
      if (keyword == "") {
        response = await fetch(`http://localhost:5000/doswal`);
      } else {
        response = await fetch(`http://localhost:5000/doswals/${keyword}`);
      }
      let json = await response.json();
      if (!Array.isArray(json) && json != {}) {
        json = [json];
      }
      setDosen(json);
    } catch (error) {
      setDosen([]);
    }
  }

  // Get current posts
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dosen.slice(indexOfFirstData, indexOfLastData);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="mb-16 p-16 pb-16 relative bg-white flex-initial w-10/12">
        <div className="mb-10 p-5 pb-1 relative bg-white flex-initial">
          <div class="flow-root">
            <h3 className="text-lg font-normal float-left flex my-1">
              Data Dosen Informatika
            </h3>
            <div className="float-right">
              <button
                type="button"
                onClick={() => printJS("cetak", "html")}
                class="px-6 pt-2.5 pb-2 bg-yellow-500 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
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
          <h3 className="text-lg font-normal">Fakultas Sains dan Matematika</h3>
        </div>
        <div className="px-5 form-label inline-block mb-2 text-gray-600">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="keyword">
              <input
                class="form-control pl-6 pr-12 py-2 rounded border border-slate-500"
                id="keyword"
                placeholder="Cari Nama atau NIM"
                onChange={(e) => {
                  setKeyword(e.target.value);
                  requestLecturers();
                }}
              />
            </label>
          </form>
        </div>
        <div class="flex flex-col px-5">
          <div class="overflow-x-auto">
            <div class="py-4 inline-block min-w-full" id="cetak">
              <ResultDsn dosen={currentData} />
            </div>
          </div>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={dosen.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default DosenForDept;
