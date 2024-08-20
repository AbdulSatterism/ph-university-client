import FacultyCourses from "../pages/faculty/FacultyCourses";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyStudents from "../pages/faculty/MyStudents";

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
        name: "Faculty Courses",
        path: "faculty-courses",
        element: <FacultyCourses />,
      },
      {
        path: "courses/:registerSemesterId/:courseId",
        element: <MyStudents />,
      },
    ],
  },
];
