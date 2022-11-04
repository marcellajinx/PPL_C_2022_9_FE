import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.withCredentials = true;

import { store } from "./app/store";

import Login from "./components/Login";

import Dashboard from "./pages/Dashboard";
import UpdateDataMhs from "./pages/mhs/UpdateDataMhs";
import KHS from "./pages/mhs/KHS";
import IRS from "./pages/mhs/IRS";
import Skripsi from "./pages/mhs/Skripsi";
import PKL from "./pages/mhs/PKL";

import CreateUser from "./pages/adm/CreateUser";
import DashboardAdm from "./pages/adm/Dashboard";
import MahasiswaForDept from "./pages/dept/Mahasiswa";
import DosenForDept from "./pages/dept/Dosen";
import ProfileAdm from "./pages/adm/Profile";
import MahasiswaForAdmin from "./pages/adm/Mahasiswa";
import DosenForAdmin from "./pages/adm/Dosen";
import VerifikasiIRS from "./pages/dsn/VerifikasiIRS";
import VerifikasiKHS from "./pages/dsn/VerifikasiKHS";
import VerifikasiPKL from "./pages/dsn/VerifikasiPKL";
import VerifikasiSkripsi from "./pages/dsn/VerifikasiSkripsi";
import PKLDsn from "./pages/dsn/PKL";
import SkripsiDsn from "./pages/dsn/Skripsi";
import DataMhsDsn from "./pages/dsn/DataMhs";
import DetailMhsDsn from "./components/Dsn_DetailMhs";

// import DataMhs from './pages/mhs/DataMhs';
// import PKL from './pages/mhs/PKL';
// import Skripsi from './pages/mhs/Skripsi';

// import DashboardDsn from './pages/dsn/DashboardDsn';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <React.Fragment>
            {/* <div className="bg-gray-100 mx-auto"> */}
            <Route exact path="/" element={<Login />} />

            <Route path="/user/add" element={<CreateUser />} />

            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route exact path="/data" element={<UpdateDataMhs />} />

            <Route exact path="/irs" element={<IRS />} />

            <Route exact path="/khs" element={<KHS />} />

            <Route exact path="/skripsi" element={<Skripsi />} />

            <Route exact path="/pkl" element={<PKL />} />

            <Route exact path="/dept/data-mhs" element={<MahasiswaForDept />} />
            <Route exact path="/dept/data-dsn" element={<DosenForDept />} />

            <Route exact path="/adm/profile" element={<ProfileAdm />} />
            <Route exact path="/adm/data-mhs" element={<MahasiswaForAdmin />} />
            <Route exact path="/adm/data-dsn" element={<DosenForAdmin />} />

            <Route exact path="/dosen/pkl" element={<PKLDsn />} />
            <Route exact path="/dosen/skripsi" element={<SkripsiDsn />} />
            <Route exact path="/dosen/data-mhs" element={<DataMhsDsn />} />
            <Route
              exact
              path="/dosen/detail-mhs/:id"
              element={<DetailMhsDsn />}
            />

            <Route
              exact
              path="/dosen/verifikasi/irs"
              element={<VerifikasiIRS />}
            />
            <Route
              exact
              path="/dosen/verifikasi/khs"
              element={<VerifikasiKHS />}
            />

            <Route
              exact
              path="/dosen/verifikasi/pkl"
              element={<VerifikasiPKL />}
            />

            <Route
              exact
              path="/dosen/verifikasi/skripsi"
              element={<VerifikasiSkripsi />}
            />

            {/* <Route path="/admin/dashboard" element={<DashboardAdm/>} /> */}
            {/* <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listMhs}
                />
                <DataMhs/>
              </div>
              <Footer/>
            </Route> */}

            {/* <Route exact path="/irs"> */}
            {/* <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listMhs}
                />
                <IRS/>
              </div>
              <Footer/>
            </Route> */}

            {/* <Route exact path="/khs"> */}
            {/* <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listMhs}
                />
                <KHS/>
              </div>
              <Footer/>
            </Route> */}

            {/* <Route exact path="/pkl"> */}
            {/* <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listMhs}
                />
                <PKL/>
              </div>
              <Footer/>
            </Route> */}

            {/* <Route exact path="/skripsi"> */}
            {/* <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listMhs}
                />
                <Skripsi/>
              </div>
              <Footer/>
            </Route> */}

            {/* <Route exact path="/dosen/dashboard"> */}
            {/* <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listDsn}
                />
                <DashboardDsn/>
              </div>
              <Footer/>
            </Route> */}

            {/* <Route exact path="/dosen/data-mhs">
              <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listDsn}
                />
                <DataDsn/>
              </div>
              <Footer/>
            </Route>

            <Route exact path="/dosen/pkl">
              <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listDsn}
                />
                <PKLDsn/>
              </div>
              <Footer/>
            </Route>

            <Route exact path="/dosen/skripsi">
              <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listDsn}
                />
                <SkripsiDsn/>
              </div>
              <Footer/>
            </Route>

            <Route exact path="/dosen/verifikasi">
              <Header/>    
              <div className="mx-6 mt-6 bg-gray-100 flex justify-between">
                <Sidebar 
                  lists={listDsn}
                />
                <VerifikasiDsn/>
              </div>
              <Footer/>
            </Route> */}

            {/* </div> */}
          </React.Fragment>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
