/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useAlert } from 'react-alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import axios from './../../../axios-order'
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const agendaForm = ({ classes, call_id, callStatus, voice, editable, updateNotes, interviewStatus}) => {
  const alert = useAlert();
  const didMountRef = useRef(false)
  const [notes, setNotes] = useState('');
  const [agenda, setAgenda] = useState({});
  const [loading, setLoading] = useState(false);
  const [agendaExists, setAgendaExists] = useState(false);
  const [fromIsInvalid, setFromIsInvalid] = useState(false);
  const [formData, setFormData] = useState({
    remote: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Ok with remote?'
      },
      value: '',
      validation: {
        required: true
      },
      valid: true,
      touched: true,
      message:''
    },
    relocation: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Firm on relocation?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true ,
        touched: true ,
        message:''
      },
      contract: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'W2/W9?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        message:''
      },
      work_type: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Type of work?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        message:''
      },
      compensation: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Compensation?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        message:''
      },
      project_type: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Type of project?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true,
        touched: true,
        message:''
      },
  });
  useEffect(() => {   
    if(didMountRef.current === false){ //only for component did mount
      getAgenda();
      didMountRef.current = true
    }
  },[agenda.length, callStatus])

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
    if(!rules.required && value.trim() < 1){
      isValid = true;
      message = '';
    }; 
  };
  return {isValid, message};
}
// const checkFormValidity = (form) => {
//   let formIsValid = true;
//   for (let elemIdentifier in form){
//     if(form[elemIdentifier].touched || form[elemIdentifier].validation.required){
//       formIsValid = form[elemIdentifier].valid && formIsValid;
//     }   
//   }
//   setFromIsInvalid(!formIsValid);
// }
const onChangeHandler = (e, elementIdentifier) => {
  const updatedForm = {
    ...formData
  }
  const updatedElement = {
    ...updatedForm[elementIdentifier]
  }
  updatedElement.value = e.target.value;
  // const res = validityCheck(updatedElement.value, updatedElement.validation);
  // updatedElement.valid = res.isValid;
  // updatedElement.message = res.message;
  // updatedElement.touched = true;
  updatedForm[elementIdentifier] = updatedElement;
  setFormData(updatedForm);
  // checkFormValidity(updatedForm);
}

const initilizeForm = (data) => {
  let updatedForm = {
    ...formData
  }
  updatedForm['remote'] = {
    ...updatedForm['remote'],
    value: data.remote
  } 
  updatedForm['relocation'] = {
    ...updatedForm['relocation'],
    value: data.relocation
  }
  updatedForm['contract'] = {
    ...updatedForm['contract'],
    value: data.contract
  }
  updatedForm['work_type'] = {
    ...updatedForm['work_type'],
    value: data.work_type
  }
  updatedForm['project_type'] = {
    ...updatedForm['project_type'],
    value: data.project_type
  }
  updatedForm['compensation'] = {
    ...updatedForm['compensation'],
    value: data.compensation
  }
  setFormData(updatedForm);
}

const getAgenda = async() => {
  setLoading(true);
  try {
    const res =  await axios.get ("/api/agenda/" + call_id);
    if(res.data.agenda.length === 0){
      setAgendaExists(false);
      const temp = {
        remote: '',
        relocation: '',
        contract: '',
        work_type: '',
        project_type: '',
        compensation: '',
      }
      setAgenda(temp);
    }
    else{
      initilizeForm(res.data.agenda[0])
      setAgenda(res.data.agenda[0]);
      setAgendaExists(true);
      updateNotes(res.data.agenda[0].notes)
    }
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
  setLoading(false);
}

const updateAgenda = async(agenda, note) => {
  setLoading(true);
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ agenda, note });
    const res =  await axios.put ("/api/agenda/" + call_id, body, config);
      if(res.data.agenda.length === 1){
        alert.success('Agenda updated successfully...!!');
      }
  } 
  catch (error) {
    alert.success('Agenda update failed...!!');
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
  setLoading(false);
}

const createAgenda = async(agenda, note) => {
    setLoading(true);
    try {
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ agenda, note });
    await axios.post ("/api/agenda", body, config);
    alert.success('Agenda updated successfully...!!');
  } catch (error) {
      alert.success('Agenda update failed...!!');
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
  setLoading(false);
}

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    
    const note = {
      agenda_id: call_id,
      note: notes === '' ? 'No Notes': notes,
      call_status: callStatus,
      voice: voice,
      interview_status: interviewStatus
    }
    let temp = {
      remote: formData.remote.value,
      relocation: formData.relocation.value,
      contract: formData.contract.value,
      work_type: formData.work_type.value,
      project_type: formData.project_type.value,
      compensation: formData.compensation.value,
    }  
    if(agendaExists){
      updateAgenda(temp, note)
    }
    else{
      temp.call_id = call_id;
      createAgenda(temp, note)
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
              <TextField
                key={elem.id}
                className={classes.textField}
                error = {!elem.config.valid && elem.config.touched}
                disabled= {callStatus !== 'done'}
                id={elem.id}
                label={elem.config.elementConfig.placeholder}
                type={elem.config.elementConfig.type}
                value={elem.config.value}
                onChange={(event) => {onChangeHandler(event, elem.id)}}
                helperText={elem.config.message}/>            
          ))}
          {
            callStatus ? (
          <div style={{marginTop: '20px'}}>
            <TextField
              error={notes === '' }
              className={classes.textField}   
              id="Notes"
              label="Notes"
              multiline
              helperText={notes === ''  ? 'Please Provide Some Notes*': ''}
              rows={5}
              variant="outlined"
              value={notes}
              onChange={(event) => {setNotes(event.target.value)}}/>                
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={classes.button}
              disabled={fromIsInvalid || (notes === '' )}>
              Update Agenda
            </Button>
            </div>
            ): null
          }
      </form>
      );
    return form;
  }

  return (
    <Fragment>
      {loading ? <p> Loading...! </p> : (agendaExists || editable) ?
        (<div>
          <Typography 
          className={classes.typography} >
          Edit Agenda
          </Typography>
          {formRender()}
        </div>): <p>No call Has been taken yet</p>
      }

    </Fragment>
  );
};

export default errorHandler(agendaForm);
