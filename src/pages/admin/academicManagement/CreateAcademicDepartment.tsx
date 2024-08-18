import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { TResponse } from "../../../types/global.types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/AcademicManagement.api";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const academicDepartmentName = academicFacultyData?.data?.map((item) => ({
    value: item?.name,
    label: item?.name,
  }));
  const academicDepartmentId = academicFacultyData?.data?.map((item) => ({
    value: item?._id,
    label: item?.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("create academic department....");

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const result = (await addAcademicDepartment(departmentData)) as TResponse;
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
          <PHSelect label="Name" name="name" options={academicDepartmentName} />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicDepartmentId}
          />

          <Button htmlType="submit">Submit </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
