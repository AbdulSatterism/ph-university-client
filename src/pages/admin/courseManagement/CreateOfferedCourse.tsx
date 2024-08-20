/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import PHInput from "../../../components/form/PHInput";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/AcademicManagement.api";
import moment from "moment";
import PHSelect from "../../../components/form/PHSelect";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { weekDaysOptions } from "../../../constant/global";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/CourseManagement.api";

const CreateOfferedCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } =
    useGetAllRegisteredSemesterQuery(undefined);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item: any) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );
  console.log({ semesterRegistrationData });
  const academicFacultyOptions = academicFacultyData?.data?.map(
    (item: any) => ({
      value: item._id,
      label: item.name,
    })
  );

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item: any) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
    value: item._id,
    label: `${item?.name?.firstName} ${item?.name?.middleName} ${item?.name?.lastName}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateOfferedCourse;
