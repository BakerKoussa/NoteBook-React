import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageCount + 1, 1);

  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() =>
              currentPage !== 1
                ? onPageChange(currentPage - 1)
                : onPageChange(currentPage)
            }
          >
            Previous
          </a>
        </li>
        {pages.map((p) => (
          <li
            key={p}
            className={p === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" href="#" onClick={() => onPageChange(p)}>
              {p}
            </a>
          </li>
        ))}

        <li className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() =>
              currentPage !== pageCount
                ? onPageChange(currentPage + 1)
                : onPageChange(currentPage)
            }
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
