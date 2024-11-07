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

import AssignProject from "./components/AssignProject";
import { useNavigate } from "react-router-dom";
import { ProjectPagePath } from "@constants/path";
import EmptyBar from "shared/Table/tableEmptyState";
import { capitalize } from "lodash";

const Project = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectData, setProjectData] = useState<IProject>();
  const [assignDrawer, setassignDrawer] = useState(false);
  const { data, isFetching } = useGetProjectQuery(null);

  const tableHead: ITableHead<IProject>[] = [
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
      action: (data: IProject) => {
        setEditModal(true);
        setProjectData(data);
      },
    },
    {
      menuTitle: "Delete",
      action: (data: IProject) => {
        setDeleteModal(true);
        setProjectData(data);
      },
      className: "text-red-500",
    },
    {
      menuTitle: "Assign Project",
      action: (data: IProject) => {
        setassignDrawer(true);
        setProjectData(data);
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
        onRowClick={({ _id }) => {
          navigate(ProjectPagePath.projectDetails(_id));
        }}
        tableLoader={<TableLoading title=" Loading Project" />}
        tableEmptyState={<EmptyBar componentType="project" />}
      />
      {openDrawer && <CreateProject onClose={() => setOpenDrawer(false)} />}
      {editModal && (
        <EditProject
          onClose={() => setEditModal(false)}
          projectData={projectData}
        />
      )}
      {deleteModal && (
        <DeleteProject
          onClose={() => setDeleteModal(false)}
          projectData={projectData}
        />
      )}
      {assignDrawer && (
        <AssignProject
          onClose={() => setassignDrawer(false)}
          projectData={projectData as IProject}
        />
      )}
    </div>
  );
};

export default Project;
