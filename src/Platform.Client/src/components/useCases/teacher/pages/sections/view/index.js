import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import StateSection from './stateSection';
import ActivitiesSection from './activitiesSection';
import MembersSection from './membersSection';
import { getRequest, editRequest } from '../../../../../../store/teacher/sections/actions';
import DiscussionSection from './discussionSection';

const SectionViewPage = ({
  match, section, get, edit,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const subjectId = Number.parseInt(match.params.subjectId);
  const semesterId = Number.parseInt(match.params.semesterId);
  const sectionId = Number.parseInt(match.params.sectionId);
  const { sectionId: id, topicId } = section;
  const ids = {
    subjectId, semesterId, sectionId, topicId,
  };
  useEffect(() => {
    get(subjectId, semesterId, sectionId);
  }, []);

  useEffect(() => {
    if (id === sectionId) {
      setIsLoaded(true);
    }
  }, [section]);


  return (
    <section className="page">
      <StateSection edit={edit} ids={ids} section={section} />
      {isLoaded && (
      <>
        <ActivitiesSection ids={ids} />
        <DiscussionSection ids={ids} />
        <MembersSection ids={ids} />
      </>
      )}
    </section>
  );
};


SectionViewPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  section: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    section: state.sections.section,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
    edit: editRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SectionViewPage));
