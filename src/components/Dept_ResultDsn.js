const ResultDsn = ({ dosen }) => {
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
              NIP
            </th>
          </tr>
        </thead>
        <tbody>
          {!dosen.length ? (
            <tr>
              <td></td>
              <td>
                <br />
                <h4 className="font-bold">No Lecturers Found</h4>
              </td>
            </tr>
          ) : (
            dosen.map((dsn, idx) => {
              return (
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-l">
                    {idx + 1}
                  </td>
                  <td class="text-sm text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                    {dsn.nama}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                    {dsn.nip}
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

export default ResultDsn;
