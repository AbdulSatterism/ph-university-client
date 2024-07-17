import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <p>this is details {studentId}</p>
    </div>
  );
};

export default StudentDetails;
