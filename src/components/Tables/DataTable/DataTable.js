import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    CardSubtitle,
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
        loading,
        subtitle
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

    let cardSubtitle = null;
    
    if (subtitle !== null) {
        cardSubtitle = (
            <CardSubtitle>{subtitle}</CardSubtitle>
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
                {cardSubtitle}
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className="-striped -highlight"
                    filterable={filterable ? true : false}
                    defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row) }
                    SubComponent={subComponentCallback ? (row) => subComponentCallback(row) : null}
                    loading={loading}
                    collapseOnDataChange={false}
                    collapseOnPageChange={false}
                    // LoadingComponent={Loader}
                />
            </CardBody>
        </Card>
    )
}

export default DataTable;