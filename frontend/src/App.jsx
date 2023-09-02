import { Routes, Route } from "react-router-dom";
import {
  Login_Student,
  Sign_Up_Student,
  Roadmaps,
  Sign_Up_Instructor,
  Home,
  Dashboard_Student,
  Settings_Student,
  NotFound,
} from "./pages";
import { Layout } from "./layout";
import { RequireAuth } from "./components";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public path */}
        <Route path="/" element={<Home />} />

        {/* student pages path */}
        <Route path="student">
          <Route path="login" element={<Login_Student />} />
          <Route path="register" element={<Sign_Up_Student />} />
          <Route path="roadmaps" element={<Roadmaps />} />

          {/* protected to students only */}
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard_Student />} />
            <Route path="settings" element={<Settings_Student />} />
            {/* <Route path="/roadmaps/:roadmapid" element={< />} /> */}
          </Route>
        </Route>

        <Route path="instructor">
          <Route path="register" element={<Sign_Up_Instructor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
