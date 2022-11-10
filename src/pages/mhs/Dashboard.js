import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

import trophy from "../../../public/images/trophy.png";

const DashboardMhs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log("err dash mhs");
      navigate("/");
    }
    if (user) {
      if (user.nim === "0") {
        navigate("/dashboard");
      }
    }
  }, [isError, user, navigate]);

  const [doswal, setDoswal] = useState([]);
  const [sem, setSem] = useState("");
  const [khs, setKHS] = useState("");

  useEffect(() => {
    getSem();
    getDoswal();
    getKHS();
  }, []);

  useEffect(() => {
    getDoswal();
  }, [doswal]);

  const getSem = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/irs/${user && user.nim}`
      );
      let json = await response.json();
      setSem(Object.keys(json).length);
    } catch (error) {
      setSem("");
    }
  };
  const getDoswal = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/doswal/${user && user.kode_wali}`
      );
      let json = await response.json();
      setDoswal(json);
    } catch (error) {
      setDoswal([]);
    }
  };
  const getKHS = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/khs/${user && user.nim}`
      );
      let json = await response.json();

      setKHS(json[json.length - 1]);
    } catch (error) {
      setKHS([]);
    }
  };

  return (
    <div className="min-h-[65vh] mb-16 p-12 pb-4 relative bg-white flex-initial w-10/12">
      <h3 className="text-3xl font-bold">Dashboard</h3>
      <div className="flex my-4">
        <div className="dash-foto">
          <div className="shadow-md w-48 h-64 mr-8 bg-slate-100 border border-slate-100 grid place-items-center">
            <img src={user && user.url} alt="Foto profil" className="w-11/12" />
          </div>
        </div>

        <div className="dash-profile">
          <table className="">
            <tbody>
              <tr>
                <td>NIM</td>
                <td>: {user && user.nim}</td>
              </tr>
              <tr>
                <td>Nama Lengkap </td>
                <td>: {user && user.nama}</td>
              </tr>
              <tr>
                <td>Angkatan</td>
                <td>: {user && user.angkatan}</td>
              </tr>
              <tr>
                <td>Jalur Masuk</td>
                <td>: {user && user.jalur_masuk}</td>
              </tr>
              <tr>
                <td>No. HP</td>
                <td>: {user && user.no_hp}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>: {user && user.email}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>: {user && user.alamat}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex my-8 justify-between">
        <table className="flex-inline w-3/5 table-auto px-10 py-1 border border-slate-400">
          <thead className="bg-slate-300 flex">
            <img src={trophy} className="w-10 py-2 pl-2 pr-3" />
            <p className="grid place-items-center">Status Akademik</p>
          </thead>
          <tbody className="text-center">
            <br />
            <p>Dosen wali: {doswal.nama}</p>
            <p>(NIP: {doswal.nip})</p>
            <br />
            <div className="flex justify-center">
              <div className="border-r-2 border-slate-400 px-10">
                <p>Semester Studi</p>
                <p>{sem}</p>
              </div>
              <div className="px-10">
                <p>Status Akademik</p>
                <p className="py-1 px-2 text-white bg-green-300">
                  {user && user.status_mhs === "1" ? "AKTIF" : "NON-AKTIF"}
                </p>
              </div>
            </div>
            <br />
          </tbody>
        </table>

        <table className="flex-inline w-1/3 table-auto px-10 py-1 border border-slate-400">
          <thead className="bg-slate-300 flex">
            <img src={trophy} className="w-10 py-2 pl-2 pr-3" />
            <p className="grid place-items-center">Prestasi Akademik</p>
          </thead>
          <tbody className="text-center">
            <br />
            <br />
            <br />
            <div className="flex justify-center">
              <div className="border-r-2 border-slate-400 px-10">
                <p>IPK</p>
                <p>{khs ? khs.ipk : "-"}</p>
              </div>
              <div className="px-10">
                <p>SKSK</p>
                <p>{khs ? khs.jml_sksk : "-"}</p>
              </div>
            </div>
            <br />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMhs;
