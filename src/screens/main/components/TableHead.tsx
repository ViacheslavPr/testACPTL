import React from "react";
import classNames from "classnames";
import {useSelector} from "react-redux";

import { ESortBy, ESortDirection } from "../../../store/types/defaultsTypes";
import { getSortBySelector, getSortDirectionSelector } from "../../../store/selectors/mainSelectors";

const header = [
  {
    type: ESortBy.NAME,
    value: 'Name'
  },{
    type: ESortBy.BIRTHDAY,
    value: 'Birthday'
  },{
    type: ESortBy.HEIGHT,
    value: 'Height'
  },
]

interface ITableHead {
  handleOnClickSort: (type: ESortBy) => void;
}
const TableHead: React.FC<ITableHead> = ({ handleOnClickSort }) => {
  const sortBy = useSelector(getSortBySelector);
  const sortDirection = useSelector(getSortDirectionSelector);

  return <thead>
  <tr>
    {header.map(val => {
      const isDescSort = sortBy === val.type && sortDirection === ESortDirection.DESC;
      return <th
        role="presentation"
        key={val.type}
        onClick={() => handleOnClickSort(val.type)}
      >
        <span
          className={classNames({
            'header__sort-asc': !isDescSort,
            'header__sort-desc': isDescSort,
            'header__sort-asc--selected': !isDescSort && sortBy === val.type,
            'header__sort-desc--selected': isDescSort && sortBy === val.type,
          })}
          aria-hidden="true"
        >
          {val.value}
        </span>
      </th>
      }
    )}
  </tr>
  </thead>
}

export default TableHead;