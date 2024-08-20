/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";

import {
  useGetAllRegisteredSemesterQuery,
  useUpdateSemesterRegistrationStatusMutation,
} from "../../../redux/features/admin/CourseManagement.api";
import { TSemester } from "../../../types/courseManagement.type";
import moment from "moment";
import { useState } from "react";

type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const Semesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemesterQuery(undefined);
  const [updateSemesterStatus, { isLoading }] =
    useUpdateSemesterRegistrationStatusMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }: TSemester) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusUpdate = (data: any) => {
    const updateSemesterData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateSemesterData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Data",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button
              disabled={isLoading}
              onClick={() => setSemesterId(item.key)}
            >
              update
            </Button>
          </Dropdown>
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
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

export default Semesters;
