import React from 'react';

import Slider from "react-slick";

import { IoIosAnalytics } from "react-icons/io";

import {
    Button,
    CardHeader,
    Card,
    CardBody,
    CardFooter
} from 'reactstrap';

import {
    ResponsiveContainer
} from 'recharts';

import Chart from 'react-apexcharts'

import ConcessionHighlights from './ConcessionHighlights/ConcessionHighlights';
import Loader from '../../Loader/BallClipRotateMultiple/BallClipRotateMultiple';

const Concession = ( props ) => {
    const {
        concession,
        loadingConcessionChart,
        concessionChart,
        onClickViewDetailsHandler,
        highlightsHeaders
    } = props;

    const settings = {
        className: "",
        centerMode: false,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        dots: true,
    };

    let chartComponent = (
        <Card>
            <CardBody>
                <Loader />
            </CardBody>
        </Card>
        
    )

    if(!loadingConcessionChart) {
        chartComponent = (
            <ResponsiveContainer height={300}>
                <Chart options={concessionChart.chart_options} series={concessionChart.chart_series} type="line" width="100%"/>
            </ResponsiveContainer>
            
        )
    }

    return (
        <Card className="mb-3">
            <CardHeader className="card-header-tab">
                <div
                    className="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i className="header-icon lnr-cloud-download icon-gradient bg-happy-itmeo"> </i>
                    {concession.concession_name}
                </div>
            </CardHeader>
            <CardBody className="p-0">
                <div className="p-1 slick-slider-sm mx-auto">
                    <Slider {...settings}>
                        <div>
                            <ConcessionHighlights 
                                highlightsHeaders={highlightsHeaders}
                                concessionHighlights={concession}
                            />
                        </div>
                        <div>
                            {chartComponent}
                        </div>
                    </Slider>
                </div>
            </CardBody>
            <CardFooter className="text-center d-block p-3">
                <Button 
                    color="primary" 
                    className="btn-pill btn-shadow btn-wide fsize-1" 
                    size="lg"
                    onClick={() => onClickViewDetailsHandler(concession.id)}>
                        <span className="mr-2 opacity-7">
                            <IoIosAnalytics color="#ffffff"/>
                        </span>
                    <span className="mr-1">
                            View Details
                        </span>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Concession;