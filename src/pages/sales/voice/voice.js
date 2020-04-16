/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import Table from '../../table';
import { fetchLeads} from '../../../actions/lead';

const columns = [
  { id: 'client_name', label: 'Client Name', minWidth: 100, align: 'left' },
    { id: 'profile', label: 'Profile', minWidth: 170, align: 'center'},
    { id: 'call_time', label: 'Call Time', minWidth: 100, align: 'center' },
    { id: 'call_date', label: 'Call Date', minWidth: 100, align: 'center' },
    { id: 'interview_status', label: 'Interview Status', minWidth: 100, align: 'center' }
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
    },
  }));

const voice = ({fetchLeads, leads, leadLoading, history}) => {
  const classes = useStyles();
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
      let  arr = leads.filter(lead => {
        return(
            lead.call.call_date !== null ? lead : null
        )
      })
      setFilteredLeads(arr);  
    }, [leads.length]);


    return(      
      <Fragment>
      {
        leadLoading ? <p> Loading </p>: 
        (
          <Table 
          jobs={filteredLeads}
          columns={columns}
          classes={classes}
          tableHeader={'Scheduled Calls'}
          rowClickListener={true}
          history={history}
        /> )
      }
    </Fragment> 
      
    )
}


const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading
});

export default  connect(mapStateToProps, { fetchLeads })(voice);