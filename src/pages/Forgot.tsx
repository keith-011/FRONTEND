const Forgot: React.FC = () => {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Sam Johnson", email: "sam@example.com", role: "Moderator" },
    // Add more data as needed
  ];

  return (
    <>
      {/* <div className="flex h-screen overflow-hidden">
        <div className="w-[400px] flex-shrink-0 bg-red-300">asd</div>
        <div className="grow px-5">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead>
                <tr>
                  <th className="whitespace-nowrap border px-4 py-2">
                    Header 1
                  </th>
                  <th className="whitespace-nowrap border px-4 py-2">
                    Header 2
                  </th>
                  <th className="whitespace-nowrap border px-4 py-2">
                    Header 3
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="whitespace-nowrap border px-4 py-2">
                    Content 1
                  </td>
                  <td className="whitespace-nowrap border px-4 py-2">
                    Longer Content 2
                  </td>
                  <td className="whitespace-nowrap border px-4 py-2">
                    Content 3
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap border px-4 py-2">
                    Content 4
                  </td>
                  <td className="whitespace-nowrap border px-4 py-2">
                    Content 5
                  </td>
                  <td className="whitespace-nowrap border px-4 py-2">
                    Very Long Content 6 That Should Expand the Table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> */}

      <div className="flex h-screen flex-col">
        <div className="h-navbar bg-orange-400"></div>
        <div className="flex h-full">
          <div className="w-sidebar shrink-0 bg-emerald-400"></div>
          <div className="flex-1 overflow-hidden bg-purple-400 px-10">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="flex">
                    <th className="flex-grow whitespace-nowrap px-4 py-2">
                      Oblivious Oblivious ObliviousOblivious Oblivious
                      ObliviousOblivious Oblivious Oblivious
                    </th>
                    <th className="flex-grow whitespace-nowrap px-4 py-2">
                      Header HeaderHeader HeaderHeader HeaderHeader HeaderHeader
                      HeaderHeader HeaderHeader Header
                    </th>
                    <th className="flex-grow whitespace-nowrap px-4 py-2">
                      Ribbons RibbonsRibbons RibbonsRibbons RibbonsRibbons
                      RibbonsRibbons RibbonsRibbons Ribbons
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="flex">
                    <td className="flex-grow whitespace-nowrap px-4 py-2">
                      Cell 1
                    </td>
                    <td className="flex-grow whitespace-nowrap px-4 py-2">
                      Cell 2
                    </td>
                    <td className="flex-grow whitespace-nowrap px-4 py-2">
                      Cell 3
                    </td>
                  </tr>
                  <tr className="flex">
                    <td className="flex-grow whitespace-nowrap px-4 py-2">
                      Cell 4
                    </td>
                    <td className="flex-grow whitespace-nowrap px-4 py-2">
                      Cell 5
                    </td>
                    <td className="flex-grow whitespace-nowrap px-4 py-2">
                      Cell 6
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgot;
