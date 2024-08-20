/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import {
  useAssignFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/CourseManagement.api";
import { TCourse } from "../../../types/courseManagement.type";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/UserManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(
    ({ _id, title, prefix, code }: TCourse) => ({
      key: _id,
      title,
      code: `${prefix}${code}`,
    })
  );

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }: { facultyInfo: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultyQuery(undefined);
  const [assignFaculty] = useAssignFacultiesMutation();

  console.log({ facultiesData });
  const facultiesOption = facultiesData?.data?.map((item: any) => ({
    value: item._id,
    label: `${item.name.firstName} ${item.name.lastName}`,
  }));

  const handleSubmit = (data: any) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    console.log(facultyData);

    assignFaculty(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
