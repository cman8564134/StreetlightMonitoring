import React, {Fragment, useEffect, useState} from "react";
import BasicModal from "../../../components/Modal/BasicModal/BasicModal";
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardFooter from "reactstrap/lib/CardFooter";



const TrafficLightForm = (props) =>{

    let {
        isVisible,
        isRevealPassword,
        RValue,
        YValue,
        BValue,
        totalTrafficLight,
        totalAmp,
        pillarID,
        postFormFunction
    } = props
    // const [isRevealPassword, setIsRevealPassword] = useState(false);
    // const [RValue, setRValue] = useState(0);
    // const [YValue, setYValue] = useState(0);
    // const [BValue, setBValue] = useState(0);
    // const [totalTrafficLight, setTotalTrafficLight] = useState(0);
    // const [totalAmp, setTotalAmp] = useState(0);
    // const [pillarID, setPillarID] = useState();

    useEffect(() => {
        const sum = parseInt(RValue) + parseInt(BValue) + parseInt(YValue)
        if(sum<0) {
            alert("R,B,Y Value has to be more than zero!");
        }
        else {
            totalTrafficLight = sum
        }
    },[RValue, YValue, BValue])

    return <Fragment>
        <BasicModal
            modalWidth={1000}
            visible={isVisible}
        >
            <Container fluid>
                <Form id ="StreetLightForm" >
                    <Card className="main-card mb-3">
                        <CardBody>
                            <FormGroup row></FormGroup>
                            <FormGroup row>
                                <Label for="Password" sm={2}>
                                    Password
                                </Label>
                                <Col sm={9}>
                                    <Input type={isRevealPassword ? "text" : "password"} name="password" id="Password" placeholder="Enter Password here"/>
                                </Col>
                                <Label sm= {1} onClick={() =>isRevealPassword = !isRevealPassword}>{isRevealPassword ? 'Hide' : 'Show'}</Label>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="PillarID" sm={2}>
                                    Feeder Pillar ID
                                </Label>
                                <Col sm={10}>
                                    <Input readOnly  id="PillarID" value = {pillarID}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="RValue" sm={2}>
                                    R Value
                                </Label>
                                <Col sm={10}>
                                    <Input id="RValue" placeholder="R Value" type="number" step="1" min = "0" value ={RValue}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="YValue" sm={2}>
                                    Y Value
                                </Label>
                                <Col sm={10}>
                                    <Input id="YValue" placeholder="Y Value" type="number" step="1" min = "0" value ={YValue} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="BValue" sm={2}>
                                    B Value
                                </Label>
                                <Col sm={10}>
                                    <Input id="BValue" placeholder="B Value" type="number" step="1" min = "0" value ={BValue} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="TotalStreetLight" sm={2}>
                                    Total Number of StreetLight
                                </Label>
                                <Col sm={10}>
                                    <Input readOnly  id="TotalStreetLight" value = {totalTrafficLight}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="TotalAmp" sm={2}>
                                    Total Amp
                                </Label>
                                <Col sm={10}>
                                    <Input id="TotalAmp" placeholder="Total Amp" type="number" step="1" min="0" value ={totalAmp} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="EachStreetLightAmp" sm={2}>
                                    Amp for Each Street Light
                                </Label>
                                <Col sm={10}>
                                    <Input readOnly  id="EachStreetLightAmp" value = {totalAmp/totalTrafficLight}/>
                                </Col>
                            </FormGroup>

                        </CardBody>
                        <CardFooter className="float-right" >
                            <FormGroup row className="float-right">
                                <Button color="link"  className="float-right" onClick={isVisible = false}>
                                    Cancel
                                </Button>{" "}
                                <Button color="primary" className="float-right" onClick={(event)=>{postFormFunction(event)}}>
                                    Confirm
                                </Button>
                            </FormGroup>
                        </CardFooter>
                    </Card>
                </Form>
            </Container>
        </BasicModal>
    </Fragment>
}

export default TrafficLightForm;