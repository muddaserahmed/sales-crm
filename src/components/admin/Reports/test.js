/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import ReportPage from './reportPage';
import { getTestReport } from './../../../store/actions/profile';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const test = ({history, testStatuses, getTestReport, allReportStartDate, allReportEndDate, shouldFetch }) => {
  const [report, setReport] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [subTotal, setSubTotal] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');

  useEffect(()=> {
    if(shouldFetch === true){
      handleDate(allReportStartDate, allReportEndDate)
    }
  },[shouldFetch, allReportEndDate, allReportStartDate]);

  const handleDate = async (startD, endD) => {
    setLoading(true);
    startD = `${startD.getFullYear()}-${startD.getMonth() + 1}-${startD.getDate()}`;
    endD = `${endD.getFullYear()}-${endD.getMonth() + 1}-${endD.getDate()}`;
    setStartDate(startD);
    setEndDate(endD);
    const testReport = await getTestReport(startD, endD, testStatuses);
    setReport(testReport.report);
    setSubTotal(testReport.subTotal);
    setLoading(false);
  };

  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Test Status</TableCell>
              <TableCell align='center'>Percentage</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.status ? ( 
                <TableRow 
                hover
                style={{cursor: 'pointer'}}
                key={index}
                onClick={ () => history.push({
                  pathname: '/detail',
                  state: {
                    status: row.status,
                    startDate: startDate,
                    endDate: endDate,
                    routeName: 'test'
                  }
              })}>
                <TableCell>
                  {row.status} 
                </TableCell>
                <TableCell align='center'>
                {row.total > 0 ? `${((row.total/subTotal)*100).toFixed(2)} %` : 0}
                </TableCell>
                <TableCell  align='right'>
                  {row.total}
                </TableCell>
              </TableRow>
              ): null
            ))}
            <TableRow>
              <TableCell colSpan={2} align="right">Total Tests</TableCell>
              <TableCell align="right">{subTotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <ReportPage
        report={report}
        tableHeader={`Report of [${startDate}] - [${endDate}]`}
        loading={loading}
        displayTable={displayTable}  
        dateRangeHandler={handleDate}
        pageHeader={'Tests Report'} 
        shouldShowControls={!allReportEndDate && !allReportStartDate ? true : false} />
    </Fragment>
  );
};
const mapStateToProps = state => ({
  testStatuses : state.SelectOptions.allTestStatus
})

export default connect(mapStateToProps, {getTestReport})(errorHandler(test));
