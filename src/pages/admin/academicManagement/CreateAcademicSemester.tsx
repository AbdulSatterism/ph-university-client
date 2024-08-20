/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constant/semesterOptions";
import { monthOptions } from "../../../constant/global";
import { yearOptions } from "../../../constant/yearOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicSemesterSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/AcademicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.types";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("semester creating....");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name: name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const result = (await addAcademicSemester(
        semesterData
      )) as TResponse<any>;
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
        <PHForm
          resolver={zodResolver(academicSemesterSchema)}
          onSubmit={onSubmit}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
