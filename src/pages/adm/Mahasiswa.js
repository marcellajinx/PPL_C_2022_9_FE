import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout";
import Pagination from "../../components/Pagination";

const MahasiswaForAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  const [mahasiswa, setMahasiswa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(15);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user) {
      if (!user.nip || user.nip.slice(0, 2) !== "88") {
        // kalo ga operator, cabut
        navigate("/dashboard");
      }
    }
  }, [isError, user, navigate]);

  useEffect(() => {
    // getAllMhs();
    getAllMhsByKeyword();
  }, []);
  // async function getAllMhs() {
  //   try {
  //     let response;
  //     response = await fetch(`http://localhost:5000/mahasiswa`);
  //     let json = await response.json();
  //     if (!Array.isArray(json) && json != {}) {
  //       json = [json];
  //     }
  //     setMahasiswa(json);
  //   } catch (error) {
  //     setMahasiswa([]);
  //   }

  async function getAllMhsByKeyword() {
    try {
      let url = `http://localhost:5000/mahasiswas/`;
      keyword == "" ? (url += " / / /") : (url += `${keyword}/ / /`);
      const response = await fetch(url);
      let json = await response.json();
      setMahasiswa(json);
    } catch (error) {
      setMahasiswa([]);
    }
  }

  // Get current posts
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = mahasiswa.slice(indexOfFirstData, indexOfLastData);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="min-h-[68vh] mb-16 relative w-full">
        <div className="flex inset-y-0 left-0 pb-12 h-full">
          <div className="bg-white p-12 h-full left-0 w-full gap-4">
            <div className="form-label inline-block mb-2 text-gray-600">
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
                      getAllMhsByKeyword();
                    }}
                  />
                </label>
              </form>
            </div>
            <table class="mt-1 w-full border-collapse border border-slate-500 text-center">
              <thead>
                <tr class="text-white">
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    No
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    NIM
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    Nama
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    Angkatan
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    Email
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    Jalur Masuk
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {!mahasiswa.length ? (
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <br />
                      <h4 className="font-bold">No Students Found</h4>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  currentData.map((mhs, idx) => {
                    return (
                      <tr class="bg-white border-b">
                        <td class="border border-slate-600">{idx + 1}</td>
                        <td class="border border-slate-600">{mhs.nim}</td>
                        <td class="border border-slate-600">{mhs.nama}</td>
                        <td class="border border-slate-600">{mhs.angkatan}</td>
                        <td class="border border-slate-600">{mhs.email}</td>
                        <td class="border border-slate-600">
                          {mhs.jalur_masuk}
                        </td>
                        <td class="border border-slate-600">
                          {mhs.status_mhs}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <Pagination
              dataPerPage={dataPerPage}
              totalData={mahasiswa.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MahasiswaForAdmin;
