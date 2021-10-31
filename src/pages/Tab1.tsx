import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { Form, Button } from 'react-bootstrap';


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User Info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Form>
  <Form.Group className="mvp-1" controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="John" />
  </Form.Group>

  <Form.Group className="mvp-1" controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Doe" />
  </Form.Group>

  <Form.Group className="mvp-1" controlId="formBasicDepartment">
    <Form.Label>Department</Form.Label>
    <Form.Control type="text" placeholder="PreSales" />
  </Form.Group>

  <Form.Group controlId="formBasicFile" className="mvp-1">
    <Form.Label>Approval Document</Form.Label>
    <Form.Control type="file" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Request Changes
  </Button>
</Form>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
