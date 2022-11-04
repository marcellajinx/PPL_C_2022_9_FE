import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
const ListKHS = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [khs, setKHS] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    getKHSByNIM();
  }, [user && user.nim]);

  const getKHSByNIM = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/khs/${user && user.nim}`
      );
      let json = await response.json();
      if (!Array.isArray(json)) {
        json = [json];
      }
      setKHS(json);
    } catch (error) {
      setKHS([]);
    }
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white text-gray-900"
      data-inactive-classes="text-gray-500"
    >
      <br />
      {khs.map((el, idx) => {
        let h2id = `accordion-flush-heading-${idx + 1}`;
        let accortarget = `#accordion-flush-body-${idx + 1}`;
        let ariacontrols = `accordion-flush-body-${idx + 1}`;
        return (
          <>
            <h2 id={h2id}>
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-t border-gray-200"
                data-accordion-target={accortarget}
                aria-expanded="true"
                aria-controls={ariacontrols}
              >
                <span>Semester-{idx + 1}</span>
                <svg
                  data-accordion-icon
                  className="w-6 h-6 rotate-180 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div id={ariacontrols} className="" aria-labelledby={h2id}>
              <div className="py-5 font-light border-b border-gray-200">
                <div className="sem-group flex mb-2">
                  <p className="grid place-items-center flex-initial w-1/6 justify-start">
                    Status Mahasiswa
                  </p>
                  <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                    AKTIF
                  </div>
                </div>

                <div className="sem-group flex mb-2">
                  <p className="grid place-items-center flex-initial w-1/6 justify-start">
                    Semester Aktif
                  </p>
                  <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                    {el.smt_khs}
                  </div>
                </div>

                <div className="sem-group flex mb-2">
                  <p className="grid place-items-center flex-initial w-1/6 justify-start">
                    Jumlah SKS
                  </p>
                  <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                    {el.jml_sks}
                  </div>
                </div>

                <div className="sem-group flex mb-2">
                  <p className="grid place-items-center flex-initial w-1/6 justify-start">
                    Jumlah SKS Kumulatif
                  </p>
                  <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                    {el.jml_sksk}
                  </div>
                </div>

                <div className="sem-group flex mb-2">
                  <p className="grid place-items-center flex-initial w-1/6 justify-start">
                    IP Semester
                  </p>
                  <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                    {el.ips}
                  </div>
                </div>

                <div className="sem-group flex mb-2">
                  <p className="grid place-items-center flex-initial w-1/6 justify-start">
                    IPK
                  </p>
                  <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                    {el.ipk}
                  </div>
                </div>

                <div className="sem-group flex mb-2">
                  <p className="grid place-items-center flex-initial w-1/6 justify-start">
                    KHS
                  </p>
                  <div className="border border-grey-100 bg-blue-300 font-white px-6 py-1 font-sm">
                    <a href="{el.file_khs}">Lihat KHS</a>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ListKHS;
