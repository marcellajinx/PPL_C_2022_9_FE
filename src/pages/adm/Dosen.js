import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Layout from "../Layout";

const DosenForAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);
  const [dosen, setDosen] = useState([]);

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
    getAllDsn();
  }, []);
  async function getAllDsn() {
    try {
      let response;
      response = await fetch(`http://localhost:5000/doswal`);
      let json = await response.json();
      if (!Array.isArray(json) && json != {}) {
        json = [json];
      }
      setDosen(json);
    } catch (error) {
      setDosen([]);
    }
  }

  return (
    <Layout>
      <div className="min-h-[68vh] mb-16 relative w-full">
        <div className="flex inset-y-0 left-0 pb-12 h-full">
          <div className="bg-white p-12 h-full left-0 w-full gap-4">
            <table class="mt-1 w-full border-collapse border border-slate-500 text-center">
              <thead>
                <tr class="text-white">
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    No
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    NIP
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    Nama
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    Email
                  </th>
                  <th class="border border-slate-600 bg-gray-500 opacity-75">
                    No HP
                  </th>
                </tr>
              </thead>
              <tbody>
                {dosen.map((dsn, idx) => {
                  return (
                    <tr class="bg-white border-b">
                      <td class="border border-slate-600">{idx + 1}</td>
                      <td class="border border-slate-600">{dsn.nip}</td>
                      <td class="border border-slate-600">{dsn.nama}</td>
                      <td class="border border-slate-600">{dsn.email}</td>
                      <td class="border border-slate-600">{dsn.no_hp}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DosenForAdmin;
