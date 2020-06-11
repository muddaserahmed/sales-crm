/* eslint-disable react-hooks/rules-of-hooks */
import 'date-fns';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Edit from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';
import { updateLead } from '../../../store/actions/lead';

const useStyles = makeStyles(theme => ({
  layout: {
    width: '100%',
    display: 'block',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.up('md')]: {
      width: '65%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '45%'
    }
  },
  paper: {
    minHeight: '300px',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: `${theme.spacing()}px auto`,
    backgroundColor: theme.palette.secondary.main
  },

  invalidElementError: {
    color: 'red'
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto'
  },
  textField:{
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  typography: {
    fontFamily: 'initial',
    fontSize: '25px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto' 
  }
}));
const editLead = ({ history, location, updateLead, interviewStatuses, contactViaStatuses }) => {
  const alert = useAlert();
  const classes  = useStyles();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [formData, setFormData] = useState({
    client_name: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Name*'
      },
      value: location.state.detail.job.client.client_name ? location.state.detail.job.client.client_name : '',
      validation: {
        required: true
      },
      valid: location.state.detail.job.client.client_name ? true : false,
      touched: location.state.detail.job.client.client_name ? true : false,
      message:''
    },    
    website: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Company Website'
      },
      value:  location.state.detail.job.client.website ? location.state.detail.job.client.website : '',
      validation: {
        required: false,
        urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;%=.]+$/
      },
      valid: location.state.detail.job.client.website ? true : false,
      touched: location.state.detail.job.client.website ? true : false,
      message:''
    },
    location: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Location'
      },
      value:  location.state.detail.job.client.location ? location.state.detail.job.client.location : '',
      validation: {
        required: false,
      },
      valid: location.state.detail.job.client.location ? true : false,
      touched: location.state.detail.job.client.location ? true : false,
      message:''
    },
    time_zone: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Time Zone*'
      },
      value: location.state.detail.job.client.time_zone ? location.state.detail.job.client.time_zone : '',
      validation: {
          required: true,
      },
      valid: location.state.detail.job.client.time_zone ? true : false,
      touched: location.state.detail.job.client.time_zone ? true : false,
      message:''
    },
    gmail_thread: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Gmail Thread*'
      },
      value: location.state.detail.gmail_thread ? location.state.detail.gmail_thread : '',
      validation: {
        required: true,
        urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;%=.]+$/
      },
      valid: location.state.detail.gmail_thread ? true : false,
      touched: location.state.detail.gmail_thread ? true : false,
      message:''
    },
    call_date: {
      elementType: 'date',
      elementConfig:{
        type: 'text',
        placeholder: 'Call Date*'
      },
      value:  location.state.detail.call.call_date ? new Date(location.state.detail.call.call_date) : new Date(),
      validation: {
          required: true,
      },
      valid:  new Date(location.state.detail.call.call_date) > new Date() ? true : false,
      touched: location.state.detail.call.call_date ? true: false,
      message:''
    },
    call_time: {
      elementType: 'time',
      elementConfig:{
        type: 'time',
        placeholder: 'Call Time*'
      },
      value: location.state.detail.call.call_time ? location.state.detail.call.call_time : '',
      validation: {
        required: true
      },
      valid: location.state.detail.call.call_time ? true :  false,
      touched: location.state.detail.call.call_time ? true :  false,
      message:''
    },  
      
    contact_via: {
      elementType: 'select',
      elementConfig:{
        options: contactViaStatuses,
        placeholder: 'Device/App'
      },
      value: location.state.detail.call.contact_via ? location.state.detail.call.contact_via : '',
      validation: {
        required: false,
      },
      valid: location.state.detail.call.contact_via ? true : false,
      touched: location.state.detail.call.contact_via ? true : false,
      message:''
    },  
    contact_via_detail: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Phone Number / Link'
      },
      value:  location.state.detail.call.contact_via_detail ? location.state.detail.call.contact_via_detail : '',
      validation: {
        required: false,
      },
      valid: location.state.detail.call.contact_via_detail ? true : false,
      touched: location.state.detail.call.contact_via_detail ? true : false,
      message:''
    },  
    contract_status: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Contract Status'
      },
      value:  location.state.detail.contract_status ? location.state.detail.contract_status : '',
      validation: {
        required: false,
      },
      valid: location.state.detail.contract_status ? true : false,
      touched: location.state.detail.contract_status ? true : false,
      message:''
    },  
    interview_status: {
      elementType: 'select',
      elementConfig:{
        options: interviewStatuses,
        placeholder: 'Interview Status*'
      },
      value: location.state.detail.interview_status ? location.state.detail.interview_status : '',
      validation: {
        required: true,
      },
      valid: location.state.detail.interview_status ? true : false,
      touched: location.state.detail.interview_status ? true : false,
      message:''
    }, 
    call_status: {
      elementType: 'select',
      elementConfig:{     
        options: ['Confirmed', 'Un-Confirmed'],
        placeholder: 'Call Status*'
      },
      value: location.state.detail.call.call_status ? location.state.detail.call.call_status : '',
      validation: {
        required: true,
      },
      valid: location.state.detail.call.call_status ? true : false,
      touched: location.state.detail.call.call_status ? true : false,
      message:''
    }
  });
    useEffect(() => {
      checkFormValidity(formData);
    },[])

