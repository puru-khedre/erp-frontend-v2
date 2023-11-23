import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const NewUsers = ({ editMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone_no_1: "",
    phone_no_2: "",
    blood_group: "",
    adhar_number: "",
    driving_license: "",
    date_of_birth: "",
    father_name: "",
    mother_name: "",
    emergency_contact_person: "",
    emergency_contact_person_mobile: "",
    password: "",
    confirm_password: "",
    PropertyImages: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      console.log(files[0]);
      setFormData({
        ...formData,
        [name]: files[0], // Use files[0] to get the first file from the array
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.error) {
          console.error(result.error);
        } else {
          alert("Registration Successful");
          console.log(result);
          setFormData({
            name: "",
            department: "",
            designation: "",
            address: "",
            city: "",
            state: "",
            email: "",
            phone_no_1: "",
            phone_no_2: "",
            blood_group: "",
            adhar_number: "",
            driving_license: "",
            date_of_birth: "",
            father_name: "",
            mother_name: "",
            emergency_contact_person: "",
            emergency_contact_person_mobile: "",
            password: "",
            confirm_password: "",
            PropertyImages: null,
          });
          navigate("/admin/users");
        }
      } else {
        console.error("HTTP error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/${id}`);

        if (res.ok) {
          const { result } = await res.json();
          if (result) return result;
          else throw new Error("Something went wrong");
        } else {
          console.error("Something went wrong");
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (editMode) {
      fetchUserData()
        .then((data) => {
          console.log(data);
          data.password = "";
          data.confirm_password = "";
          setFormData(data);
        })
        .catch((err) => {
          navigate("/admin/users");
        });
    }
  }, [editMode]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User data updated successfully");
        navigate("/admin/users");
        // Optionally, you can redirect the user or perform other actions
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Paper
      elevation={2}
      className="w-full p-4 !rounded-lg sm:sticky top-24 md:top-8"
    >
      <Typography variant="h5" gutterBottom marginBottom={"20px"}>
        {editMode ? "Edit registered user details" : "New user registration"}
      </Typography>
      <form onSubmit={(e) => (editMode ? handleEdit(e) : handleSubmit(e))}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              placeholder="Enter your Name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="confirm_password"
              name="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder=""
              fullWidth
              variant="outlined"
              value={formData.confirm_password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone_no_1"
              name="phone_no_1"
              label="Phone 1"
              type="tel"
              fullWidth
              variant="outlined"
              value={formData.phone_no_1}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone_no_2"
              name="phone_no_2"
              label="Phone 2"
              type="tel"
              fullWidth
              variant="outlined"
              value={formData.phone_no_2}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="department"
              name="department"
              label="Department Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.department}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="designation"
              name="designation"
              fullWidth
              select
              label="Designation"
              defaultValue={"two"}
              value={formData.designation}
              onChange={handleInputChange}
            >
              <MenuItem value="one">one</MenuItem>
              <MenuItem value="two">two</MenuItem>
              <MenuItem value="three">three</MenuItem>
              <MenuItem value="four">four</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address line"
              fullWidth
              autoComplete="address-line1"
              variant="outlined"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="outlined"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              label="State"
              fullWidth
              variant="outlined"
              value={formData.state}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              type="text"
              id="adhar_number"
              name="adhar_number"
              label="Aadhar Number"
              fullWidth
              variant="outlined"
              value={formData.adhar_number}
              onChange={handleInputChange}
              inputProps={{ maxLength: 12, pattern: "\\d*" }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="text"
              id="driving_license"
              name="driving_license"
              label="Driving License"
              fullWidth
              variant="outlined"
              value={formData.driving_license}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="!w-full"
                format="DD-MM-YYYY"
                onChange={(val) => {
                  console.log(JSON.stringify(val));
                  if (JSON.stringify(val) != "null") {
                    const d = new Date(val);
                    setFormData((prev) => ({
                      ...prev,
                      date_of_birth: d.toISOString(),
                    }));
                  }
                }}
                value={dayjs(formData.date_of_birth)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="blood_group"
              name="blood_group"
              label="Blood Group"
              fullWidth
              variant="outlined"
              value={formData.blood_group}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="father_name"
              name="father_name"
              label="Father Name"
              fullWidth
              variant="outlined"
              value={formData.father_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="mother_name"
              name="mother_name"
              label="Mother Name"
              fullWidth
              variant="outlined"
              value={formData.mother_name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="emergency_contact_person"
              name="emergency_contact_person"
              label="Emergency Contact Person"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.emergency_contact_person}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="emergency_contact_person_mobile"
              name="emergency_contact_person_mobile"
              label="Emergency Contact Number"
              type="tel"
              fullWidth
              variant="outlined"
              value={formData.emergency_contact_person_mobile}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              type="file"
              name="property_images"
              id="property_images"
              onChange={handleInputChange}
              inputProps={{ accept: "image/*" }}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <Button variant="contained" size="medium" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewUsers;
