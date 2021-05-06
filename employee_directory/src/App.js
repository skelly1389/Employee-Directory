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
    sortedEmpsAsc = this.state.employees.sort((a, b) => {
      return a.name.last - b.name.last;
    });

    this.setState({
      employees: sortedEmpsAsc,
    });
  };

  sortByNameDsc = () => {
    let sortedEmpsDsc;
    sortedEmpsDsc = this.state.employees.sort((a, b) => {
      return b.name.last - a.name.last;
    });

    this.setState({
      employees: sortedEmpsDsc,
    });
  };

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
        <select>
          <option value="albums">Last Name Ascending</option>
          <option value="members">Last Name Descending</option>
          <option value="formed">Lives Outside USA</option>
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
