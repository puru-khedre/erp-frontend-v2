import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { All, Home, Login, User, UserForm, Users } from "./pages";

import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout Page={<Home />} />} />

          {/* Admin routes */}
          <Route path="/admin/users" element={<Layout Page={<Users />} />} />
          <Route path="/admin/all" element={<Layout Page={<All />} />} />
          <Route
            path="/admin/users/new"
            element={<Layout Page={<UserForm />} />}
          />
          <Route
            path="/admin/users/user/:id"
            element={<Layout Page={<User />} />}
          />
          <Route
            path="/admin/users/user/:id/edit"
            element={<Layout Page={<UserForm editMode />} />}
          />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// ================================================================================
