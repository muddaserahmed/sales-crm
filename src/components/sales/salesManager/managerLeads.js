/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { makeStyles } from '@material-ui/styles';

import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';
import { fetchLeads, updateLead } from '../../../store/actions/lead';
import { fetchProfiles } from './../../../store/actions/profile';
import TopOptionsSelector from '../../UI/topOptionsSelector';
import Meassage from './../../UI/message';
import Table from '../../UI/table';
  
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
    textField: {
      marginTop: '12px',
      marginRight: '22px',
      width: '100%'
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
  }));

const managerJobLinks = ({leadStatuses, fetchProfiles, fetchLeads, updateLead, leads, profiles, leadLoading, history}) => {
  const alert = useAlert();
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'client_name', label: 'Client Name', minWidth: 170 },
    { id: 'gmail_thread', label: 'Gmail Thread', minWidth: 170 }, 
    { id: 'onChangeList', label: 'Lead Status', minWidth: 100, align: 'center', 
      placeholder: 'Status', for: 'status' , listItems: leadStatuses},
    { id: 'editButton', label: 'Add Test Details', minWidth: 100, align: 'center', editPath:'/add_test' },
    { id: 'editButton', label: 'Add Lead Details', minWidth: 100, align: 'center',  editPath:'/lead_edit' }
  ];

  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchProfiles();
      fetchLeads(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  useEffect(() => {
    if(selectedProfile){
      handleProfileChange(selectedProfile)
    }
  }, [leads.length]);

  const handleProfileChange = (profile_id) => {
    setSelectedProfile(profile_id)
    let arr = leads.filter(lead => {
      return(
        lead.profile_id ===  profile_id ? lead : null
      )
    })
   setFilteredLeads(arr);
  };


  const leadStatusChangeHandler = async(lead_id, lead_status, previousStatus) => {
    const data = {
      status: lead_status
    }
    const res = await updateLead({lead_id:lead_id}, data, null, null, false, previousStatus);
    if(res){
      alert.success('Lead updated successfully...!!');
    }
    else{
      alert.success('Lead update failed...!!');
    }
  }
  return(
    <Fragment>
  {leadLoading === true ? <Meassage meassage={'loading'} /> : (
        <div>
          <TopOptionsSelector 
            selectChangeHandler={handleProfileChange}
            options={profiles}
            config={'Profile'}
            meassage={ selectedProfile === null ? 'Please select a profile first' : null}
          />
          {selectedProfile !== null ? filteredLeads.length >= 1 ? (
            <Table 
            jobs={filteredLeads}
            columns={columns}
            classes={classes}
            tableHeader={'Leads'}
            onUpdateHandler={leadStatusChangeHandler}
            history={history}/>
          ): <Meassage meassage={'No more leads for the selected profile'} /> : null }
      </div>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading,
  profiles: state.ProfileReducer.profiles,
  leadStatuses : state.SelectOptions.leadStatus
});

export default  connect(mapStateToProps,
   { fetchLeads, updateLead, fetchProfiles })(errorHandler(managerJobLinks));