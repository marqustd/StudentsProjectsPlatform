import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRequest, signInRequest, signOutRequest } from '../../../../../store/student/sections/actions';
import LoadingPage from '../../../../pages/loading';
import DetailsSection from './detailsSection';
import SignedSection from './signedSection';
import NotSignedSection from './notSignedSection';
import './style.scss';

const SubjectViewPage = ({
  match, get, signIn, signOut, sectionState,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const subjectId = Number.parseInt(match.params.subjectId);
  const sectionId = Number.parseInt(match.params.sectionId);
  const ids = { subjectId, sectionId };
  const { section } = sectionState;
  useEffect(() => {
    get(subjectId, sectionId);
  }, []);

  useEffect(() => {
    if (sectionId === section.sectionId) {
      setIsLoaded(true);
    }
  }, [section]);

  function handleSignIn() {
    signIn(subjectId, sectionId);
  }

  function handleSignOut() {
    signOut(subjectId, sectionId);
  }

  const {
    topicName, topicDescription, isSignedIn, name, grade,
  } = section;

  return (
    <section className="page">
      {isLoaded ? (
        <>
          <DetailsSection
            sectionId={sectionId}
            subjectId={subjectId}
            topicName={topicName}
            topicDescription={topicDescription}
          />
          {isSignedIn
            ? (
              <SignedSection
                sectionGrade={grade}
                sectionName={name}
                ids={ids}
                signOut={handleSignOut}
              />
            )
            : (
              <NotSignedSection
                sectionName={name}
                signIn={handleSignIn}
              />
            )}
        </>
      ) : <LoadingPage />}
    </section>
  );
};

SubjectViewPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  sectionState: PropTypes.objectOf(PropTypes.any).isRequired,
  get: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    sectionState: state.sections,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    get: getRequest,
    signIn: signInRequest,
    signOut: signOutRequest,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubjectViewPage));
