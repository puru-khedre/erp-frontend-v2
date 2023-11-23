import { useEffect, useState } from "react";
import Loader from "../components/Loader";

import { FaPlus } from "react-icons/fa";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import All from "./All";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/users/userlist");

        const list = await res.json();

        console.log({ list });
        if (list.result) setData(list.result);
        else {
          setData([]);
          throw new Error("Users list is empty");
        }
        console.log(list.result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="h-full">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full py-2 flex justify-between items-center flex-row mb-3">
            <div>
              <h1 className="text-3xl font-medium">Users</h1>
            </div>
            <div>
              <Link to={"new"}>
                <button className="whitespace-nowrap w-max text-white p-2 bg-indigo-500 hover:bg-indigo-600 rounded-md">
                  <FaPlus className="inline" /> Add User
                </button>
              </Link>
            </div>
          </div>
          <All />
          {/* <Table data={data} /> */}
        </>
      )}
    </div>
  );
};

export default Users;
