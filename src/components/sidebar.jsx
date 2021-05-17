import React from "react";

const SideBar = (props) => {
  return (
    <div className="d-flex flex-column align-items-stretch bg-white">
      <a
        href="/"
        className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
      >
        <span className="fs-5 fw-semibold">All Notes</span>
      </a>
      <div className="list-group list-group-flush border-bottom scrollarea">
        {props.files.map((file) => (
          <a
            href="#"
            className={
              file.id === props.currentFile + 1
                ? "list-group-item list-group-item-action active py-3 lh-tight"
                : "list-group-item list-group-item-action  py-3 lh-tight"
            }
            aria-current="true"
            key={file.id}
            onClick={() => props.onFileChange(file)}
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb">{file.value}</strong>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
