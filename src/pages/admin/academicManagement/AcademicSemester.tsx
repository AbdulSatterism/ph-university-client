import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/AcademicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemesterQuery(undefined);
  console.log("data from semester", data);
  return (
    <div>
      <h1>academic semester here</h1>
    </div>
  );
};

export default AcademicSemester;
