import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPeople, resetState} from '../actions';
import '../App.css';
import {
  Container,
  Row,
  Col,
  Table,
  Label,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink } from 'reactstrap';

import DataRowWrap from './DataRowWrap';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.sortByGenger = this.sortByGenger.bind(this);
    this.sortByMass = this.sortByMass.bind(this);
    this.sortByHairColor = this.sortByHairColor.bind(this);

    this.state = {
      pageNumber: 1,
      totalPages: 1,
      dropdownOpen: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      orderBy: undefined,
      orderAsc: false,
      searchBy: 'gender',
      gender: '',
      mass: '',
      hairColor: [],
    }
  }
  componentDidMount() {
    this.props.fetchPeople(1);
  }

  changePage(e) {
      this.setState({
        pageNumber: e.target.innerText,
        totalPages: Math.ceil(this.props.count/10),
        gender: '',
        mass: '',
        hairColor: [],
      });
      this.props.fetchPeople(e.target.innerText);
      this.props.resetState();
      let childs = e.target.parentNode.parentNode.childNodes;
      for(let i=0; i<childs.length; i++) {
        if (childs[i].classList.contains('active')) {
          childs[i].classList.remove('active');
        }
      }
      e.target.parentNode.classList.add('active');

      if (childs[2].classList.contains('active') && this.state.pageNumber < e.target.innerText && Number(e.target.innerText) !== this.state.totalPages) {
        childs[0].childNodes[0].innerText = Number(e.target.innerText) - 1;
        childs[1].childNodes[0].innerText = Number(e.target.innerText);
        childs[2].childNodes[0].innerText = Number(e.target.innerText) + 1;
        childs[2].classList.remove('active');
        childs[1].classList.add('active');
      }
      if (childs[0].classList.contains('active') && this.state.pageNumber > e.target.innerText && Number(e.target.innerText) !== 1) {
        childs[0].childNodes[0].innerText = Number(e.target.innerText) - 1;
        childs[1].childNodes[0].innerText = Number(e.target.innerText) + 1;
        childs[2].childNodes[0].innerText = Number(e.target.innerText) + 2;
        childs[0].classList.remove('active');
        childs[2].classList.remove('active');
        childs[1].classList.add('active');
      }
  }

  sortByGenger(e) {
    this.setState({
      gender: e.target.value,
      searchBy: 'gender'
    });
  }

  sortByHairColor(e) {
    let newM = [];
    let allChInputs = e.target.parentNode.parentNode.childNodes;
    if (e.target.value !== "") {
      allChInputs[allChInputs.length - 1].childNodes[0].checked = false;
      newM = this.state.hairColor.includes(e.target.value) ? this.state.hairColor.filter(item => item !== e.target.value) : [...this.state.hairColor, e.target.value];
    } else {
      for (let i=0;i<allChInputs.length - 2;i++) {
        allChInputs[i].childNodes[0].checked = false;
      }
      e.target.checked = true;
    }
    this.setState({
      hairColor: newM,
      searchBy: 'hairColor',
    });
  }

  sortByMass(e) {
    this.setState({
      mass: e.target.value,
      searchBy: 'mass',
    });
  }

  sort(a, b) {
    const index = this.state.orderBy;
    if (index === 0) {
      return (this.state.orderAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    } else if (index === 1) {
      return (this.state.orderAsc ? a.height - b.height : b.height - a.height);
    } else if (index === 2) {
      return (this.state.orderAsc ? a.mass - b.mass : b.mass - a.mass);
    } else if (index === 3) {
      return (this.state.orderAsc ? a.hair_color.localeCompare(b.hair_color) : b.hair_color.localeCompare(a.hair_color));
    } else if (index === 4) {
      return (this.state.orderAsc ? a.skin_color.localeCompare(b.skin_color) : b.skin_color.localeCompare(a.skin_color));
    } else if (index === 5) {
      return (this.state.orderAsc ? a.eye_color.localeCompare(b.eye_color) : b.eye_color.localeCompare(a.eye_color));
    } else if (index === 6) {
      return (this.state.orderAsc ? a.birth_year.localeCompare(b.birth_year) : b.birth_year.localeCompare(a.birth_year));
    } else if (index === 7) {
      return (this.state.orderAsc ? a.gender.localeCompare(b.gender) : b.gender.localeCompare(a.gender));
    } else return false;
  }

  handleClick(index) {
    this.setState({
      orderBy: index,
      orderAsc: (this.state.orderBy === index) ? !this.state.orderAsc : this.state.orderAsc
    });
  }

  toggle1() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  }

  toggle3() {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3
    });
  }

  renderPeople() {
    let peopleList = (this.state.orderBy === undefined) ? this.props.people : this.props.people.sort(this.sort.bind(this)),
        searchBy = this.state.searchBy,
        gender = this.state.gender.trim().toLowerCase(),
        mass = this.state.mass.trim().toLowerCase(),
        hairColor = this.state.hairColor;

    const options = {
      "a": function(a){return a.mass<50;},
      "b": function(a){return a.mass>=50 && a.mass<100;},
      "c": function(a){return a.mass>=100 && a.mass<=150;},
      "d": function(a){return a.mass>150;}
    };

    if (searchBy === 'gender') {
      if (gender.length > 0) {
        peopleList = peopleList.filter((people) => {
          return people.gender.toLowerCase() === gender ;
        });
      }
    } else if (searchBy === 'mass') {
      if (mass.length > 0) {
        peopleList = peopleList.filter(options[mass]);
      }
    } else if (searchBy === 'hairColor') {
      if (hairColor.length > 0) {
        peopleList = peopleList.filter((people) => {
          for (var i = 0; i < hairColor.length; i++ ) {
            if (people.hair_color.match(hairColor[i])) {
              return true;
            }
          }
          return false;
        });
      }
    }
    return <DataRowWrap list={peopleList} />
  }
  render() {
    const headers = ['Name', 'Height', 'Mass', 'Hair color', 'Skin color', 'Eye color', 'Birth year', 'Gender', 'Actions'];

    return (
      <div>
        <Header />
        <br/>
        <Container>
          <Row>
            <Col sm="4" xs="6" className="mb-3">
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle1}>
                <DropdownToggle outline caret color="info" size="sm">
                  Gender
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem value="Male" onClick={(e) => this.sortByGenger(e)}>Male</DropdownItem>
                  <DropdownItem value="Female" onClick={(e) => this.sortByGenger(e)}>Female</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem value="" onClick={(e) => this.sortByGenger(e)}>All</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
            <Col sm="4" xs="6" className="mb-3">
              <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                <DropdownToggle outline caret color="info" size="sm">
                  Hair color
                </DropdownToggle>
                <DropdownMenu>
                  <Label check className="dropdown-item">
                    <Input value="blonde" type="checkbox" onClick={(e) => this.sortByHairColor(e)}/>{' '}
                    Blonde
                  </Label>
                  <Label check className="dropdown-item">
                    <Input value="brown" type="checkbox" onClick={(e) => this.sortByHairColor(e)}/>{' '}
                    Brown
                  </Label>
                  <Label check className="dropdown-item">
                    <Input value="black" type="checkbox" onClick={(e) => this.sortByHairColor(e)}/>{' '}
                    Black
                  </Label>
                  <Label check className="dropdown-item">
                    <Input value="red" type="checkbox" onClick={(e) => this.sortByHairColor(e)}/>{' '}
                    Red
                  </Label>
                  <DropdownItem divider />
                  <Label check className="dropdown-item">
                    <Input value="" type="checkbox" onClick={(e) => this.sortByHairColor(e)}/>{' '}
                    All
                  </Label>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
            <Col sm="4" xs="6" className="mb-3">
              <ButtonDropdown setActiveFromChild isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
                <DropdownToggle outline caret color="info" size="sm">
                  Mass
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem value="a" onClick={(e) => this.sortByMass(e)}>{'< 50'}</DropdownItem>
                  <DropdownItem value="b" onClick={(e) => this.sortByMass(e)}>50 - 100</DropdownItem>
                  <DropdownItem value="c" onClick={(e) => this.sortByMass(e)}>100 - 150</DropdownItem>
                  <DropdownItem value="d" onClick={(e) => this.sortByMass(e)}>>150</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem value="" onClick={(e) => this.sortByMass(e)}>All</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </Col>
          </Row>

          <Table striped bordered responsive>
            <thead>
              <tr>
                <th></th>
                {
                  headers.map((header, index) => {
                    const isSelected = (index === this.state.orderBy);
                    const arrow = (isSelected ? (this.state.orderAsc ? "is--asc" : "is--desc") : "");
                    const classes = `${isSelected ? `is--active ${arrow}` : ""}`;
                    return (<th className={classes} style={{cursor: 'pointer'}} key={index} onClick={this.handleClick.bind(this, index)}>{header}</th>);
                  })
                }
              </tr>
            </thead>
            {
              this.renderPeople()
            }
          </Table>
          <Row className="justify-content-end">
            <Col xs="2">
              <Pagination aria-label="Page navigation">
                <PaginationItem active>
                  <PaginationLink onClick={(e) => this.changePage(e)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={(e) => this.changePage(e)}>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink onClick={(e) => this.changePage(e)}>
                    3
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({peopleReducer}) {
  return {
    people: peopleReducer.results,
    count: peopleReducer.count
  }
}

export default connect(mapStateToProps, {fetchPeople, resetState})(App);
