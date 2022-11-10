import printJS from "print-js";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../features/authSlice";
const ListIRS = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [irs, setIRS] = useState([]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    getIRSByNIM();
  }, [user && user.nim]);

  const getIRSByNIM = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/irs/${user && user.nim}`
      );
      let json = await response.json();
      if (!Array.isArray(json)) {
        json = [json];
      }
      setIRS(json);
    } catch (error) {
      setIRS([]);
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
      {irs.map((el, idx) => {
        let h2id = `accordion-flush-heading-${idx + 1}`;
        let accortarget = `#accordion-flush-body-${idx + 1}`;
        let ariacontrols = `accordion-flush-body-${idx + 1}`;
        return (
          <>
            <h2 id={h2id} className="mt-5">
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
              <div className="py-5 flex font-light border-b border-gray-200">
                <div className="w-full">
                  <div className="sem-group flex mb-2">
                    <p className="grid place-items-center flex-initial w-2/6 justify-start">
                      Status Mahasiswa
                    </p>
                    <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                      AKTIF
                    </div>
                  </div>

                  <div className="sem-group flex mb-2">
                    <p className="grid place-items-center flex-initial w-2/6 justify-start">
                      Semester Aktif
                    </p>
                    <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                      {el.smt_irs}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="sem-group flex mb-2">
                    <p className="grid place-items-center flex-initial w-2/6 justify-start">
                      Jumlah SKS
                    </p>
                    <div className="border border-grey-100 w-36 pl-3 py-1 align-left">
                      {el.jml_sks}
                    </div>
                  </div>

                  <div className="sem-group flex mb-2">
                    <p className="grid place-items-center flex-initial w-2/6 justify-start">
                      IRS
                    </p>
                    <div className="text-center rounded bg-yellow-500 text-white w-36 py-2 align-left">
                      <button type="button" onClick={() => printJS(el.url)}>
                        Lihat IRS
                      </button>
                    </div>
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

export default ListIRS;