const validityCheck = (value, rules) => {
  let isValid = true;
  let message = '';
  if(rules){
    if(rules.required){
      isValid = String(value).trim() !== '' && isValid;
      if(!isValid){
        message = 'required';
      }
    }; 
    if(rules.urlReg){
      isValid = rules.urlReg.test(value.trim()) && isValid;
      if(!isValid && message === ''){
        message = 'invalid url';
      }
    };
    if(!rules.required && value.trim() < 1){
      isValid = true;
      message = '';
    }; 
  };
  return {isValid, message};
}
const checkFormValidity = (form) => {
  let formIsValid = true;
  for (let elemIdentifier in form){
    if(form[elemIdentifier].touched || form[elemIdentifier].validation.required){
      formIsValid = form[elemIdentifier].valid && formIsValid;
    }   
  }
  setFromIsInvalid(!formIsValid);
}
const onChangeHandler = (e, elementIdentifier) => {
  const updatedForm = {
    ...formData
  }
  const updatedElement = {
    ...updatedForm[elementIdentifier]
  }
  if(elementIdentifier === 'call_date'){
    updatedElement.value =  e;
  }
  else{
    updatedElement.value = e.target.value;
  }
  const res = validityCheck(updatedElement.value, updatedElement.validation);
  updatedElement.valid = res.isValid;
  updatedElement.message = res.message;
  updatedElement.touched = true;
  updatedForm[elementIdentifier] = updatedElement;
  setFormData(updatedForm);
  checkFormValidity(updatedForm);
}

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const date =  formData.call_date.value.getFullYear() + '-' +
                  Number(formData.call_date.value.getMonth()+ 1) + '-' +
                  formData.call_date.value.getDate();
    const LeadData = {
      gmail_thread: formData.gmail_thread.value,
      interview_status: formData.interview_status.value,
      contract_status : formData.contract_status.value
    }
    const callData = {
      call_date: date,
      call_time: formData.call_time.value,
      contact_via: formData.contact_via.value,
      contact_via_detail: formData.contact_via_detail.value,
      call_status: formData.call_status.value
    }
    const clientData = {
      time_zone: formData.time_zone.value,
      client_name: formData.client_name.value,
      location: formData.location.value,
      website: formData.website.value,
    }
    const query = {
      lead_id: location.state.detail.id,
      client_id: location.state.detail.job.client.id,
      call_id: location.state.detail.call.id
    }
    const res = await updateLead(query, LeadData, callData, clientData);
    if(res){
      alert.success('Lead updated successfully...!!');
      history.goBack();
    }
    else{
      alert.success('Lead update failed...!!');
    }
  };
  const formRender = () => {
    const fromElementArray = [];
    for (let key in formData){
      fromElementArray.push({
          id: key,
          config: formData[key]
      });
    };
    let form = (
      <form onSubmit={onSubmitHandler} autoComplete='off'>
        {fromElementArray.map( elem => (
          elem.config.elementType === 'select' ? (
            <FormControl className={classes.formControl, classes.textField} key={elem.id}>
              <InputLabel id={`${elem.id}-label`}>{elem.config.elementConfig.placeholder}</InputLabel>
                <Select
                  labelId={`${elem.id}-label`}
                  id={elem.id}
                  value={elem.config.value}
                  onChange={(event) => {onChangeHandler(event, elem.id)}}
                  >
                  {elem.config.elementConfig.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))} 
              </Select>
            </FormControl>
            ) : elem.config.elementType === 'date' ? (
            <MuiPickersUtilsProvider utils={DateFnsUtils} key={elem.id}>
              <KeyboardDatePicker
                id={elem.id}
                label={elem.config.elementConfig.placeholder}
                variant="inline"
                format="yyyy/MM/dd"
                className={classes.textField}
                value={elem.config.value}
                minDate={new Date()}
                onChange={(event) => {onChangeHandler(event, elem.id)}}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
             </MuiPickersUtilsProvider> ) : (
              <TextField
                key={elem.id}
                className={classes.textField}
                error = {!elem.config.valid && elem.config.touched}
                id={elem.id}
                label={elem.config.elementConfig.placeholder}
                type={elem.config.elementConfig.type}
                value={elem.config.value}
                onChange={(event) => {onChangeHandler(event, elem.id)}}
                helperText={elem.config.message}/>      
              )
          ))}
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.button}
            disabled={fromIsInvalid}>
            Update Lead
          </Button>
      </form>
      );
    return form;
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton 
            aria-label='edit'
            onClick={() => history.goBack()}>
            <ArrowBackIcon fontSize='large' />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>
          <Typography 
            className={classes.typography} >
            Edit Lead
          </Typography>
          {formRender()}
        </Paper>
      </main>
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  interviewStatuses : state.SelectOptions.interviewStatus,
  contactViaStatuses : state.SelectOptions.contactViaStatus,
})

export default connect(mapStateToProps, { updateLead })(errorHandler(editLead));
