import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailsSection from './detailsSection';
import SectionsSection from './sectionsSection';
import { getRequest } from '../../../../../../store/student/mySubjects/actions';
import LoadingPage from '../../../../../pages/loading';
import './style.scss';

const SubjectViewPage = ({
  match, subjectState, getSubject,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const subjectIdParam = Number.parseInt(match.params.subjectId);
  const { subject } = subjectState;
  const {
    subjectId, subjectName, description, teacherName, sectionId,
  } = subject;

  useEffect(() => {
    getSubject(subjectIdParam);
  }, []);

  useEffect(() => {
    if (subjectId === subjectIdParam) {
      setIsLoaded(true);
    }
  }, [subject]);


  return (
    <section className="page">

      {isLoaded ? (
        <>
          <DetailsSection
            subjectId={subjectId}
            subjectName={subjectName}
            description={description}
            teacherName={teacherName}
          />
          <SectionsSection
            subjectId={subjectId}
            sectionId={sectionId}
          />
        </>
      ) : <LoadingPage />}
    </section>
  );
};

SubjectViewPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  subjectState: PropTypes.objectOf(PropTypes.any).isRequired,
  getSubject: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    subjectState: state.mySubjects,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getSubject: getRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubjectViewPage));
