import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Chart from "react-google-charts";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { BsPeople, BsBook} from "react-icons/bs";
import { BiTime} from "react-icons/bi";
import { MdOutlinePayments} from "react-icons/md";



class App extends Component {

  

  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  firstname;
  lastname;
  state = { showing1: true };
  state = { showing2: false };
  state = { showing3: false };



  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/hf89wnf89hw938h98hw');
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

  const { showing1 } = this.state;
  const { showing2 } = this.state;
  const { showing3 } = this.state;
  return (
    <div className="App">

      <header className="App-header">
      <br></br>
      <style type="text/css">
    {`
    .btn-flat {
      background-color: #030139;
      color: white;
    }
    `}
  </style>
      <ButtonGroup size="lg" className="mb-2">
    <Button onClick={() => this.setState({ showing1: !showing1, showing2: false, showing3: false })} variant="flat" value="0"><BsPeople /></Button>
    <Button onClick={() => this.setState({ showing2: !showing2, showing1: false, showing3: false })} variant="flat" value="1"><MdOutlinePayments /></Button>
    <Button onClick={() => this.setState({ showing3: !showing3, showing1: false, showing2: false })} variant="flat" value="2"><BiTime /></Button>
  </ButtonGroup>
      </header>
      <br></br>

      { showing1 
                    ? <div>

<Form>
  <Form.Group className="mvp-1" controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder={this.firstname} />
  </Form.Group>
  <br></br>
  <Form.Group className="mvp-1" controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder={this.lastname} />
  </Form.Group>
  <br></br>
  <Form.Group className="mvp-1" controlId="formBasicLastName">
    <Form.Label>Department</Form.Label>
    <Form.Control type="text" placeholder={this.lastname} />
  </Form.Group>
  <br></br>
  <Form.Group controlId="formBasicFile" className="mvp-1">
    <Form.Label>Approval Document</Form.Label>
    <Form.Control type="file" />
  </Form.Group>
  <br></br>
  <style type="text/css">
    {`
    .btn-flat {
      background-color: #030139;
      color: white;
    }
    `}
  </style>
  <Button variant="flat" type="submit">
  Go to LMS
  </Button>
  <br></br>
  <Form.Text className="text-muted">
      
    </Form.Text>
</Form>

  </div>
                    : null
                }

{ showing2 
                    ? <div>

  <div className="App">
      <div style={{ display: 'flex', maxWidth: 900 }}>
      <Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Part', 'Payment'],
    ['Base', 4300],
    ['Bonus', 1100],
  ]}
  options={{
    title: 'Current Salary',
    pieSliceText: 'value',
    slices: {
      0: { color: '#030139' },
      1: { color: '#0583FE' },
    },
  }}
  rootProps={{ 'data-testid': '1' }}
/>
</div>
    </div>
    <Form>
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Select aria-label="Select Payslip">
  <option>Select previous payslip</option>
  <option value="1">July</option>
  <option value="2">June</option>
  <option value="3">March</option>
</Form.Select>
</Form.Group>
<style type="text/css">
    {`
    .btn-flat {
      background-color: #030139;
      color: white;
    }
    `}
  </style>

  <br></br>
  
  <Button variant="flat" type="submit">
    Access payslip
  </Button>
  </Form>

  </div>
                    : null
                }

{ showing3 
                    ? <div>

<Card ><br></br>
      <Card.Title>Your next shift:</Card.Title>
      <Card.Body>
      <Card.Text>
      Today, 9AM to 5PM
    </Card.Text>
    <style type="text/css">
    {`
    .btn-flat {
      background-color: #030139;
      color: white;
    }
    `}
  </style>
  <Button variant="flat" type="submit">
    Clock In
  </Button>
</Card.Body>
  </Card>
  <br></br>
  <Alert variant='info'>
    Alex Smith has offered you a shift
  </Alert>
  <Alert variant='success'>
    Your time off request was approved
  </Alert>
  <Alert variant='primary'>
    You have a new shift!
  </Alert>

  </div>
                    : null
                }

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
