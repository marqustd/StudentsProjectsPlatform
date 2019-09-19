import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailsSection from './detailsSection';
import SectionsSection from './sectionsSection';
import {
  getRequest, editRequest,
  obsoleteRequest, restoreRequest,
} from '../../../../../../store/teacher/semesters/actions';
import { teacherUrls } from '../../../../../../utility/helpers/config';
import './style.scss';

const SemesterViewPage = ({
  match, semester, get, edit, obsolete, restore,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const subjectId = Number.parseInt(match.params.subjectId);
  const semesterId = Number.parseInt(match.params.semesterId);
  const reportLink = `${teacherUrls.semesters.REPORT}?subjectId=${subjectId}&semesterId=${semesterId}`;
  useEffect(() => {
    get(subjectId, semesterId);
  }, []);

  useEffect(() => {
    if (semester.semesterId === semesterId) {
      setIsLoaded(true);
    }
  }, [semester]);


  return (
    <section className="page">
      <DetailsSection
        reportLink={reportLink}
        semester={semester}
        obsolete={() => obsolete(semesterId)}
        restore={() => restore(semesterId)}
        edit={state => edit(semesterId, state)}
      />
      {isLoaded && <SectionsSection ids={{ subjectId, semesterId }} />}
    </section>
  );
};


SemesterViewPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  semester: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  obsolete: PropTypes.func.isRequired,
  restore: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    semester: state.semesters.semester,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
    edit: editRequest,
    obsolete: obsoleteRequest,
    restore: restoreRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SemesterViewPage);
