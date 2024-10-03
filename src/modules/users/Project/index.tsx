import { IProject } from "@services/interfaces/response/project";
import { useGetProjectQuery } from "@services/project.service";
import { formatDate } from "@utils/constant";
import { useState } from "react";

import PageHeader from "shared/PageHeader";
import Table from "shared/Table";
import { ITableHead } from "shared/Table/interface";
import TableLoading from "shared/tableLoading";
import CreateProject from "./components/CreateProject";
import EditProject from "./components/EditProject";
import DeleteProject from "./components/DeleteProject";

const Project = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { data, isFetching } = useGetProjectQuery(null);
  const tableHead: ITableHead<IProject>[] = [
    {
      label: "Name",
      accessor: "name",
    },
    {
      label: "Description",
      accessor: "description",
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
  ];

  const menu = [
    {
      menuTitle: "Edit",
      action: () => {
        setEditModal(true);
      },
    },
    {
      menuTitle: "Delete",
      action: () => {
        setDeleteModal(true);
      },
    },
  ];

  return (
    <div className=" grid gap-y-8 pt-4">
      <PageHeader
        title="Project"
        actions={<div onClick={() => setOpenDrawer(true)}>Add Project</div>}
      />
      <Table
        dataTableSource={data?.data?.project || []}
        tableHeads={tableHead}
        loading={isFetching}
        showMenu
        menuOptions={menu}
        tableLoader={<TableLoading title=" Loading Project" />}
      />
      {openDrawer && <CreateProject onClose={() => setOpenDrawer(false)} />}
      {editModal && <EditProject onClose={() => setEditModal(false)} />}
      {deleteModal && <DeleteProject onClose={() => setDeleteModal(false)} />}
    </div>
  );
};

export default Project;
