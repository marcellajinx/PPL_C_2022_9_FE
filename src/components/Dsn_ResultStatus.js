import { Link } from "react-router-dom";

const ResultStatus = ({ mahasiswa }) => {
  return (
    <div class="overflow-hidden">
      <table class="min-w-full text-center">
        <thead class="border-b bg-gray-300">
          <tr>
            <th
              scope="col"
              class="text-sm font-medium text-grey px-6 py-4 border-r border-l"
            >
              No
            </th>
            <th
              scope="col"
              class="text-sm font-medium text-grey px-6 py-4 border-r"
            >
              Nama
            </th>
            <th
              scope="col"
              class="text-sm font-medium text-grey px-6 py-4 border-r"
            >
              NIM
            </th>
            <th
              scope="col"
              class="text-sm font-medium text-grey px-6 py-4 border-r"
            >
              Angkatan
            </th>
            <th
              scope="col"
              class="text-sm font-medium text-grey px-6 py-4 border-r"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {!mahasiswa.length ? (
            <tr>
              <td></td>
              <td></td>
              <td>
                <br />
                <h4 className="font-bold">No Students Found</h4>
              </td>
            </tr>
          ) : (
            mahasiswa.map((mhs, idx) => {
              return (
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                    {idx + 1}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                    <Link to={`/dosen/detail-mhs/${mhs.nim}`}>{mhs.nama}</Link>
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                    {mhs.nim}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                    {mhs.angkatan}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                    {mhs.status_mhs == "1" ? "AKTIF" : "NON-AKTIF"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultStatus;
