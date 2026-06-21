import jobs from "../data/jobs";

function Dashboard() {
  return (
    <div>
      <h2>Job Applications</h2>

      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.company}</h3>
          <p>{job.role}</p>
          <p>{job.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;