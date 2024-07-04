import FacultyDashboard from "../pages/faculty/FacultyDashboard";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Faculty ",
    children: [
      {
        name: "Profile",
        path: "faculty-profile",
        element: <FacultyDashboard />,
      },
    ],
  },
];
