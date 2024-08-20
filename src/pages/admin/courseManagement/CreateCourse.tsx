/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCoursesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/CourseManagement.api";
import { TResponse } from "../../../types/global.types";

const CreateCourse = () => {
  const [addCourse] = useAddCoursesMutation();
  const { data: courseData } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courseData?.data?.map((item: any) => ({
    value: item?._id,
    label: item?.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("semester creating....");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: string) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const result = (await addCourse(courseData)) as TResponse<any>;
      console.log(result);
      if (result?.error) {
        toast.error(result?.error?.data?.message, { id: toastId });
      } else {
        toast.error(result?.data?.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" label="Title" name="title" />
          <PHInput type="text" label="Prefix" name="prefix" />
          <PHInput type="text" label="Code" name="code" />
          <PHInput type="text" label="Credits" name="credits" />

          <PHSelect
            mode="multiple"
            label="PreRequisite Courses"
            name="preRequisiteCourses"
            options={preRequisiteCoursesOptions}
          />

          <Button htmlType="submit">Submit </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
