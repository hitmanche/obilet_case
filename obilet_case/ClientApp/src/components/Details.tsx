import moment from 'moment';
import 'moment/locale/tr';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Button, Card, CardTitle, Col, Navbar, NavbarBrand, NavItem, Row } from 'reactstrap';
import { ApplicationState } from '../store';
import * as OBiletStore from '../store/obilet';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoMdArrowForward } from 'react-icons/io';

type DetailsProps =
    OBiletStore.OBiletState &
    RouteComponentProps<{}>;

class Details extends React.PureComponent<DetailsProps> {

    constructor(props: DetailsProps) {
        super(props);
        moment.locale('tr');
    }

    JourneyControl = () => {
        if (this.props.journeys.length > 0) {
            return true;
        }
        return false;
    }

    public render() {
        const { journeys } = this.props;
        return (
            <React.Fragment>
                <Navbar color="primary" dark expand="md">
                    <NavbarBrand href="/"><IoMdArrowRoundBack /></NavbarBrand>
                    <h4>{this.JourneyControl() ? journeys[0]["origin-location"] + ' - ' + journeys[0]["destination-location"] : ''}</h4>
                    <h5>{this.JourneyControl() ? moment(journeys[0].journey.departure).format('LL') : ''}</h5>
                </Navbar>
                {this.JourneyControl() ? journeys.map(val =>
                    <Card body style={{ margin: 10 }}>
                        <Row>
                            <Col lg="12" md="12" sm="12" xs="12">
                                <Row>
                                    <Col lg="9" md="9" sm="9" xs="9">
                                        <Row>
                                            <Col lg="4" md="4" sm="4" xs="4">
                                                Kalkış
                                            </Col>
                                            <Col lg="4" md="4" sm="4" xs="4" style={{ paddingLeft: 0 }}>
                                                Varış
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="4" md="4" sm="4" xs="4">
                                                {moment(val.journey.departure).format('LT')}&nbsp;<IoMdArrowForward />
                                            </Col>
                                            <Col lg="4" md="4" sm="4" xs="4" style={{ paddingLeft: 0 }}>
                                                {moment(val.journey.arrival).format('LT')}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="3" md="3" sm="3" xs="3">
                                        <Button style={{ position: 'absolute', right: 0 }} color="danger">{this.JourneyControl() ? journeys[0].journey["original-price"] + ' ' + journeys[0].journey.currency : ''}</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" md="12" sm="12" xs="12">
                                {this.JourneyControl() ? journeys[0].journey.origin + ' - ' + journeys[0].journey.destination : ''}
                            </Col>
                        </Row>
                    </Card>
                ) : 'Otobüs Seferi Bulunamadı'}
            </React.Fragment>)
    }
}

export default withRouter(connect((state: ApplicationState) => state.obilet)(Details as any));