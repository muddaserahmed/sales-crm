/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Table from '../../UI/table';
import Meassage from './../../UI/message';
import { fetchLeads} from '../../../store/actions/lead';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const columns = [
  { id: 'client_name', label: 'Client Name', minWidth: 100, align: 'left' },
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center'},
  { id: 'voice', label: 'Voice', minWidth: 100, align: 'center' },
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
    hover:{
      cursor: 'pointer'
    }
  }));

const voice = ({fetchLeads, leads, leadLoading, history}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [filteredLeads, setFilteredLeads] = useState([]);
  
  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchLeads(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  useEffect(() => {
    let  arr = leads.filter(lead => {
      return(
          (lead.call.call_date !== null && lead.voice !== null) ? lead : null
      )
    })

    if (arr.length) {
      arr.sort((first, second)=>{
        if(new Date(first.call.call_date).getTime() > new Date(second.call.call_date).getTime()){
          return -1
        }
        else if(new Date(first.call.call_date).getTime() === new Date(second.call.call_date).getTime()){
          if(first.call.call_time > second.call.call_time){
            return -1
          }
        }
      })
    }

    setFilteredLeads(arr);  
  }, [JSON.stringify(leads)]);


    return(      
      <Fragment>
        {leadLoading ? <Meassage meassage={'loading'} />: (
          <Table 
          jobs={filteredLeads}
          columns={columns}
          classes={classes}
          tableHeader={'Scheduled Calls'}
          rowClickListener={true}
          history={history} />)
        }
      </Fragment> 
      
    )
}


const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading
});

export default  connect(mapStateToProps, { fetchLeads })(errorHandler(voice));