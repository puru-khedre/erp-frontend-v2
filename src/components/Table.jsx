import { FaArrowDown, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function TableHead() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="py-3 pl-4">
          <div className="flex items-center h-5">
            <input
              id="checkbox-all"
              type="checkbox"
              className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
            />
            <label htmlFor="checkbox" className="sr-only">
              Checkbox
            </label>
          </div>
        </th>

        <th
          scope="col"
          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          <span className="inline-flex items-center">
            Name
            <FaArrowDown className="w-3 h-3 ml-1" />
          </span>
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
        >
          <span className="inline-flex items-center">
            Email
            <FaArrowDown className="w-3 h-3 ml-1" />
          </span>
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase border-x-1 w-min"
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ user }) {
  const handleDelete = async (user_id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/users/user_delete/${user_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // Remove the deleted user from the data array
        // setData((prevData) =>
        //   prevData.filter((user) => user.user_id !== user_id)
        // );
      } else {
        console.error("Delete request failed with status:", res.status);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  console.log(user);
  return (
    <tr>
      <td className="py-3 pl-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
          />
          <label htmlFor="checkbox" className="sr-only">
            Checkbox
          </label>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        <Link to={"user/" + user.user_id}>{user.name}</Link>
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {user.email}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap space-x-2 border-x-1 w-min">
        <Link
          className="text-blue-500 hover:text-blue-600 hover:underline"
          to={"user/" + user.user_id}
        >
          View
        </Link>
        <Link
          className="text-green-500 hover:text-green-600 hover:underline"
          to={`user/${user.user_id}/edit`}
        >
          Edits
        </Link>
        <button
          className="text-red-500 hover:text-red-600 hover:underline"
          onClick={() => handleDelete(user.user_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default function Table({ data }) {
  const users = data;
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-3 pl-2">
          <div className="relative max-w-xs">
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="block w-full pl-10 text-sm border-gray-200 rounded-md outline-none border p-2 mt-1 focus-visible:ring-4 ring-indigo-200 focus-visible:border-indigo-400"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="h-3.5 w-3.5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHead />
              <tbody className="divide-y divide-gray-200">
                {users.map((user, i) => (
                  <TableRow key={i} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
