import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UsersTable from './table/index';
import UsersSearchBar from './searchBar';
import { UserTypes as roles } from '../../../../../../../utility/helpers/userTypes';
import { extendWithLinks } from '../../../../../../common/table';
import './style.scss';
import {
  getAllAdminsRequest,
  getAllStudentsRequest,
  getAllTeachersRequest,
  getMoreAdminsRequest,
  getMoreStudentsRequest,
  getMoreTeachersRequest,
} from '../../../../../../../store/admin/users/actions';
import loaderObject from '../../../../../../../utility/loaders/admin/users';

const FindUsersPage = ({
  users,
  getAdmins,
  getStudents,
  getTeachers,
  getMoreAdmins,
  getMoreStudents,
  getMoreTeachers,
}) => {
  const [role, setRole] = useState(roles.STUDENTS.key);
  const [roleName, setRoleName] = useState(roles.STUDENTS.name);
  const [search, setSearch] = useState('');
  const [obsolete, setObsolete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchPageSize = 20;

  function checkForRefresh() {
    if (refresh) {
      setRefresh(false);
      return true;
    }
    return false;
  }

  function refreshCallback() {
    switch (role) {
      case roles.STUDENTS.key:
        getStudents(null, null, searchPageSize, obsolete);
        break;
      case roles.TEACHERS.key:
        getTeachers(null, null, searchPageSize, obsolete);
        break;
      case roles.ADMINS.key:
        getAdmins(null, null, searchPageSize, obsolete);
        break;
      default:
    }
  }

  function manageSearch(newText, newRole, isObsolete) {
    setRefresh(true);
    setRole(newRole);
    setSearch(newText);
    setObsolete(isObsolete);
    switch (newRole) {
      case roles.STUDENTS.key:
        setRoleName(roles.STUDENTS.name);
        getStudents(newText, null, searchPageSize, isObsolete);
        break;
      case roles.TEACHERS.key:
        setRoleName(roles.TEACHERS.name);
        getTeachers(newText, null, searchPageSize, isObsolete);
        break;
      case roles.ADMINS.key:
        setRoleName(roles.ADMINS.name);
        getAdmins(newText, null, searchPageSize, isObsolete);
        break;
      default:
    }
  }

  useEffect(() => {
    const loader = users.loads.find(l => l === loaderObject.LOAD_TABLE);
    if (loader) {
      if (!isLoading) {
        setIsLoading(true);
      }
    } else if (isLoading) {
      setTimeout(setIsLoading, 500, false);
    }
  }, [users.loads]);

  useEffect(() => {
    refreshCallback();
  }, []);

  function linkExtender(user) {
    return `/manage/users/${roleName.toLowerCase()}/${user.id}`;
  }


  function filterUsers() {
    switch (role) {
      case roles.STUDENTS.key:
        return users.students;
      case roles.TEACHERS.key:
        return users.teachers;
      case roles.ADMINS.key:
        return users.admins;
      default:
        return { totalCount: 0, array: [] };
    }
  }

  function loadMore(index) {
    switch (role) {
      case roles.STUDENTS.key:
        getMoreStudents(search, index, searchPageSize, obsolete);
        break;
      case roles.TEACHERS.key:
        getMoreTeachers(search, index, searchPageSize, obsolete);
        break;
      case roles.ADMINS.key:
        getMoreAdmins(search, index, searchPageSize, obsolete);
        break;
      default:
        break;
    }
  }


  const filteredUsers = filterUsers();
  return (
    <div className="find-users-panel">
      <UsersSearchBar
        role={role}
        manageSearch={manageSearch}
      />
      <UsersTable
        users={extendWithLinks(filteredUsers.array, linkExtender)}
        totalUsers={filteredUsers.totalCount}
        loadMore={loadMore}
        resultSize={searchPageSize}
        checkForRefresh={checkForRefresh}
        refreshCallback={refreshCallback}
        isLoading={isLoading}
      />
    </div>
  );
};

FindUsersPage.propTypes = {
  getAdmins: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getTeachers: PropTypes.func.isRequired,
  getMoreAdmins: PropTypes.func.isRequired,
  getMoreStudents: PropTypes.func.isRequired,
  getMoreTeachers: PropTypes.func.isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return { users: state.users };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAdmins: getAllAdminsRequest,
    getStudents: getAllStudentsRequest,
    getTeachers: getAllTeachersRequest,
    getMoreAdmins: getMoreAdminsRequest,
    getMoreStudents: getMoreStudentsRequest,
    getMoreTeachers: getMoreTeachersRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FindUsersPage);
