import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const User = () => {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${id}`);
        const userData = await res.json();
        console.log("user", userData);
        if (userData.error) {
          throw new Error(`User with id='${id}' is not found`);
        }
        return userData.result;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData().then((data) => {
      console.log(data);
      setUser(data);
    });
  }, []);

  return user ? (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="w-full md:w-1/2 sm:w-80">
        <Paper
          elevation={2}
          className="w-full p-4 !rounded-xl sm:sticky top-24 md:top-8"
        >
          <img
            src={
              `http://localhost:4000` + user.profile_image ||
              "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt="User"
            className="rounded-md m-auto w-1/2 sm:w-full bg-red-50 aspect-square object-cover"
          />
          <div className="mt-3 flex flex-row justify-between items-center">
            <h3 className="text-center text-xl">{user.name}</h3>
            <Link to="edit">
              <button className="bg-indigo-400 hover:bg-indigo-500 text-white px-4 py-2 rounded-md">
                Edit
              </button>
            </Link>
          </div>
        </Paper>
      </div>
      <TableContainer
        component={Paper}
        elevation={1}
        className="w-full !rounded-xl"
      >
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Department
              </TableCell>
              <TableCell>{user.department}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Designation
              </TableCell>
              <TableCell>{user.designation}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Address
              </TableCell>
              <TableCell>{user.address}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                City
              </TableCell>
              <TableCell>{user.city}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                State
              </TableCell>
              <TableCell>{user.state}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Email
              </TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Phone No 1
              </TableCell>
              <TableCell>{user.phone_no_1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Phone No 2
              </TableCell>
              <TableCell>{user.phone_no_2}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Blood Group
              </TableCell>
              <TableCell>{user.blood_group}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Aadhar Number
              </TableCell>
              <TableCell>{user.adhar_number}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Driving License
              </TableCell>
              <TableCell>{user.driving_license}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Date of Birth
              </TableCell>
              <TableCell>{user.date_of_birth}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Father&#39;s Name
              </TableCell>
              <TableCell>{user.father_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Mother&#39;s Name
              </TableCell>
              <TableCell>{user.mother_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Emergency Contact Person
              </TableCell>
              <TableCell>{user.emergency_contact_person}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="!text-gray-700" align="left">
                Emergency Contact Person Mobile
              </TableCell>
              <TableCell>{user.emergency_contact_person_mobile}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <Loader />
  );
};

export default User;
