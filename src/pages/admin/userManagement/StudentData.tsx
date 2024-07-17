import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParam } from "../../../types/global.types";
import { TStudent } from "../../../types/userMnamagement/userManagement.type";
import { useGetAllStudentQuery } from "../../../redux/features/admin/UserManagement.api";
import { useState } from "react";
import { Link } from "react-router-dom";

type TTableData = Pick<TStudent, "id" | "fullName">;
const StudentData = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: studentData, isFetching } = useGetAllStudentQuery([
    { name: "limit", value: 2 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const tableData = studentData?.data?.map(({ _id, id, fullName }) => ({
    key: _id,
    id,
    fullName,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra?.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParams(queryParams);
    }
  };

  const metaData = studentData?.meta;

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
