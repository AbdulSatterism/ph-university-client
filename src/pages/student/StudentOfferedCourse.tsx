import { Button, Col, Row } from "antd";
import { useGetStudentOfferedCourseQuery } from "../../redux/features/student/StudentCourses.api";

const StudentOfferedCourse = () => {
  const { data: offeredCourse } = useGetStudentOfferedCourseQuery(undefined);
  console.log(offeredCourse);
  const singleObj = offeredCourse?.data?.reduce((acc, item) => {
    const key = item?.course?.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };

    acc[key].sections.push({
      section: item?.section,
      _id: item?._id,
      startTime: item?.startTime,
      endTime: item?.endTime,
      days: item?.days,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObj ? singleObj : {});
  console.log(modifiedData);
  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item, i) => {
        return (
          <Col
            key={i}
            span={24}
            style={{ border: "solid #d4d4d4 2px", padding: "10px" }}
          >
            <div style={{ padding: "10px" }}>
              <h2>{item?.courseTitle}</h2>
            </div>
            <div>
              {item?.sections?.map((section, index) => {
                return (
                  <Row
                    key={index}
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section?.section}</Col>
                    <Col span={5}>
                      Days:
                      {section?.days?.map((day) => (
                        <span> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section?.startTime}</Col>
                    <Col span={5}>End Time: {section?.endTime}</Col>
                    <Button>Enroll</Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default StudentOfferedCourse;
