const baseChartOptions = () => {
    return {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            curve: 'smooth'
        },
        labels: ["1/7/2020", "2/7/2020", "3/7/2020", "4/7/2020", "5/7/2020", "6/7/2020", "7/7/2020"],
        markers: {
            size: 0
        },
        xaxis: {
            // type:'datetime'
        },
        yaxis: {
            title: {
                text: 'Power Usage',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if(typeof y !== "undefined") {
                        return  y.toFixed(2);
                    }
                    return y;
    
                }
            }
        }
    }
}

const baseChartSeries = () => {
    return [{
        name: 'Power Usage',
        type: 'line',
        data: [2000, 2100,2050,1800,2200,2100,2000]
    }]
} 

const initialState = {
    concessions: [
        {id: 1, concession_name: "ABC Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
        {id: 2, concession_name: "DEF Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
        {id: 3, concession_name: "GHI Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
        {id: 4, concession_name: "JKL Sdn Bhd", power_usage: "1000", uptime_percentage: "100", downtime_percentage: "0", electrical_bill: "10,000", carbon_footprint: "2000", energy_savings: "2500"},
    ],
    concessionsChart:{
        1: {chart_options: baseChartOptions(), chart_series: baseChartSeries()},
        2: {chart_options: baseChartOptions(), chart_series: baseChartSeries()},
        3: {chart_options: baseChartOptions(), chart_series: baseChartSeries()},
        4: {chart_options: baseChartOptions(), chart_series: baseChartSeries()},
    }
    
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;