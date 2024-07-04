import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Student ",
    children: [
      {
        name: "Profile",
        path: "student-profile",
        element: <StudentDashboard />,
      },
    ],
  },
];
