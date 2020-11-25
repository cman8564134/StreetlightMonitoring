import React from 'react';

import {Card, Row} from 'reactstrap';

import StreetlightStatusPerPhaseBox from './StreetlightStatusPerPhaseBox/StreetlightStatusPerPhaseBox';

const StreetlightStatusPerPhaseBoxes = ( props ) => {
    const {
        loading,
        statusByPhase
    } = props;

    const phaseColors = {
        R: "text-danger",
        Y: "text-warning",
        B: "text-info"
    }

    return (
        <Card className="main-card mb-3">
            {statusByPhase.map((statuses, index) => {
                const statusArray = [];
                for (let phase in statuses) {
                    statusArray.push({
                        id: phase,
                        data: statuses[phase]
                    });
                }
                
                return (
                    <Row key={index} className="no-gutters">
                        {statusArray.map((status, key) => {
                            const {
                                active,
                                inactive
                            } = status.data;

                            return (
                                <StreetlightStatusPerPhaseBox
                                    key={status.id} 
                                    loading={loading}
                                    title={status.id}
                                    totalActive={active}
                                    totalInactive={inactive}
                                    titleTextColor={phaseColors[status.id]}
                                />
                            )
                        })}
                        
                    </Row>
                )
            })}
        </Card>
    );
}

export default StreetlightStatusPerPhaseBoxes;