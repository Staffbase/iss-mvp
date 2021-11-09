import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import Chart from "react-google-charts";
import { Form, Button } from 'react-bootstrap';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Pay</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Pay</IonTitle>
          </IonToolbar>
        </IonHeader>
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
    Request Changes
  </Button>
  </Form>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
