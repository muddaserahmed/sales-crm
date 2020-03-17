import React, { Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import AddPostPage from "../pages/AddPostPage";
import Alert from "../pages/Alert";
import JobList from "../pages/sales/JobList";
import AdminJobList from "../pages/sales/adminJobList";
import EditJob from "../pages/sales/JobEdit";
import SalesDetails from "../pages/sales/salesDetail";
import UserList from "../pages/sales/UserList";
import EditUser from "../pages/sales/EditUser";
import LeadsList from "../pages/sales/leads/LeadList";
import LeadDetails from "../pages/sales/leads/LeadDetails";
import EditLead from "../pages/sales/leads/LeadEdit";
import MyLeads from "../pages/sales/leads/MyLead";
import LeadSchedule from "../pages/sales/leads/LeadCallList";
import UserReport from "../pages/sales/user/UserReport";
import UserDetails from "../pages/sales/user/UserDetails";
import ManagerJobLinks from "../pages/sales/managerJobLinks";
import ManagerJobList from '../pages/sales/managerJobList';
import ManagerLeads from '../pages/sales/managerLeads';
import ScheduledLeads from '../pages/sales/leads/scheduledLeads';
import Voice from '../pages/sales/voice';
const history = createBrowserHistory();

export default () => {
  return (
    <Fragment>
      <Alert />
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={SignInPage} />
          <PublicRoute path="/signup" component={SignUpPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/addpost" component={AddPostPage} />
          <PrivateRoute path="/user_list" component={UserList} />
          <PrivateRoute path="/edit" component={EditUser} />
          <PrivateRoute path="/job_list" component={JobList} />
          <PrivateRoute path="/admin_job_list" component={AdminJobList} />
          <PrivateRoute path="/job_edit" component={EditJob} />
          <PrivateRoute path="/sales_daily_details" component={SalesDetails} />
          <PrivateRoute path="/leads_list" component={LeadsList} />
          <PrivateRoute path="/lead_details" component={LeadDetails} />
          <PrivateRoute path="/lead_edit" component={EditLead} />
          <PrivateRoute path="/my_leads" component={MyLeads} />
          <PrivateRoute path="/lead_scedule" component={LeadSchedule} />
          <PrivateRoute path="/user_report" component={UserReport} />
          <PrivateRoute path="/user_details" component={UserDetails} />
          <PrivateRoute path="/manager_job_list" component={ManagerJobList} />
          <PrivateRoute path="/manager_job_links" component={ManagerJobLinks} />
          <PrivateRoute path="/manager_leads" component={ManagerLeads} />
          <PrivateRoute path="/scheduled_leads" component={ScheduledLeads} />
          <PrivateRoute path="/voice" component={Voice} />
        </Switch>
      </Router>
    </Fragment>
  );
};
