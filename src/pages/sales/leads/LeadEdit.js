/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Edit from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import compose from "recompose/compose";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useAlert } from "react-alert";

import { UpdateJobStatus } from "../../../actions/job";

const styles = theme => ({
  layout: {
    width: "100%",
    display: "block",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.up("md")]: {
      width: "65%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "45%"
    }
  },
  paper: {
    minHeight: "300px",
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: `${theme.spacing.unit}px auto`,
    backgroundColor: theme.palette.secondary.main
  },

  invalidElementError: {
    color: "red"
  },
  button: {
    width: "50%",
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto'
  },
  textField:{
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const editLead = ({ classes, history, location, UpdateJobStatus }) => {

  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const alert = useAlert();

  const [formData, setFormData] = useState({
    client_name: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Name*'
      },
      value: location.state.detail.client_name ? location.state.detail.client_name : '',
      validation: {
        required: true
      },
      valid: location.state.detail.client_name ? true : false,
      touched: location.state.detail.client_name ? true : false,
      message:''
    },  
    location: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Location'
      },
      value:  location.state.detail.location ? location.state.detail.location : '',
      validation: {
        required: false,
      },
      valid: location.state.detail.location ? true : false,
      touched: location.state.detail.location ? true : false,
      message:''
    },
    time_zone: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Time Zone*'
      },
      value:  location.state.detail.time_zone ? location.state.detail.time_zone : '',
      validation: {
          required: true,
      },
      valid: location.state.detail.time_zone ? true : false,
      touched: location.state.detail.time_zone ? true : false,
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
        urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
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
      value:  location.state.detail.call_date ? location.state.detail.call_date : '',
      validation: {
          required: true,
      },
      valid: location.state.detail.call_date ? true: false,
      touched: location.state.detail.call_date ? true: false,
      message:''
    },
    call_time: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Call Time*'
      },
      value: location.state.detail.call_time ? location.state.detail.call_time : '',
      validation: {
        required: true
      },
      valid: location.state.detail.call_time ? true :  false,
      touched: location.state.detail.call_time ? true :  false,
      message:''
    },  
      
    contact_via: {
      elementType: 'select',
      elementConfig:{
          options: [
          {value: 'Phone ', displayValue: 'Phone ' },
          {value: 'Zoom ', displayValue: 'Zoom ' },
          {value: 'GotoMeeting', displayValue: 'GotoMeeting' },
          {value: 'Blue jeans', displayValue: 'Blue jeans' },
          {value: 'Hangouts', displayValue: 'GotoMeeting' },
          {value: 'others', displayValue: 'others' },
         ],
        placeholder: 'Device/App'
      },
      value: location.state.detail.contact_via ? location.state.detail.contact_via : '',
      validation: {
        required: false,
      },
      valid: location.state.detail.contact_via ? true : false,
      touched: location.state.detail.contact_via ? true : false,
      message:''
    },  
    contact_via_detail: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Phone Number / Link'
      },
      value:  location.state.detail.contact_via_detail ? location.state.detail.contact_via_detail : '',
      validation: {
        required: false,
      },
      valid: location.state.detail.contact_via_detail ? true : false,
      touched: location.state.detail.contact_via_detail ? true : false,
      message:''
    },  
    interview_status: {
      elementType: 'select',
      elementConfig:{
        options: [
        {value: 'Sales', displayValue: 'Sales' },
        {value: 'Technical', displayValue: 'Technical' },
        {value: 'Reference', displayValue: 'Reference' }
       ],
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
        options: [
          {value: 'Confirmed', displayValue: 'Confirmed' },
          {value: 'Un-Confirmed', displayValue: 'Un-Confirmed' }
         ],
        placeholder: 'Call Status*'
      },
      value: location.state.detail.call_status ? location.state.detail.call_status : '',
      validation: {
        required: true,
      },
      valid: location.state.detail.call_status ? true : false,
      touched: location.state.detail.call_status ? true : false,
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
        isValid = value.trim() !== '' && isValid;
      if(!isValid){
        message = 'required';
      }
    };
    if(rules.emailReg){
      isValid = rules.emailReg.test(value.trim()) && isValid;
      if(!isValid && message === ''){
       message = 'invalid Email';
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
  updatedElement.value = e.target.value;
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
    const updateData = {
      client_name: formData.client_name.value,
      location: formData.location.value,
      time_zone: formData.time_zone.value,
      gmail_thread: formData.gmail_thread.value,
      call_date: formData.call_date.value,
      call_time: formData.call_time.value,
      contact_via: formData.contact_via.value,
      contact_via_detail: formData.contact_via_detail.value,
      interview_status: formData.interview_status.value,
      call_status: formData.call_status.value
    }
    const res = await UpdateJobStatus(location.state.detail.id, updateData)
    if(res){
      alert.success("Lead updated successfully...!!");
      history.goBack()
    }
    else{
      alert.success("Lead update failed...!!");
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
      <form onSubmit={onSubmitHandler} autoComplete="off">
        {fromElementArray.map( elem => (
          elem.config.elementType === "select" ? (
            <FormControl className={classes.formControl, classes.textField} key={elem.id}>
              <InputLabel id={`${elem.id}-label`}>{elem.config.elementConfig.placeholder}</InputLabel>
                <Select
                  labelId={`${elem.id}-label`}
                  id={elem.id}
                  value={elem.config.value}
                  onChange={(event) => {onChangeHandler(event, elem.id)}}
                  >
                  {elem.config.elementConfig.options.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.displayValue}</MenuItem>
                  ))} 
              </Select>
            </FormControl>
            ): elem.config.elementType === "date" ? 
            (<TextField
              id={elem.id}
              label={elem.config.elementConfig.placeholder}
              type="date"
              onChange={(event) => {onChangeHandler(event, elem.id)}}
              value={elem.config.value}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            ) : (
              <TextField
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
            variant="contained"
            color="primary"
            type="submit"
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
            aria-label="edit"
            onClick={() => history.goBack()}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>
          <Typography align="center" variant="headline">
            Edit Lead
          </Typography>
          {formRender()}
        </Paper>
      </main>
    </React.Fragment>
  );
};

editLead.propTypes = {
  classes: PropTypes.object.isRequired,
  updateLead: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(null, { UpdateJobStatus })
)(editLead);
