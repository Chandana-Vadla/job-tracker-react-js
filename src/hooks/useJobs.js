import { useState,useEffect } from "react";
import { getJobs, deleteJob, addJob,updateJob } from "../services/jobApi";


function useJobs(){

const [jobs, setJobs] = useState([])
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchJobs = async () => {
  try {
    setLoading(true);
    setError(null);
    const response = await getJobs();
    setJobs(response.data);
  } catch (error) {
    console.log(error);
    setError("Failed to fetch jobs.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchJobs();
}, []);

const addJobToServer = async (newJob) => {
  try {
    await addJob(newJob);
    await fetchJobs();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateJobOnServer = async (
  id,
  updatedJob
) => {
  try {
    await updateJob(id, updatedJob);

    await fetchJobs();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteJobFromServer = async (id) => {
    try{
        await deleteJob(id);
        await fetchJobs();
    }catch(error){
        console.log(error);
        throw error
    }
};

return {
    jobs,
    loading,
    error,
    fetchJobs,
    deleteJobFromServer,
    addJobToServer,
    updateJobOnServer
}
}

export default useJobs;