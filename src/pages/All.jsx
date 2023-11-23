import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

const EnhancedTableHead = (props) => {
  const { onSelectAllClick, numSelected, rowCount } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const createDetailsObject = (row) => {
  const obj = {
    address: row.address,
    adhar_number: row.adhar_number,
    blood_group: row.blood_group,
    city: row.city,
    date_of_birth: row.date_of_birth,
    department: row.department,
    designation: row.designation,
    driving_license: row.driving_license,
    email: row.email,
    emergency_contact_person: row.emergency_contact_person,
    emergency_contact_person_mobile: row.emergency_contact_person_mobile,
    father_name: row.father_name,
    mother_name: row.mother_name,
    name: row.name,
    phone_no_1: row.phone_no_1,
    phone_no_2: row.phone_no_2,
    state: row.state,
  };
  return obj;
};
function EnhancedTableToolbar(props) {
  const { numSelected, handleDelete, search, setSearch } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} id="tableTitle" component="div">
          <input
            className="outline-none border border-gray-300 rounded-md p-2 focus-visible:ring-4 ring-indigo-200 focus-visible:border-indigo-400 w-2/3"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function All() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/users/userlist");
        const list = await res.json();
        if (list.result) setRows(list.result);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }

    fetchData()
      .then(() => {
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.user_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    console.log(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
        // setRows((prevData) =>
        //   prevData.filter((user) => user.user_id !== user_id)
        // );
      } else {
        console.error("Delete request failed with status:", res.status);
      }
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  const handleDeleteSelected = async () => {
    console.log("enter");
    console.log(selected);
    try {
      // Ensure there are selected items before proceeding with deletion
      if (selected.length === 0) {
        console.warn("No items selected for deletion.");
        return;
      }

      // Implement your server-side deletion logic here
      // Replace the URL with your actual server endpoint
      const deletePromises = selected.map(async (userId) => {
        const res = await fetch(
          `http://localhost:4000/users/user_delete/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          console.error(
            "Error deleting user with ID",
            userId,
            ":",
            res.status,
            res.statusText
          );
        }

        return res.json(); // This assumes your server returns a JSON response
      });

      await Promise.all(deletePromises);

      // Check the results if needed

      // After deletion, you might want to refetch the data or update the local data array
      // For simplicity, I'm resetting the selection here
      setSelected([]);
    } catch (error) {
      console.error("Error deleting selected items:", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {isLoading ? (
          <Loader className="py-16" />
        ) : (
          <>
            <EnhancedTableToolbar
              search={search}
              setSearch={setSearch}
              numSelected={selected.length}
              selected={selected}
              handleDelete={handleDeleteSelected}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={rows.length}
                />
                <TableBody>
                  {rows
                    .filter((row, i) => {
                      const obj = createDetailsObject(row);
                      console.log(JSON.stringify(obj).includes(search) && obj);
                      return JSON.stringify(obj)
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    })
                    .map((row, index) => {
                      row.id = row.user_id;
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.address}</TableCell>
                          <TableCell
                            className="!flex flex-row gap-2 justify-center"
                            align="center"
                          >
                            <Link
                              className="text-blue-500 hover:text-blue-600 hover:underline"
                              to={"user/" + row.user_id}
                            >
                              View
                            </Link>
                            <Link
                              className="text-green-500 hover:text-green-600 hover:underline"
                              to={`user/${row.user_id}/edit`}
                            >
                              Edits
                            </Link>
                            <button
                              className="text-red-500 hover:text-red-600 hover:underline"
                              onClick={() => handleDelete(row.user_id)}
                            >
                              Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {rows.filter((row, i) => {
                const obj = createDetailsObject(row);
                console.log(JSON.stringify(obj).includes(search) && obj);
                return JSON.stringify(obj)
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }).length == 0 && (
                <p className="w-full p-4 font-bold text-xl">{`No match found for '${search}'`}</p>
              )}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}

export default All;
