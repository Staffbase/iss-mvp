import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class App extends Component {

  

  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  firstname;
  lastname;
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.text();
    if (response.status !== 200) throw Error(body.message);
    this.sliceFirstName(body);
    this.sliceLastName(body);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
  sliceFirstName = async (input) =>{
    let position = input.search("given_name");
    let position2 = input.search("family_name");
    this.firstname  = input.slice(position+13, position2-3);
  };
  sliceLastName = async (input) =>{
    let position = input.search("family_name");
    let position2 = input.search("role");
    this.lastname  = input.slice(position+14, position2-3);
  };

render() {
  return (
    
    <div className="App">
      <header className="App-header">
      </header>

      <Form>
  <Form.Group className="mvp-1" controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="email" placeholder={this.firstname} />
  </Form.Group>
  <br></br>
  <Form.Group className="mvp-1" controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="password" placeholder={this.lastname} />
  </Form.Group>
  <br></br>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <br></br>
  <Form.Text className="text-muted">
      Data from Staffbase
    </Form.Text>
</Form>



      {/* <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p> */}

    </div>
  );}
}

export default App;
