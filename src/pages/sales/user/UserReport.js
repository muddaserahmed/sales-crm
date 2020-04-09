/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../../../actions/user";

const columns = [
  {
    id: "Designation",
    label: "Registration Number",
    minWidth: 100,

    format: value => value.toLocaleString()
  },
  {
    id: "Designation",
    label: "Name",
    minWidth: 100,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "Designation",
    label: "Designation",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  },
  {
    id: "Designation",
    label: "Role",
    minWidth: 170,
    align: "right",
    format: value => value.toLocaleString()
  }
];

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 622,
    overflow: "auto"
  },
  jobHeader: {
    textAlign: "center",
    fontFamily: "initial",
    color: "blue"
  },
  delete: {
    backgroundColor: "red,"
  }
});

const userList = ({ fetchUser, users, history }) => {
  //const alert = useAlert();
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchUser();
  }, [count]);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <h1 className={classes.jobHeader}>User List</h1>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    key={row.id}
                    onClick={() =>
                      history.push({
                        pathname: "/user_details",
                        state: { detail: row }
                      })
                    }
                  >
                    <TableCell component="th" scope="row">
                      {row.registration_number}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.designation}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const mapStateToProps = state => ({
  users: state.userReducer.users
});

userList.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};
//
export default connect(mapStateToProps, { fetchUser })(userList);
