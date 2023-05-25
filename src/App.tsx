import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { isTemplateExpression } from 'typescript';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


interface State{
  inputName: string;
  inputBirth_Date: string;
  inputGender: string;
  memberList: Member[]
  errormsg: string;
};

interface Member {
  name: string;
  gender: string;
  birth_date: Date;
  created_at: Date
}

interface  MemberRepsonse{
  data:  Member[]
}

interface ErrorFromServer{
  statusCode:  number;
  message: string;
  error: string;

}


class App extends Component<{}, State>{
  constructor(props: {}){
    super(props);
    this.state = { // iniczializálás
      inputName: "",
      inputGender: "",
      inputBirth_Date: "",
      memberList: [],
      errormsg: ""
    }
  }


  loadData = async () => {
    let response = await fetch("http://localhost:3000/api/members")
    let data = await response.json() as MemberRepsonse
    this.setState({
     memberList : data.data
    })
  }
  componentDidMount(): void {
    this.loadData()
}

getGenderImage(gender: string) {
  let genderImage = ""
  if(gender == "M") {
    genderImage = "/male.png"
  } else if( gender == "F"){
    genderImage = "/female.png"
  } else{
    genderImage = "/other.png"
  }
  return genderImage
}

paymentmemberShip = async(id: number) => {
  let response = await fetch("http://localhost:3000/api/members/" + id + "pay", {method: "POST"})
  if(!response.ok){
    let serverMg = await response.json() as ErrorFromServer
    this.setState({
      errormsg: serverMg.message
    })
  }
}


  render(){
    return(
      <div>
        <Container>
          <Row>
          {this.state.memberList.map(item => (
            <Col lg = {4} md= {6}>
              <Card>
              <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                <p>
                  Született: {item.birth_date + ""}
                  </p>
                  <p>
                  Csatlakozott: {item.created_at + ""}
                  </p>
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Img variant="top" src={this.getGenderImage(item.gender)} />
              </Card>
            </Col>
        )
          )}
          </Row>
        </Container>
      </div>
    )
  } 
     
       

}
export default App;
