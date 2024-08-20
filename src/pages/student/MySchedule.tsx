import { Col, Row } from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/StudentCourses.api";

const MySchedule = () => {
  const { data } = useGetMyEnrolledCoursesQuery(undefined);

  return (
    <Row gutter={[0, 20]}>
      {data?.data?.map((item) => {
        return (
          <Col
            span={24}
            style={{ border: "solid #d4d4d4 2px", padding: "10px" }}
          >
            <div style={{ padding: "10px" }}>
              <h2>{item?.course?.title}</h2>
            </div>

            <Row
              justify="space-between"
              align="middle"
              style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
            >
              <Col>Section :{item?.offeredCourse?.section}</Col>
              <Col>Start Time :{item?.offeredCourse?.startTime}</Col>
              <Col>End Time :{item?.offeredCourse?.endTime}</Col>
              <Col>
                {item?.offeredCourse?.days?.map((day) => (
                  <span> {day} </span>
                ))}
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};

export default MySchedule;
