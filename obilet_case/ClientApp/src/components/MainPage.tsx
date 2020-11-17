import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ApplicationState } from '../store';
import * as OBiletStore from '../store/obilet';
import { Navbar, NavbarBrand, Row, Col, Card, CardTitle, Button, CardText } from 'reactstrap';
import Select, { ValueType } from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GetClientWidthHeight } from '../provider/functions';

interface IState {
    xPosition: string;
    yPosition: string;
    date: any;
}

type MainPageProps =
    OBiletStore.OBiletState &
    typeof OBiletStore.actionCreators &
    RouteComponentProps<{}>;

class MainPage extends React.PureComponent<MainPageProps, IState> {

    constructor(props: MainPageProps) {
        super(props);
        this.state = { xPosition: '356', yPosition: '348', date: new Date() };
    }

    componentDidMount() {
        this.props.receiveOSession();
    }

    componentDidUpdate() {
        if (this.props.o_session.device_id && this.props.bus_locations.length === 0) {
            this.props.receiveBusLocations(this.props.o_session);
        }
    }

    handleChangePosition = (stateName: string, selectedOption: ValueType<OBiletStore.BusLocations>) => {
        const newValue = (selectedOption as OBiletStore.BusLocations).id.toString();
        if (stateName === 'xPosition' && newValue === this.state.yPosition) {
            this.setState({ yPosition: this.state.xPosition });
        }
        if (stateName === 'yPosition' && newValue === this.state.xPosition) {
            this.setState({ xPosition: this.state.yPosition });
        }
        if (selectedOption !== undefined && selectedOption) {
            this.setState({ [stateName]: newValue } as Pick<IState, keyof IState>);
        }
    };

    onClickJourney = () => {
        const { xPosition, yPosition, date } = this.state;
        this.props.receiveJourneys(this.props.o_session, xPosition, yPosition, date);
        this.props.history.push('/details');
    }

    public render() {
        return (
            <React.Fragment>
                <Navbar color="primary" dark expand="md" >
                    <NavbarBrand href="/">OBilet Example</NavbarBrand>
                </Navbar>
                <Row style={{ padding: 10, margin: 0 }}>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Card body>
                            <CardTitle tag="h5">Nereden</CardTitle>
                            <Select
                                value={this.props.bus_locations.find(x => x.id === parseInt(this.state.xPosition))}
                                onChange={opt => this.handleChangePosition('xPosition', opt)}
                                options={this.props.bus_locations}
                                getOptionLabel={opt => opt.name}
                                getOptionValue={opt => opt.id.toString()}
                            />
                        </Card>
                    </Col>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Card body>
                            <CardTitle tag="h5">Nereye</CardTitle>
                            <Select
                                value={this.props.bus_locations.find(x => x.id === parseInt(this.state.yPosition))}
                                onChange={opt => this.handleChangePosition('yPosition', opt)}
                                options={this.props.bus_locations}
                                getOptionLabel={opt => opt.name}
                                getOptionValue={opt => opt.id.toString()}
                            />
                        </Card>
                    </Col>
                    <Col lg="12" md="12" sm="12" xs="12" style={{ marginTop: 10 }}>
                        <Card body>
                            <CardTitle tag="h5">Tarih</CardTitle>
                            <DatePicker
                                className="datepicker-css"
                                selected={this.state.date}
                                onChange={opt => this.setState({ date: opt !== null ? opt : new Date() })}
                                showTimeSelect
                                locale="tr"
                                dateFormat="Pp"
                            />
                        </Card>
                    </Col>
                    <Col lg="12" md="12" sm="12" xs="12" style={{ paddingTop: 10 }}>
                        <Button
                            color="primary"
                            onClick={() => this.onClickJourney()}
                            style={{ display: 'flex', margin: '0 auto', width: '50%', justifyContent: 'center' }}
                        >
                            Bileti Bul
                        </Button>
                    </Col>
                    <Card body style={{ clear: 'both', position: 'absolute', bottom: 0, height: GetClientWidthHeight().height - 480, marginLeft: '-10px' }}>
                        <CardText style={{ overflowY: 'auto' }}>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        </CardText>
                    </Card>
                </Row>
            </React.Fragment>
        );
    }
};

export default withRouter(connect(
    (state: ApplicationState) => state.obilet,
    OBiletStore.actionCreators
)(MainPage as any));
