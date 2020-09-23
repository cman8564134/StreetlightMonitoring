import React, { Fragment } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';

import PageTitle from '../../Layout/PageTitle/PageTitle';
import DataTable from '../../Tables/DataTable/DataTable';


const BreakdownModal = ( props ) => {
    const {
        breadcrumbItems,
        data,
        tableColumns,
        loading,
        header
    } = props;

    return (
        <Fragment>
            <div style={{marginLeft: '25px', marginTop: '25px'}}>
                <PageTitle
                    heading = "Cost Breakdown"
                    icon = "pe-7s-home opacity-6"
                    enableBreadcrumb
                    breadcrumbItems = {breadcrumbItems}
                />
            </div>
            

            <div className="scroll-area-xl">
                <PerfectScrollbar>
                    <DataTable 
                        data={data}
                        columns={tableColumns}
                        pageSize={10}
                        header={header}
                        filterable
                        loading={loading}
                    />
                </PerfectScrollbar>
            </div>
        </Fragment>   
    )
}

export default BreakdownModal;