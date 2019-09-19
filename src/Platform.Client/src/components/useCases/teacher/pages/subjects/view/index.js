import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NameSection from './nameSection';
import DescriptionSection from './descriptionSection';
import ArtifactsSection from './artifactsSection';
import TopicsSection from './topicsSection';
import SemestersSection from './semestersSection';
import TeachersSection from './teachersSection';
import { getRequest, editRequest } from '../../../../../../store/teacher/subjects/actions';
import './style.scss';

const SubjectViewPage = ({
  match, subjectsState, getSubject, editSubject,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const subjectIdParam = Number.parseInt(match.params.subjectId);

  const { subjectId, name: newName, description: newDescription } = subjectsState.subject;

  function handleDescEdit(param) {
    editSubject(subjectId, name, param);
  }

  function handleNameEdit(param) {
    editSubject(subjectId, param, description);
  }

  useEffect(() => {
    getSubject(subjectIdParam);
  }, []);

  useEffect(() => {
    if (subjectId === subjectIdParam) {
      setName(newName);
      setDescription(newDescription);
      setIsLoaded(true);
    }
  }, [subjectsState.subject]);


  return (
    <section className="page">
      <NameSection name={name} edit={handleNameEdit} />
      <DescriptionSection description={description} edit={handleDescEdit} />
      {isLoaded && (
      <>
        <ArtifactsSection subjectId={subjectIdParam} />
        <TopicsSection subjectId={subjectIdParam} />
        <SemestersSection subjectId={subjectIdParam} />
        <TeachersSection subjectId={subjectIdParam} />
      </>
      )}
    </section>
  );
};

SubjectViewPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  subjectsState: PropTypes.objectOf(PropTypes.any).isRequired,
  getSubject: PropTypes.func.isRequired,
  editSubject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    subjectsState: state.subjects,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSubject: getRequest,
    editSubject: editRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubjectViewPage));
