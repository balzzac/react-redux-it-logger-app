import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { searchLogs } from '../../actions/logActions';

const SearchBar = ({ searchLogs }) => {
  const searchText = useRef('');
  const onChange = (e) => {
    searchLogs(searchText.current.value);
  };
  return (
    <nav style={{ marginBottom: '30px' }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search logs"
              ref={searchText}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
};

export default connect(
  null,
  { searchLogs }
)(SearchBar);
