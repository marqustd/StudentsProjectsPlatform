import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import {
  TextField, Button, createMuiTheme, MuiThemeProvider,
} from '@material-ui/core';
import './style.scss';

const MarkdownEditor = ({
  markdown, save, rows, maxWidth,
}) => {
  const [original, setOriginal] = useState(markdown);
  const [saved, setSaved] = useState(markdown);
  const [edited, setEdited] = useState(markdown);
  const [preview, setPreview] = useState(true);

  useEffect(() => {
    setOriginal(markdown);
    setSaved(markdown);
    setEdited(markdown);
  }, [markdown]);

  function changeToPreview() {
    setPreview(true);
    setSaved(edited);
  }

  function changeToEdit() {
    setPreview(false);
    setEdited(saved);
  }

  function resetMarkdown() {
    setEdited(original);
    setSaved(original);
  }

  function saveMarkdown() {
    setOriginal(edited);
    setSaved(edited);
    save(edited);
  }

  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: '#ffffff',
      },
    },
  });

  const previewActions = (
    <>
      <Button onClick={changeToEdit} color="primary">Edit</Button>
    </>
  );


  const editActions = (
    <>
      <Button onClick={resetMarkdown} color="primary">Reset</Button>
      <Button onClick={saveMarkdown} color="primary">Save</Button>
      <Button onClick={changeToPreview} color="primary">Preview</Button>
    </>
  );

  return (
    <section
      className="markdown-editor"
      style={{
        maxWidth: `${maxWidth}px`,
      }}
    >
      <header className="editor-actions">
        <MuiThemeProvider theme={theme}>
          {preview ? previewActions : editActions}
        </MuiThemeProvider>
      </header>
      <div className="editor-content">
        {preview
          ? <Markdown source={saved} />
          : (
            <TextField
              value={edited}
              onChange={e => setEdited(e.target.value)}
              multiline
              rows={rows}
              fullWidth
            />
          )}
      </div>
    </section>
  );
};

MarkdownEditor.propTypes = {
  markdown: PropTypes.string,
  save: PropTypes.func.isRequired,
  rows: PropTypes.number,
  maxWidth: PropTypes.number,
};

MarkdownEditor.defaultProps = {
  markdown: '',
  rows: 20,
  maxWidth: 400,
};


export default MarkdownEditor;
