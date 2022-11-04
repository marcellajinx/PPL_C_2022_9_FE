import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FormAddUser = () => {
  const [nomorid, setNomorid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const [status, setStatus] = useState("");
  const [nama, setNama] = useState("");
  const [angkatan, setAngkatan] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        roles: roles,
        username: username,
        password: password,
        status: status,
        nama: nama,
        nomorid: nomorid,
        angkatan: angkatan,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  function onChangeRoles(e) {
    setRoles(e.target.value);
    if (e.target.value == 4 || e.target.value == 2 || e.target.value == 3) {
      // document.querySelector("#angkatan").style.visibility = "hidden";
      document.querySelector("#angkatan").setAttribute("disabled", "");
    } else {
      // document.querySelector("#angkatan").style.visibility = "visible";
      document.querySelector("#angkatan").removeAttribute("disabled");
    }
  }

  return (
    <div className="min-h-[65vh] mb-16 p-12 pb-4 relative bg-white flex-initial w-10/12">
      <div className="flex items-center justify-center">
        <div className="w-full">
          <form onSubmit={saveUser} className="space-y-3" action="#">
            {/* TEMPAT JUDUL */}
            {/* <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5> */}
            <div>
              <label
                htmlFor="roles"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <select
                onChange={(e) => onChangeRoles(e)}
                onBlur={(e) => setRoles(e.target.value)}
                name="roles"
                id="roles"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              >
                <option>--Select Role--</option>
                <option value="1">Mahasiswa</option>
                <option value="2">Dosen</option>
                <option value="3">Departemen</option>
                <option value="4">Operator</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Status
              </label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                onBlur={(e) => setStatus(e.target.value)}
                name="status"
                id="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              >
                <option>--Select Status--</option>
                <option value="1">AKTIF</option>
                <option value="0">NON-AKTIF</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="nama"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nama Lengkap
              </label>
              <input
                onChange={(e) => setNama(e.target.value)}
                type="text"
                name="nama"
                id="nama"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nomorid"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nomor Identitas
              </label>
              <input
                onChange={(e) => setNomorid(e.target.value)}
                type="text"
                name="nomorid"
                id="nomorid"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg fnomorocus:rinnomorg-blue-500 focus:border-blue-500 block w-full p-2"
                required
              />
            </div>

            <div className="mb-2 angkatan">
              <label
                for=""
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Angkatan
              </label>
              <input
                onChange={(e) => setAngkatan(e.target.value)}
                type="number"
                name="angkatan"
                id="angkatan"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isLoading ? "Loading..." : "Generate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
