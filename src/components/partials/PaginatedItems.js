import React, { useState } from "react";

import ReactPaginate from "react-paginate";

import Svg from "./Svg";

function PaginatedItems(props) {
  const {
    id = "paginated-items",
    items,
    ItemComponent,
    itemsPerPage = 5,
  } = props;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const pagyLinkClassName =
    "flex items-center gap-1 px-3 py-2 hover:bg-sky-600 hover:text-white";

  return (
    <div className="grid gap-8">
      <ul id={id} className="list-none grid gap-4">
        {currentItems &&
          currentItems.map((item, index) => (
            <li key={index}>
              <ItemComponent {...item} />
            </li>
          ))}
      </ul>

      <div className="flex justify-between items-center gap-4 pt-6 border-t text-sm">
        <p>
          Showing <span className="font-bold">{itemOffset + 1}</span> to{" "}
          <span className="font-bold">
            {endOffset > items.length ? items.length : endOffset}
          </span>{" "}
          of <span className="font-bold">{items.length}</span> results
        </p>
        <ReactPaginate
          pageCount={pageCount} // how many pages will be displayed
          marginPagesDisplayed={1} // how many pages are visible from start/end
          pageRangeDisplayed={1} // how many pages are visible from current page (including current page)
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
          className="flex border border-slate-300 rounded divide-x divide-slate-300" // pagination container styling
          pageClassName="w1" // every page-wrapper styling
          pageLinkClassName={pagyLinkClassName} // every page-link styling
          activeLinkClassName="font-bold bg-sky-600 text-white hover:bg-sky-800" // active page styling
          breakLabel="..."
          breakLinkClassName={pagyLinkClassName}
          previousLabel={
            <>
              <Svg src="/icons/chevron-left-mini.svg" className="w-4" />
              <span>Previous</span>
            </>
          }
          previousLinkClassName={`rounded-l ${pagyLinkClassName}`}
          nextLabel={
            <>
              <span>Next</span>
              <Svg src="/icons/chevron-right-mini.svg" className="w-4" />
            </>
          }
          nextLinkClassName={`rounded-r ${pagyLinkClassName}`}
          disabledLinkClassName="!text-slate-400 hover:!bg-transparent cursor-default"
        />
      </div>
    </div>
  );
}

export default PaginatedItems;
