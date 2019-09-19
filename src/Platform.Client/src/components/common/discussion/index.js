import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentsContainer from '../commentsContainer';
import Comment from '../comment';
import CommentInput from '../commentInput';
import { ajaxRequest, removeRequest, ajaxTypes } from '../../../store/common/temporary/actions';
import LoadingPage from '../../pages/loading';
import { temporaryDataHandlers } from '../../../utility/helpers/handlers';
import { guidGenerator } from '../../../utility/helpers/guid';

const { dispose, getData } = temporaryDataHandlers;

const Discussion = ({
  getUrl, postUrl, bodyCreator,
  containers, remove, ajax,
}) => {
  const [discussion, setDiscussion] = useState(null);
  const [id] = useState(guidGenerator());
  const [senderId] = useState(guidGenerator());

  function handleSender(content) {
    ajax(id, postUrl, ajaxTypes.POST, bodyCreator(content));
  }

  function filter(data) {
    if (Array.isArray(data)) {
      return data.map(d => ({
        content: d.content || 'undefined',
        author: d.author || 'undefined',
        date: d.dateTime || 'undefined',
      }));
    }
    return null;
  }

  useEffect(() => {
    ajax(id, getUrl);
    return () => {
      dispose(id, remove);
      dispose(senderId, remove);
    };
  }, []);

  useEffect(() => {
    getData(containers, id, setDiscussion, filter);
    getData(containers, senderId, setDiscussion, filter);
  }, [containers]);

  const isValid = discussion !== null;

  return (
    <div className="discussion">
      {isValid
        ? (
          <>
            <CommentsContainer>
              {discussion.map(d => (
                <Comment
                  key={guidGenerator()}
                  content={d.content}
                  author={d.author}
                  date={d.date}
                />
              ))}
            </CommentsContainer>
            <CommentInput sender={handleSender} />
          </>
        )
        : <LoadingPage />}
    </div>
  );
};

Discussion.propTypes = {
  containers: PropTypes.objectOf(PropTypes.any).isRequired,
  bodyCreator: PropTypes.func.isRequired,
  ajax: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  getUrl: PropTypes.string.isRequired,
  postUrl: PropTypes.string.isRequired,
};

function stateFunc(state) {
  return {
    containers: state.temporary,
  };
}

function dispatchFunc(dispatch) {
  return bindActionCreators({
    ajax: ajaxRequest,
    remove: removeRequest,
  }, dispatch);
}
export default connect(stateFunc, dispatchFunc)(Discussion);
