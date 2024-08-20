import MySchedule from "../pages/student/MySchedule";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentOfferedCourse from "../pages/student/StudentOfferedCourse";

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
        name: "Offered Courses",
        path: "student-offered-courses",
        element: <StudentOfferedCourse />,
      },
      {
        name: "My Schedule",
        path: "my-schedule",
        element: <MySchedule />,
      },
    ],
  },
];
