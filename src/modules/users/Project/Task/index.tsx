import { useState } from "react";

import PageHeader from "shared/PageHeader";
import Table from "shared/Table";
import EmptyBar from "shared/Table/tableEmptyState";
import CreateTask from "./components/CreateTask";
import { useParams } from "react-router-dom";
import { useGetAllProjectTaskQuery } from "@services/project.service";
import { ITask } from "@services/interfaces/response/project";
import { ITableHead } from "shared/Table/interface";
import {  formatDate } from "@utils/constant";
import TableLoading from "shared/tableLoading";
import EditTask from "./components/EditTask";
import DeleteTask from "./components/DeleteTask";
import { capitalize } from "lodash";

const Task = () => {
  const { projectId } = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [task, setTask] = useState<ITask>();
  const { data, isFetching } = useGetAllProjectTaskQuery(projectId as string);

  const tableHead: ITableHead<ITask>[] = [
    {
      label: "Name",
      accessor: "name",
      render: ({ name }) => {
        return capitalize(name);
      },
    },
    {
      label: "Description",
      accessor: "description",
      render: ({ description }) => {
        return capitalize(description);
      },
    },

    {
      label: "Assigned To",
      accessor: "assignedUser",
      render: ({ assignedUser }) => {
        return capitalize(assignedUser?.name || "--");
      },
    },
    {
      label: "Date Created",
      accessor: "dateCreated",
      render: ({ dateCreated }) => {
        return !dateCreated
          ? "--"
          : formatDate({ date: dateCreated, time: true });
      },
    },
    {
      label: "Status",
      accessor: "status",
    },
  ];

  const menu = [
    {
      menuTitle: "Edit",
      action: (data: ITask) => {
        setTask(data);
        setOpenEditModal(true);
      },
    },
    {
      menuTitle: "Delete",
      className: "text-red-500",
      action: (data: ITask) => {
        setTask(data);
        setOpenDeleteModal(true);
      },
    },
  ];
  return (
    <>
      <div className="grid gap-y-4">
        <PageHeader
          title="Task"
          actions={<div onClick={() => setOpenDrawer(true)}> Add Task</div>}
        />
        <Table<ITask>
          tableHeads={tableHead}
          dataTableSource={data?.data?.tasks || []}
          loading={isFetching}
          showMenu
          menuOptions={menu}
          tableEmptyState={<EmptyBar componentType="task" />}
          tableLoader={<TableLoading title=" Loading Task" />}
        />
      </div>
      {openDrawer && <CreateTask onClose={() => setOpenDrawer(false)} />}
      {openEditModal && (
        <EditTask
          onClose={() => setOpenEditModal(false)}
          task={task as ITask}
        />
      )}
      {openDeleteModal && (
        <DeleteTask
          onClose={() => setOpenDeleteModal(false)}
          task={task as ITask}
        />
      )}
    </>
  );
};

export default Task;
