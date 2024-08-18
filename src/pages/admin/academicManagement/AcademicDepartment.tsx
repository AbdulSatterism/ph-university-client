import { Button, Space, Table, TableColumnsType } from "antd";
import { TAcademicDepartment } from "../../../types/academicManagement/academicSemester.type";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/AcademicManagement.api";

type TTableData = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const { data: semesterData, isFetching } =
    useGetAcademicDepartmentsQuery(undefined);

  const tableData = semesterData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Button>Details</Button>
            {/* <Link to={`${item?.key}`}>
           
       </Link> */}
          </Space>
        );
      },
      width: "1%",
    },
  ];
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
