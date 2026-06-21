import "./JobCard.css"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import  Stack  from "@mui/material/Stack";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Chip from "@mui/material/Chip";

function JobCard({ job, onDelete, onEdit }) {

const [open, setOpen] = useState(false);

const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "info";

    case "Interview":
      return "warning";

    case "Selected":
      return "success";

    case "Rejected":
      return "error";

    default:
      return "default";
  }
};

  return (
    <Card
  sx={{
    mb: 2,
    boxShadow: 3,
    borderRadius: 2,
  }}
>
      <CardContent>
      <Typography
  variant="h6"
  sx={{
    fontWeight: "bold",
    textTransform: "capitalize",
  }}
>{job.company}</Typography>
      <Typography variant="body1" >{job.role}</Typography>
     <Chip
  label={job.status}
  color={getStatusColor(job.status)}
  sx={{ mt: 1 }}
/>

<Stack direction="row" spacing={2} sx={{mt:2, width:"100%", justifyContent:"center"}}>

    <Button sx={{fontSize:"12px", fontWeight:"bold"}}  variant="contained" color="secondary"
    onClick={() => onEdit(job)}> 
    Edit
    </Button>

      <Button  variant="contained" color="error"
        onClick={()=> setOpen(true)
       } >
        Delete
      </Button>
      </Stack>

      <Dialog
  open={open}
  onClose={() => setOpen(false)}
>
  <DialogTitle>
    Delete Job
  </DialogTitle>

  <DialogContent>
    Are you sure you want to delete {job.company}?
  </DialogContent>

  <DialogActions>

    <Button
      onClick={() => setOpen(false)}
    >
      Cancel
    </Button>

    <Button
      color="error"
      onClick={async() => {
        try{
        await onDelete(job.id);
        setOpen(false);
        }catch(error){
          console.log(error)
        }
       
      }}
    >
      Delete
    </Button>

  </DialogActions>
</Dialog>



      </CardContent>
      
    </Card>
  );
}

export default JobCard;