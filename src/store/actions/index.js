export {
    setEnableMobileMenu,
    setEnableClosedSidebar,
    setEnableMobileMenuSmall
} from './themeOptions';

export {
    fetchConcessions,
    fetchConcessionsSummary,
    fetchConcessionsPowerQualitySummaryChart,
    fetchConcessionsPowerUsageSummaryChart,
    fetchConcessionsWeeklyElectricityBillChart
} from './concessions'

export {
    fetchConcessionDetails,
    fetchSectionsByConcession,
    fetchConcessionRealTimeChart,
    fetchConcessionRealTimeElectricityBillChart,
    fetchWeather,
    fetchWeatherForecast
} from './concessionDetails'

export {
    fetchSectionDetails,
    fetchSubsectionsBySection,
    fetchSectionMetricCharts
} from './sectionDetails'

export {
    fetchSubsectionDetails,
    fetchRoadsBySubsection,
    fetchSubsectionMetricCharts
} from './subsectionDetails'

export {
    fetchRoadDetails,
    fetchFeederPillarsByRoad,
    fetchRoadMetricCharts
} from './roadDetails'

export {
    fetchFeederPillarDetails,
    fetchFeederPillarMetricCharts
} from './feederPillarDetails'

export {
    fetchConcessionNameMap,
    fetchElectricityBillCSVData,
    fetchCostBreakdownBySectionData,
    fetchElectricityCostBreakdownByLevel
} from './electricityBilling'

export {
    handleInputChanged
} from './formInput';

// export {
//     fetchSumOfSolarStatusForAllSite,
//     fetchLatestSolarStatusForEachSite,
//     fetchActiveInactiveSite,
//     fetchResolvedAlertCount
// } from './dashboard';

// export {
//     fetchSiteProfile,
//     fetchLatestSolarStatusBySite,
//     fetchAlert,
//     fetchSiteNameMap,
//     fetchWeeklyYieldChartData,
//     fetchHourlyPowerACChart,
//     fetchDailyYieldChartData,
//     fetchMonthlyYieldChartData,
//     fetchActiveInactiveDevice
// } from './dashboardDetails';

// export {
//     fetchInverterData
// } from './inverter';

export {
    fetchAlertOrderByDesc,
    fetchAlertById,
    fetchAlertStatusMasterCode,
    saveAlert,
    markAlertAsRead
} from './alert';

// export {
//     handleInputChanged
// } from './formInput';

export {
    fetchUserMaster,
    fetchUserMasterById,
    pushPasswordIntoFormElementArray,
    removePasswordFromFormElementArray,
    clearUserFormElement,
    saveUserMaster,
    deleteUserMaster,
    fetchUsers,
} from './userMaster';

// export {
//     fetchUserRoles,
//     fetchUserRoleById,
//     clearUserRoleFormElement,
//     saveUserRole,
//     deleteUserRole
// } from './userRoles';

// export {
//     fetchUserRoleAssignments,
//     fetchUserRoleAssignmentById,
//     clearUserRoleAssignmentFormElement,
//     saveUserRoleAssignment,
//     deleteUserRoleAssignment,
//     fetchUserMapWithIdAsKey,
//     fetchRoleMapWithIdAsKey
// } from './userRoleAssignments';

// export {
//     fetchAlertConfigs,
//     fetchAlertConfigById,
//     clearAlertConfigFormElement,
//     saveAlertConfig,
//     deleteAlertConfig,
// } from './alertConfig';

// export {
//     fetchSites,
//     fetchSiteById,
//     clearSiteFormElement,
//     saveSite,
//     deleteSite,
// } from './site';

// export {
//     fetchParameterConfigs,
//     fetchParameterConfigById,
//     clearParameterConfigFormElement,
//     saveParameterConfig,
//     deleteParameterConfig,
// } from './parameterConfig';

export {
    fetchReportConcessionNameMap,
    fetchReportSectionNameMapByConcessionId,
    fetchSubsectionNameMapBySectionId,
    fetchFeederPillarNameMapBySubsectionId,
    fetchReportData,
    // fetchReportCSVData
} from './report';

export {
    authentication,
    logout,
    authCheckState,
    fetchUnreadNotification
} from './authentication';