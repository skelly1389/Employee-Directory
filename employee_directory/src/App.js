import React, { Component } from "react";
import EmpCard from "./components/EmpCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import API from "./utils/API";

class App extends Component {
  state = {
    employees: []
  };

  componentDidMount() {
    this.getEmps();
  }

  getEmps = () => {
    API.getRandomEmp()
      .then(res =>
        this.setState({
          employees: res.data.results
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Wrapper>
        <Title>Employee List</Title>
        {this.state.employees.map(employee => (
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
