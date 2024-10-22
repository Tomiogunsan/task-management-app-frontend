import * as yup from "yup";

export const createProjectSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

export const addTeamSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Name is required"),
});