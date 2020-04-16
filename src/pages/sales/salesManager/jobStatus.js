/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import Table from './../../table';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'url', label: 'Job Link URL', minWidth: 170, align: 'center' },
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: 'job_title', label: 'Job Title', minWidth: 170, align: 'center' }
];
  
const useStyles = makeStyles(theme => ({
  root:{
    width: '100%'
  },
  tableWrapper: {
    overflow: 'auto'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  jobHeader: {
    textAlign: 'center',
    fontFamily: 'initial',
    color: 'blue'
  },  
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: '12px',
    marginRight: '22px',
    width: '100%'
  }
}));

const jobStatus = () => {
  const classes = useStyles();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobStatus, setJobStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
      setLoading(true);
    try {
      const jobs =  await axios.get ( BASE_URL + '/api/appliedjob/leads');
      setJobs(jobs.data.appliedJobs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleJobStatusChange = (status) => {
    setJobStatus(status);
    let arr = jobs.filter(job => {
      return(
        job.lead_status === status ? job : null
      )
    })
    setFilteredJobs(arr);
  };
  
  return( 
    <Fragment>
      {
        loading ? <p> Loading...!!!</p> : 
      (<div><FormControl className={classes.formControl}>
        <InputLabel id='job-select-label'>Job Status</InputLabel>
        <Select
          labelId='job-select-label'
          id='job-select'
          value= {jobStatus}
          onChange={(event) => {handleJobStatusChange(event.target.value)}}>
          <MenuItem value='garbage'>Garbage</MenuItem>
          <MenuItem value='recruiter'>recruiter</MenuItem>
          <MenuItem value='in-house'>In-house</MenuItem>
          <MenuItem value='rejected by client'>Rejected by client</MenuItem>
        </Select>
      </FormControl>
      {jobStatus === null ? (
        <p style={{color:'red'}}> Please select a job Status first.</p>):  
        filteredJobs.length >= 1 ? (
          <Table 
            // history={history}
            jobs={filteredJobs}
            columns={columns}
            classes={classes}
            tableHeader={'Jobs'} />
        ): <p> No Job with the selected status </p>}
        </div>)
      }
    </Fragment>
  )//end of return
};

export default jobStatus;