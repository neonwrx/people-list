import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { func, string, array, number, object } from 'prop-types';

import { fetchHomeworld, fetchSpecies, fetchVehicles } from '../actions';

class DataRow extends Component {
  static propTypes = {
    fetchHomeworld: func.isRequired,
    fetchSpecies: func.isRequired,
    fetchVehicles: func.isRequired,
    homeworld: string,
    species: array,
    vehicles: array,
    key: number,
    index: number,
    planet: object,
    variety: object,
    vehicle: object,
  };

  componentDidMount() {
    this.props.fetchHomeworld(this.props.homeworld, this.props.index);
    this.props.fetchSpecies(this.props.species, this.props.index);
    if (this.props.vehicles.length > 0) {
      this.props.fetchVehicles(this.props.vehicles, this.props.vehicles.length, this.props.index);
    }
  }

  renderVehicles() {
    if (this.props.vehicles.length > 0) {
      return this.props.vehicle[this.props.index].map((item, index) => {
        return (
          <tr key={index}>
            <td>
              <b>Name:</b> {item.name}
            </td>
            <td>
              <b>Model:</b> {item.model}
            </td>
            <td>
              <b>Manufacturer:</b> {item.manufacturer}
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>No vehicle</td>
        </tr>
      );
    }
  }

  render() {
    const {
      name,
      climate,
      rotation_period,
      gravity,
      orbital_period,
      terrain,
      diameter,
      population,
    } = this.props.planet[this.props.index];
    const { classification, designation } = this.props.variety[this.props.index];

    return (
      <tr key={'row-expanded-' + this.props.index}>
        <td colSpan="10">
          <div>
            <h4>Homeworld</h4>
            <Table striped hover size="sm">
              <tbody>
                <tr>
                  <td>
                    <b>Name:</b> {name}
                  </td>
                  <td>
                    <b>Climate:</b> {climate}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Rotation Period:</b> {rotation_period}
                  </td>
                  <td>
                    <b>Gravity:</b> {gravity}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Orbital Period:</b> {orbital_period}
                  </td>
                  <td>
                    <b>Terrain:</b> {terrain}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Diameter:</b> {diameter}
                  </td>
                  <td>
                    <b>Population:</b> {population}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <h4>Species</h4>
            <Table striped hover size="sm">
              <tbody>
                <tr>
                  <td>
                    <b>Name:</b> {this.props.variety[this.props.index].name}
                  </td>
                  <td>
                    <b>Classification:</b> {classification}
                  </td>
                  <td>
                    <b>Designation:</b> {designation}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div>
            <h4>Vehicle</h4>
            <Table striped hover size="sm">
              <tbody>{this.renderVehicles()}</tbody>
            </Table>
          </div>
        </td>
      </tr>
    );
  }
}

function mapStateToProps({ dataReducer }) {
  return {
    planet: dataReducer.homeworld,
    variety: dataReducer.species,
    vehicle: dataReducer.vehicles,
  };
}

export default connect(
  mapStateToProps,
  { fetchHomeworld, fetchSpecies, fetchVehicles },
)(DataRow);
