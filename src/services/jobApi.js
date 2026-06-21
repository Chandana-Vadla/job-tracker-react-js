import axios from "axios";

const BASE_URL =
  "https://job-tracker-api-hbui.onrender.com/jobs";

export const getJobs = () =>
  axios.get(BASE_URL);

export const addJob = (job) =>
  axios.post(BASE_URL, job);

export const deleteJob = (id) =>
  axios.delete(`${BASE_URL}/${id}`);

export const updateJob = (id, job) =>
  axios.put(`${BASE_URL}/${id}`, job);