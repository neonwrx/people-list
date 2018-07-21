import React, { PureComponent } from 'react';
import { func, string, array } from 'prop-types';
import {
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
} from 'reactstrap';

export default class DropdownItems extends PureComponent {
  static propTypes = {
    sortByGenger: func,
    sortByHairColor: func,
    sortByMass: func,
    gender: string,
    hairColor: array,
    mass: string,
  };

  state = {
    dropdownOpen: false,
    dropdownOpen2: false,
    dropdownOpen3: false,
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  toggle2 = () => {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
    });
  };

  toggle3 = () => {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3,
    });
  };

  renderGenderDropdown = () => {
    const values = ['Male', 'Female', '', 'All'];
    return values.map((val, index) => {
      if (val === '') {
        return <DropdownItem key={index} divider />;
      }
      if (val === 'All') {
        return (
          <DropdownItem key={index} value="" onClick={this.props.sortByGenger}>
            {val}
          </DropdownItem>
        );
      }
      return (
        <DropdownItem
          active={this.props.gender === val ? true : false}
          key={index}
          value={val}
          onClick={this.props.sortByGenger}
        >
          {val}
        </DropdownItem>
      );
    });
  };

  renderHairColorDropdown = () => {
    const values = ['Blond', 'Brown', 'Black', 'Red', '', 'All'];
    return values.map((val, index) => {
      if (val === '') {
        return <DropdownItem key={index} divider />;
      }
      if (val === 'All') {
        return (
          <DropdownItem key={index} value="" onClick={this.props.sortByHairColor}>
            {val}
          </DropdownItem>
        );
      }
      return (
        <Label check className="dropdown-item" key={index}>
          <Input
            value={val.toLowerCase()}
            type="checkbox"
            onClick={this.props.sortByHairColor}
            defaultChecked={this.props.hairColor.includes(val.toLowerCase()) ? true : false}
          />{' '}
          {val}
        </Label>
      );
    });
  };

  renderMassDropdown = () => {
    const values = ['< 50', '50 - 100', '100 - 150', '150', '', 'All'];
    return values.map((val, index) => {
      if (val === '') {
        return <DropdownItem key={index} divider />;
      }
      if (val === 'All') {
        return (
          <DropdownItem key={index} value="" onClick={this.props.sortByMass}>
            {val}
          </DropdownItem>
        );
      }
      return (
        <DropdownItem
          active={parseInt(this.props.mass, 10) === index ? true : false}
          key={index}
          value={index}
          onClick={this.props.sortByMass}
        >
          {val}
        </DropdownItem>
      );
    });
  };

  render() {
    return (
      <Row>
        <Col sm="4" xs="6" className="mb-3">
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle outline={this.props.gender ? false : true} caret color="info" size="sm">
              Gender
            </DropdownToggle>
            <DropdownMenu>{this.renderGenderDropdown()}</DropdownMenu>
          </ButtonDropdown>
        </Col>
        <Col sm="4" xs="6" className="mb-3">
          <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
            <DropdownToggle
              outline={this.props.hairColor.length > 0 ? false : true}
              caret
              color="info"
              size="sm"
            >
              Hair color
            </DropdownToggle>
            <DropdownMenu>{this.renderHairColorDropdown()}</DropdownMenu>
          </ButtonDropdown>
        </Col>
        <Col sm="4" xs="6" className="mb-3">
          <ButtonDropdown
            setActiveFromChild
            isOpen={this.state.dropdownOpen3}
            toggle={this.toggle3}
          >
            <DropdownToggle outline={this.props.mass ? false : true} caret color="info" size="sm">
              Mass
            </DropdownToggle>
            <DropdownMenu>{this.renderMassDropdown()}</DropdownMenu>
          </ButtonDropdown>
        </Col>
      </Row>
    );
  }
}
