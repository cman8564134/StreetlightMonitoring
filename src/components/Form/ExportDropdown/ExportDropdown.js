import React from 'react';

import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import {
    faDownload
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { CSVLink } from 'react-csv';

import ReactExport from "react-data-export";

const ExportDropdown = (props) => {
    let {
        onExportCSVHandler,
        csvLinkRef,
        csvData,
        excelLinkRef,
        onExportExcelHandler,
        excelSheets,
        fileName
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
                    <Nav vertical>
                        <NavItem className="nav-item-header">
                            Export
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={(e) => onExportCSVHandler(e)}>CSV</NavLink>
                            <CSVLink 
                                className="nav-link" 
                                data={csvData}
                                hidden={true}
                                ref={el => { csvLinkRef.current = el;}}
                                filename={fileName}
                            >
                                CSV
                            </CSVLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={(e) => onExportExcelHandler(e)}>Excel</NavLink>
                            <ExcelFile filename={fileName} element={<button ref={excelLinkRef} hidden={true} onClick={() => console.log("Exporting Data to Excel")}>Excel</button>}>
                                {excelSheets.map((sheets, index) => {
                                    const sheetObjects = [];

                                    for (let title in sheets){
                                        sheetObjects.push({
                                            title: title,
                                            config: sheets[title]
                                        })
                                    }

                                    return (
                                        sheetObjects.map((sheet) => {
                                            return (
                                                <ExcelSheet key={sheet.title} data={sheet.config.data} name={sheet.title}>
                                                    {sheet.config.columns.map(column => {
                                                        return (
                                                            <ExcelColumn key={column.accessor} label={column.label} value={column.accessor}/>
                                                        )
                                                    })}
                                                </ExcelSheet>    
                                            )
                                        })
                                    )
                                })}
                            </ExcelFile>
                        </NavItem>
                    </Nav>
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>
    )
}

export default ExportDropdown;