import React from 'react';
import { number, bool, func } from 'prop-types';

const headers = [
  'Name',
  'Height',
  'Mass',
  'Hair color',
  'Skin color',
  'Eye color',
  'Birth year',
  'Gender',
  'Actions',
];

function TableHead({ orderBy, orderAsc, handleClick }) {
  const renderHeader = () => headers.map((header, index) => {
    const isSelected = index === orderBy;
    const arrow = isSelected ? (orderAsc ? 'is--asc' : 'is--desc') : '';
    const classes = `${isSelected ? `is--active ${arrow}` : ''}`;
    return (
      <th
        className={classes || null}
        style={{ cursor: 'pointer' }}
        key={index}
        onClick={() => handleClick(index)}
      >
        {header}
      </th>
    );
  });
  return (
    <thead>
      <tr>
        <th />
        {renderHeader()}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  orderBy: number,
  orderAsc: bool,
  handleClick: func,
};

export default TableHead;
