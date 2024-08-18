import { Button, Space, Table, TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/AcademicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement/academicSemester.type";

type TTableData = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
  const { data: semesterData, isFetching } =
    useGetAcademicFacultiesQuery(undefined);

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

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra?.action === "filter") {
  //     const queryParams: TQueryParam[] = [];
  //     filters?.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };

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

export default AcademicFaculty;
