/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';
import Preloader from '../layout/Preloader';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }
  return (
    <div>
      <ul className="collection with-header">
        <li className="collection-header">
          <h4 className="center">System Logs</h4>
        </li>
        {!loading && logs.length === 0 ? (
          <p className="center">No logs are available</p>
        ) : (
          logs.map((log) => <LogItem key={log.id} log={log} />)
        )}
      </ul>
    </div>
  );
};

Logs.propTypes = {
  logs: PropTypes.array,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
