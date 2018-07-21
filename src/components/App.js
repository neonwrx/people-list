import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, number, func } from 'prop-types';
import { Container, Row, Col, Table } from 'reactstrap';

import { fetchPeople, resetState } from '../actions';
import '../App.css';
import DataRowWrap from './DataRowWrap';
import Header from './Header';
import TableHead from './TableHead';
import DropdownItems from './DropdownItems';
import Pages from './Pages';

class App extends Component {
  static propTypes = {
    people: array.isRequired,
    count: number,
    fetchPeople: func,
    resetState: func,
  };

  state = {
    orderBy: undefined,
    orderAsc: false,
    gender: '',
    mass: '',
    hairColor: [],
  };

  componentDidMount() {
    this.props.fetchPeople(1);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.people !== this.props.people) {
      this.setState({
        orderBy: undefined,
        orderAsc: false
      });
    }
  }


  resetFilters = () => {
    this.setState({
      gender: '',
      mass: '',
      hairColor: [],
    });
  };

  sortByGenger = e => {
    this.setState({
      gender: e.target.value,
    });
  };

  sortByHairColor = e => {
    let newM = [];
    let allChInputs = e.target.parentNode.parentNode.childNodes;
    if (e.target.value !== '') {
      allChInputs[allChInputs.length - 1].childNodes[0].checked = false;
      newM = this.state.hairColor.includes(e.target.value)
        ? this.state.hairColor.filter(item => item !== e.target.value)
        : [...this.state.hairColor, e.target.value];
    } else {
      for (let i = 0; i < allChInputs.length - 2; i++) {
        allChInputs[i].childNodes[0].checked = false;
      }
      e.target.checked = true;
    }
    this.setState({
      hairColor: newM,
    });
  };

  sortByMass = e => {
    this.setState({
      mass: e.target.value,
    });
  };

  sort = (a, b) => {
    const index = this.state.orderBy;
    switch (index) {
      case 0:
        return this.state.orderAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      case 1:
        return this.state.orderAsc ? a.height - b.height : b.height - a.height;
      case 2:
        return this.state.orderAsc ? a.mass - b.mass : b.mass - a.mass;
      case 3:
        return this.state.orderAsc
          ? a.hair_color.localeCompare(b.hair_color)
          : b.hair_color.localeCompare(a.hair_color);
      case 4:
        return this.state.orderAsc
          ? a.skin_color.localeCompare(b.skin_color)
          : b.skin_color.localeCompare(a.skin_color);
      case 5:
        return this.state.orderAsc
          ? a.eye_color.localeCompare(b.eye_color)
          : b.eye_color.localeCompare(a.eye_color);
      case 6:
        return this.state.orderAsc
          ? a.birth_year.localeCompare(b.birth_year)
          : b.birth_year.localeCompare(a.birth_year);
      case 7:
        return this.state.orderAsc
          ? a.gender.localeCompare(b.gender)
          : b.gender.localeCompare(a.gender);
      default:
        return false;
    }
  };

  handleClick = index => {
    this.setState({
      orderBy: index,
      orderAsc: this.state.orderBy === index ? !this.state.orderAsc : this.state.orderAsc,
    });
  };

  renderPeople() {
    let peopleList =
        this.state.orderBy === undefined ? this.props.people : this.props.people.sort(this.sort),
      gender = this.state.gender.trim().toLowerCase(),
      mass = this.state.mass.trim().toLowerCase(),
      hairColor = this.state.hairColor;

    const options = {
      '0': function(a) {
        return a.mass < 50;
      },
      '1': function(a) {
        return a.mass >= 50 && a.mass < 100;
      },
      '2': function(a) {
        return a.mass >= 100 && a.mass <= 150;
      },
      '3': function(a) {
        return a.mass > 150;
      },
    };

    if (gender.length > 0) {
      peopleList = peopleList.filter(people => {
        return people.gender.toLowerCase() === gender;
      });
    }

    if (mass.length > 0) {
      peopleList = peopleList.filter(options[mass]);
    }

    if (hairColor.length > 0) {
      peopleList = peopleList.filter(people => {
        for (var i = 0; i < hairColor.length; i++) {
          if (people.hair_color.match(hairColor[i])) {
            return true;
          }
        }
        return false;
      });
    }

    return <DataRowWrap list={peopleList} orderAsc={this.state.orderAsc} orderBy={this.state.orderBy} />;
  }
  render() {
    return (
      <div>
        <Header />
        <br />
        <Container>
          <DropdownItems
            sortByGenger={this.sortByGenger}
            sortByHairColor={this.sortByHairColor}
            sortByMass={this.sortByMass}
            gender={this.state.gender}
            mass={this.state.mass}
            hairColor={this.state.hairColor}
          />
          <Table striped bordered responsive>
            <TableHead
              orderBy={this.state.orderBy}
              orderAsc={this.state.orderAsc}
              handleClick={this.handleClick}
            />
            {this.renderPeople()}
          </Table>
          <Row className="justify-content-end">
            <Col xs="2">
              <Pages
                fetchPeople={this.props.fetchPeople}
                resetState={this.props.resetState}
                resetFilters={this.resetFilters}
                pageCount={this.props.count}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ peopleReducer }) {
  return {
    people: peopleReducer.results,
    count: peopleReducer.count,
  };
}

export default connect(
  mapStateToProps,
  { fetchPeople, resetState },
)(App);
