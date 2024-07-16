import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/AcademicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement/academicSemester.type";
import { useState } from "react";
import { TQueryParam } from "../../../types/global.types";

type TTableData = Pick<
  TAcademicSemester,
  "year" | "startMonth" | "endMonth" | "name"
>;
const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } = useGetAllSemesterQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, year, startMonth, endMonth, name }) => ({
      key: _id,
      year,
      startMonth,
      endMonth,
      name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
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

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
