import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AddOutlined, CloseOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Artifact from '../artifact';
import DialogButton from '../dialogButton';
import { guidGenerator } from '../../../utility/helpers/guid';
import FileUploader from '../fileUploader';
import {
  ajaxRequest, removeRequest, ajaxTypes,
} from '../../../store/common/temporary/actions';
import LoadingPage from '../../pages/loading';
import { temporaryDataHandlers } from '../../../utility/helpers/handlers';
import './style.scss';

const { dispose, getData } = temporaryDataHandlers;

const ArtifactsPanel = ({
  addUrl,
  removeUrlGetter,
  getUrl,
  canDelete, canAdd,
  linkGenerator,
  ajax, removeContainer, containers,
}) => {
  const [artifacts, setArtifacts] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [wait, setWait] = useState(true);
  const [getterId] = useState(guidGenerator());
  const [addId] = useState(guidGenerator());
  const [removeId] = useState(guidGenerator());

  function addArtifact(file) {
    setWait(true);
    ajax(addId, addUrl, ajaxTypes.UPLOAD, file);
  }

  function removeArtifact(id) {
    setWait(true);
    ajax(removeId, removeUrlGetter(id), ajaxTypes.DELETE);
  }

  function getArtifactsSetter(data) {
    setWait(false);
    setLoaded(true);
    setArtifacts(data);
  }

  function addArtifactSetter(artifact) {
    setWait(false);
    setArtifacts([...artifacts, artifact]);
  }

  function removeArtifactSetter(id) {
    setWait(false);
    setArtifacts(artifacts.filter(a => a.artifactId !== id));
  }

  function getArtifacts() {
    ajax(getterId, getUrl, ajaxTypes.GET);
  }

  useEffect(() => {
    getArtifacts();
  }, []);

  useEffect(() => {
    getData(containers, getterId, getArtifactsSetter);
    getData(containers, addId, addArtifactSetter);
    getData(containers, removeId, removeArtifactSetter);
  }, [containers]);

  useEffect(() => () => {
    dispose(getterId, removeContainer);
    dispose(addId, removeContainer);
    dispose(removeId, removeContainer);
  }, []);

  return (
    <>
      <div className="artifacts">
        {loaded
          ? artifacts.map(a => (
            <div className="artifact-container" key={`li_${guidGenerator()}`}>
              <Artifact
                key={`artifact_${guidGenerator()}`}
                name={a.name}
                link={linkGenerator(a.artifactId)}
              />
              {canDelete && (
                <DialogButton
                  isLoading={wait}
                  dialogTitle="Do you want to delete this artifact?"
                  dialogDescription={a.name}
                  okText="Delete"
                  icon={<CloseOutlined />}
                  onOk={() => { removeArtifact(a.artifactId); }}
                />
              )}
            </div>
          ))
          : <LoadingPage />}
      </div>
      {canAdd && (
        <FileUploader
          buttonProps={{ disabled: (wait || !loaded) }}
          buttonContent={<>{'Add artifact'}<AddOutlined /></>}
          uploadAction={addArtifact}
        />
      )}
      <Button onClick={getArtifacts}>Refresh</Button>
    </>
  );
};

ArtifactsPanel.propTypes = {
  linkGenerator: PropTypes.func.isRequired,
  addUrl: PropTypes.string,
  removeUrlGetter: PropTypes.func,
  getUrl: PropTypes.string.isRequired,
  containers: PropTypes.objectOf(PropTypes.any).isRequired,
  ajax: PropTypes.func.isRequired,
  removeContainer: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
  canAdd: PropTypes.bool,
};

ArtifactsPanel.defaultProps = {
  removeUrlGetter: () => console.log('Remove url prop not found'),
  canDelete: false,
  canAdd: false,
  addUrl: '',
};

function mapStateToProps(state) {
  return {
    containers: state.temporary,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ajax: ajaxRequest,
    removeContainer: removeRequest,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ArtifactsPanel);
