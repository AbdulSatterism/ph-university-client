/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOption } from "../../../constant/semesterOptions";
import { toast } from "sonner";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/AcademicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/CourseManagement.api";
import { TResponse } from "../../../types/global.types";

const CreateSemesterRegistration = () => {
  const [addSemester] = useAddSemesterRegistrationMutation();
  const { data: academicSemesterData } = useGetAllSemesterQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOption = academicSemesterData?.data?.map(
    (item: any) => ({
      value: item?._id,
      label: `${item?.name} ${item?.year}`,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("semester creating....");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const result = (await addSemester(semesterData)) as TResponse<any>;
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
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOption}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOption}
          />
          <PHInput type="number" name="minCredit" label="Min Credit" />
          <PHInput type="number" name="maxCredit" label="Max Credit" />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />

          <Button htmlType="submit">Submit </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateSemesterRegistration;
