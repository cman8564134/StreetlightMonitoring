import React from 'react';

import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    Card,
    CardBody,
    CardTitle,
    CardFooter,
    CardSubtitle
} from 'reactstrap';

import LaddaButton, {
    ZOOM_IN,
} from 'react-ladda';

import {
    faDownload
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { CSVLink } from 'react-csv';

import ReactExport from "react-data-export";

import MetricFilters from './MetricFilters/MetricFilters';

import PerfectScrollbar from 'react-perfect-scrollbar';

const ExportDropdown = (props) => {
    let {
        onExportCSVHandler,
        csvLinkRef,
        csvData,
        excelLinkRef,
        onExportExcelHandler,
        excelSheets,
        fileName,
        metricFilters,
        inputChangedHandler,
        generatingExcel,
        generatingCSV
    } = props;

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    
    return (
        <div className="d-inline-block pr-3">
            <UncontrolledButtonDropdown>
                <DropdownToggle caret color="primary" className="mb-2 mr-2">
                    <span><FontAwesomeIcon icon={faDownload}/></span>
                </DropdownToggle>
                <DropdownMenu right>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>Export</CardTitle>
                            <CardSubtitle>Select at least 1 metric:</CardSubtitle>
                            <div className="scroll-area-sm-md">
                                <PerfectScrollbar>
                                    <MetricFilters
                                        filters={metricFilters}
                                        inputChangedHandler={inputChangedHandler}
                                    />
                                </PerfectScrollbar>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <LaddaButton 
                                className="mb-2 mr-2 btn btn-pill btn-primary"
                                loading={generatingCSV}
                                onClick={(e) => onExportCSVHandler(e)}
                                data-style={ZOOM_IN}
                            >
                                CSV
                            </LaddaButton>
                            <CSVLink 
                                className="nav-link" 
                                data={csvData}
                                hidden={true}
                                ref={el => { csvLinkRef.current = el;}}
                                filename={fileName}
                            >
                                CSV
                            </CSVLink>

                            <LaddaButton 
                                className="mb-2 mr-2 btn btn-pill btn-primary"
                                loading={generatingExcel}
                                onClick={(e) => onExportExcelHandler(e)}
                                data-style={ZOOM_IN}
                            >
                                Excel
                            </LaddaButton>
                            <ExcelFile filename={fileName} element={<button ref={excelLinkRef} hidden={true} onClick={() => console.log("Exporting Data to Excel")}>Excel</button>}>    
                                {excelSheets.map((sheets, index) => {
                                    const sheetObjects = [];

                                    for (let title in sheets){
                                        sheetObjects.push({
                                            title: title,
                                            config: [sheets[title]]
                                        })
                                    }

                                    return (
                                        sheetObjects.map((sheet) => {
                                            return (
                                                
                                                <ExcelSheet dataSet={sheet.config} name={sheet.title}/>
                                                // <ExcelSheet key={sheet.title} data={sheet.config.data} name={sheet.title}>
                                                //     {sheet.config.columns.map(column => {
                                                //         return (
                                                //             <ExcelColumn key={column.accessor} label={column.label} value={column.accessor}/>
                                                //         )
                                                //     })}
                                                // </ExcelSheet>    
                                            )
                                        })
                                    )
                                })}
                            </ExcelFile>
                        </CardFooter>
                    </Card>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
    )
}

export default ExportDropdown;