import React, { Component } from "react";
import EmpCard from "./components/EmpCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import API from "./utils/API";

class App extends Component {
  state = {
    employees: [],
  };

  sortByNameAsc = () => {
    let sortedEmpsAsc;
    sortedEmpsAsc = this.state.employees.sort((a, b) => (a.name.last > b.name.last) ? 1 : -1)

    this.setState({
      employees: sortedEmpsAsc,
    });
  };

  sortByNameDsc = () => {
    let sortedEmpsDsc;
    sortedEmpsDsc = this.state.employees.sort((a, b) => (a.name.last > b.name.last) ? -1 : 1)

    this.setState({
      employees: sortedEmpsDsc,
    });
  };

  change = (event) => {
    switch(event.target.value){
      case "ascending":
        this.sortByNameAsc()
        break;
      case "descending":
        this.sortByNameDsc()
        break;
      default:
        this.getEmps()
        break;
    }
  }

  componentDidMount() {
    this.getEmps();
  }

  getEmps = () => {
    API.getRandomEmp()
      .then((res) =>
        this.setState({
          employees: res.data.results,
        })
      )
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Wrapper>
        <Title>Employee List</Title>
        <select id="sorter" onChange={this.change} value={this.state.value} defaultValue={"DEFAULT" } >
          <option value="DEFAULT" disabled>Sort by ...</option>
          <option value="ascending">Last Name Ascending</option>
          <option value="descending">Last Name Descending</option>
          <option value="nusa">Lives Outside USA</option>
        </select>
        {this.state.employees.map((employee) => (
          <EmpCard
            key={employee.login.uuid}
            name={employee.name.last + ", " + employee.name.first}
            image={employee.picture.large}
            gender={employee.gender}
            location={employee.location.country}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
