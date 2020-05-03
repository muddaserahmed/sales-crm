/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import Edit from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { userDetails } from "../../store/actions/user";

const useStyles = makeStyles(theme => ({
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
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: "100%"
  },
  button: {
    width: "100%",
    marginTop: "5%"
  },
  list: {
    margin: "0px -139px"
  }
}));

const userDetail = ({ history, location, userDetails, weeklyuserData, monthlyuserData }) => {
  const classes  = useStyles();
  const [formData, setFormData] = useState(location.state.detail);

  useEffect(() => {
    console.log("user Details");
    userDetails(formData.registration_number, formData.role);
  });
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton aria-label="edit">
            <ArrowBackIcon
              fontSize="large"
              onClick={() => history.push("/user_report/")}
            />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>

          <Typography align="center" variant="headline">
            User Details
            <h2>{formData.name}</h2>
            {formData.role === "user" ? (
              <ul class="list-group" className={classes.list}>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Role
                  <span class="badge badge-success badge-pill">
                    {formData.role}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Previous Week Applied Job
                  <span class="badge badge-success badge-pill">
                    {weeklyuserData}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Previous Month Applied Job
                  <span class="badge badge-success badge-pill">
                    {monthlyuserData}
                  </span>
                </li>
              </ul>
            ) : (
              <ul class="list-group" className={classes.list}>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Role
                  <span class="badge badge-success badge-pill">
                    {formData.role}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Previous Week Calls
                  <span class="badge badge-success badge-pill">
                    {weeklyuserData}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Previous Month Calls
                  <span class="badge badge-success badge-pill">
                    {monthlyuserData}
                  </span>
                </li>
              </ul>
            )}
          </Typography>
        </Paper>
      </main>
    </React.Fragment>
  );
};

userDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  weeklyuserData: state.userReducer.weeklyuserData,
  monthlyuserData: state.userReducer.monthlyuserData
});

export default connect(mapStateToProps, { userDetails })(userDetail)
