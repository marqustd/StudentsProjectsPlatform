import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Table, TableRow, TableBody, TableCell, TablePagination, CircularProgress, Button,
} from '@material-ui/core';
import { guidGenerator } from '../../../utility/helpers/guid';
import './style.scss';

export function extendWithLinks(array, func) {
  return array.map(a => ({ ...a, link: func(a) }));
}

const CommonTable = ({
  title,
  dataArrayWithLinks, dataTotalCount,
  headerKeyPairArray, // headerKeyPairArray: { title, key, format }
  hasLinks,
  rowSizeOptions,
  isLoading,
  loadMore,
  refreshCallback,
  checkForRefresh,
  children,
}) => {
  const [totalCount, setTotalCount] = useState(dataTotalCount);
  const [rowsPerPage, setRowsPerPage] = useState(rowSizeOptions[0]);
  const [currentPage, setCurrentPage] = useState(0);

  // load more effect
  useEffect(() => {
    const dataCount = dataArrayWithLinks.length;

    if (dataTotalCount > dataCount
        && (currentPage + 1) * rowsPerPage > dataArrayWithLinks.length) {
      loadMore(dataCount);
    }
  }, [dataArrayWithLinks.length, currentPage]);

  useEffect(() => {
    if (checkForRefresh()) {
      setCurrentPage(0);
    }
  });

  useEffect(() => {
    if (dataTotalCount !== totalCount) {
      setTotalCount(dataTotalCount);
    }
  }, [dataTotalCount]);

  function manageChangePage(e, page) {
    setCurrentPage(page);
  }

  function manageChangeRowsPerPage({ target }) {
    setRowsPerPage(target.value);
  }

  function renderRows() {
    const startIndex = rowsPerPage * currentPage;
    const endIndex = startIndex + rowsPerPage;
    const data = dataArrayWithLinks.slice(startIndex, endIndex);

    const rows = data.map(d => (
      <TableRow key={guidGenerator()} hover>
        {headerKeyPairArray.map(p => (
          <TableCell key={`${p.key}_${guidGenerator()}`} style={{ padding: '0' }}>
            {hasLinks ? (
              <Link
                to={d.link}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="common-table-cell">
                  {p.format ? p.format(d[p.key]) : d[p.key]}
                </div>
              </Link>
            ) : (
              <div className="common-table-cell">
                {p.format ? p.format(d[p.key]) : d[p.key]}
              </div>
            )}
          </TableCell>
        ))}
      </TableRow>
    ));

    const fillRowsCount = rowsPerPage - data.length;
    const fillRows = [];

    if (fillRowsCount > 0) {
      // eslint-disable-next-line
      for (let i = 0; i < fillRowsCount; i++) {
        fillRows.push(
          <TableRow key={i}>
            {headerKeyPairArray.map(p => <TableCell key={`${p.key}_${guidGenerator()}`} />)}
          </TableRow>,
        );
      }
    }
    return (<>{rows}{fillRows}</>);
  }

  const Loader = () => (
    <div style={{
      paddingTop: '20px',
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <CircularProgress color="primary" size={30} thickness={5} />
    </div>
  );

  return (
    <div className="common-table">
      <div className="common-table-header">
        <span style={{ color: 'white', fontSize: '1rem' }}>{title}</span>
        <Button
          style={{
            color: 'white',
            padding: '0 20px',
          }}
          onClick={refreshCallback}
        >
          {'Refresh'}
        </Button>
      </div>
      <Table>
        <TableBody>
          <TableRow style={{ borderBottom: '2px solid #0000004d' }}>
            {headerKeyPairArray.map(p => <TableCell key={p.title} style={{ fontWeight: '500' }}>{p.title}</TableCell>)}
          </TableRow>
          {!isLoading && renderRows()}
        </TableBody>
      </Table>
      {isLoading && <Loader />}
      <TablePagination
        rowsPerPageOptions={rowSizeOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={manageChangePage}
        onChangeRowsPerPage={manageChangeRowsPerPage}
      />
      {children !== null && (
      <div className="common-table-actions">
        {children}
      </div>
      )}
    </div>
  );
};

CommonTable.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  loadMore: PropTypes.func.isRequired,
  refreshCallback: PropTypes.func.isRequired,
  checkForRefresh: PropTypes.func.isRequired,
  dataTotalCount: PropTypes.number.isRequired,
  dataArrayWithLinks: PropTypes.arrayOf(PropTypes.any).isRequired,
  hasLinks: PropTypes.bool,
  rowSizeOptions: PropTypes.arrayOf(PropTypes.number),
  headerKeyPairArray: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    key: PropTypes.string,
  })).isRequired,
};

CommonTable.defaultProps = {
  title: '',
  children: null,
  isLoading: false,
  hasLinks: false,
  rowSizeOptions: [5, 7, 10, 15],
};

export default CommonTable;
