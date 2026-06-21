import { useState } from "react";
import useJobs from "./hooks/useJobs";
import JobCard from "./components/JobCard";
import "./App.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

function App() {

  const [job, setJob] = useState({
  company: "",
  role: "",
  status: "",
});

const [editId, setEditId] = useState(null);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

const showSnackbar = (
  message,
  severity = "success"
) => {
  setSnackbar({
    open: true,
    message,
    severity,
  });
};

const {
  jobs,
  loading,
  error,
  fetchJobs,
  deleteJobFromServer,
  addJobToServer,
  updateJobOnServer
} = useJobs();


const handleAddJob =async () => {
  //check empty input
  if (!job.company || !job.role || !job.status) {
showSnackbar(
  "Please fill all fields",
  "warning"
);    return;
  }

  if (editId !== null) {
   
    try {
  await updateJobOnServer(
    editId,
    {
      id: editId,
      ...job,
    }
  );

  showSnackbar("Job updated successfully!");
  setEditId(null);
} catch {
  showSnackbar(
    "Failed to update job",
    "error"
  );
}
  } else {
    //add new job
    const newJob = {
  id: crypto.randomUUID(),
  ...job
  
};
   try {
  await addJobToServer(newJob);
showSnackbar("Job added successfully!")
} catch (error) {
  console.log(error);
showSnackbar("Something went wrong!","error")
}

  }

  //clear the form
  setJob({
    company: "",
    role: "",
    status: "",
  });
};



const handleEdit = (jobToEdit) => {
  setJob({
    company: jobToEdit.company,
    role: jobToEdit.role,
    status: jobToEdit.status,
  });

  setEditId(jobToEdit.id);
};

const handleDelete = async (id) => {
  try {
    await deleteJobFromServer(id);
    showSnackbar("Job deleted successfully!")
  } catch{
   showSnackbar(
  "Failed to delete job",
  "error"
);
  }
};

const filteredJobs= jobs.filter((currentJob)=>{

  const matchesCompany= currentJob.company.toLowerCase().includes(search.toLowerCase())

  const matchesStatus = statusFilter==="All" || currentJob.status===statusFilter

  return matchesCompany && matchesStatus
})

if (loading) {
    return <CircularProgress />;
}

if (error) {
  return (
    <div>
      <h2>{error}</h2>

      <Button variant="contained" color="primary"
       onClick={fetchJobs}>
        Retry
      </Button>
    </div>
  );
}

  return (
     <Container maxWidth="sm">
    <div className="app">
      
      <Typography
  variant="h3"
  align="center"
  gutterBottom
>
  Job Tracker
</Typography>

<Typography
  variant="subtitle1"
  color="text.secondary"
  align="center"
  sx={{ mb: 4 }}
>
  Track your job applications efficiently
</Typography>

    <Stack sx={{mb:2}} spacing={2} className="form-section">
     <TextField
     fullWidth
     label="Company"
  value={job.company}
  onChange={(event) =>
    setJob({
      ...job,
      company: event.target.value,
    })
  }
/>


      <TextField
      fullWidth
    value={job.role}
    label="Role"
    onChange={(event) =>
    setJob({
      ...job,
      role: event.target.value,
    })
  }
/>

<Select
fullWidth
 displayEmpty
  value={job.status}
  onChange={(event) =>
    setJob({
      ...job,
      status: event.target.value,
    })
  }
>
  <MenuItem value="">
    Select Status
  </MenuItem>

  <MenuItem value="Applied">
    Applied
  </MenuItem>

  <MenuItem value="Interview">
    Interview
  </MenuItem>

  <MenuItem value="Selected">
    Selected
  </MenuItem>

  <MenuItem value="Rejected">
    Rejected
  </MenuItem>
</Select>

<Button 
fullWidth
disabled={!job.company || !job.role || !job.status}
variant="contained"
color="primary"
 onClick={handleAddJob}>
  {editId !== null
    ? "Update Job"
    : "Add Job"}
</Button>   
</Stack>

<Stack
  direction="row"
  spacing={2}
  sx={{ mb: 3 }}
>
  <TextField
  size="small"
    sx={{ flex: 1 }}
    placeholder="Search company"
    value={search}
    onChange={(event) =>
      setSearch(event.target.value)
    }
  />

  <Select
  size="small"
    sx={{ width: 150 }}
    value={statusFilter}
    onChange={(event) =>
      setStatusFilter(event.target.value)
    }
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="Applied">Applied</MenuItem>
    <MenuItem value="Interview">Interview</MenuItem>
    <MenuItem value="Selected">Selected</MenuItem>
    <MenuItem value="Rejected">Rejected</MenuItem>
  </Select>
</Stack>


{/* Render Jobs */}
<Box sx={{ mt: 3 }}>
  {filteredJobs.length === 0 ? (
  <Box
    sx={{
      textAlign: "center",
      py: 4,
    }}
  >
    <Typography
      variant="h6"
      color="text.secondary"
    >
      No jobs found
    </Typography>
  </Box>
) :
  filteredJobs.map((job) => (
    <JobCard
      key={job.id}
      job={job}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  ))
}
</Box>


<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() =>
    setSnackbar((prev) => ({
  ...prev,
  open: false,
}))
  }
>
  <Alert
    severity={snackbar.severity}
    onClose={() =>
     setSnackbar((prev) => ({
  ...prev,
  open: false,
}))
    }
  >
    {snackbar.message}
  </Alert>
</Snackbar>
    </div>
    </Container>
  );
}

export default App;