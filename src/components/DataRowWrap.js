import React, { Component } from 'react';

import DataRow from './DataRow';

class DataRowWrap extends Component {
  constructor() {
    super();
    this.state = {
        expandedRows : [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.list !== prevProps.list) {
      this.setState({expandedRows : []});
    }
  }


  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded ?
		      currentExpandedRows.filter(id => id !== rowId) :
		      currentExpandedRows.concat(rowId);

    this.setState({expandedRows : newExpandedRows});
  }

  renderItem(item, index) {
    const clickCallback = () => this.handleRowClick(index);
    const itemRows = [
		<tr key={"row-data-" + index}>
      <td className="plus" onClick={clickCallback}>+</td>
	    <td>{item.name}</td>
	    <td>{item.height}</td>
	    <td>{item.mass}</td>
      <td>{item.hair_color}</td>
      <td>{item.skin_color}</td>
      <td>{item.eye_color}</td>
      <td>{item.birth_year}</td>
      <td>{item.gender}</td>
      <td><a href="">Edit</a></td>
		</tr>
    ];

    if(this.state.expandedRows.includes(index)) {
      itemRows.push(
        <DataRow key={index} index={index} homeworld={item.homeworld} species={item.species} vehicles={item.vehicles} />
      );
    }

    return itemRows;
  }

  render() {
    let allItemRows = [];

    this.props.list.forEach((item, index) => {
      const perItemRows = this.renderItem(item, index);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
	    <tbody>{allItemRows}</tbody>
    );
  }
}

export default DataRowWrap;
