import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    CardHeader
} from 'reactstrap';

import ReactTable from "react-table";

const DataTable = ( props ) => {
    let {
        data,
        columns,
        pageSize,
        header,
        filterable,
        subComponentCallback,
        loading
    } = props;
    
    let cardTitle = null;
    

    if (header !== null) {
        cardTitle = (
            <CardHeader>
                <CardTitle>
                    {header}
                </CardTitle>
            </CardHeader>
            
        )
    }

    const filterCaseInsensitive = (filter, row) => {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined && row[id] != null ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            :
                true
        );
    }

    return (
        <Card className="main-card mb-3">
            {cardTitle}
            <CardBody>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className="-striped -highlight"
                    filterable={filterable ? true : false}
                    defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row) }
                    SubComponent={subComponentCallback ? (row) => subComponentCallback(row) : null}
                    loading={loading}
                    // LoadingComponent={Loader}
                />
            </CardBody>
        </Card>
    )
}

export default DataTable;