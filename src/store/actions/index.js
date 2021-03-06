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
    fetchConcessionsWeeklyElectricityBillChart,
    fetchConcessionNameMap
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
    fetchSectionBySectionId,
    fetchSectionDetails,
    fetchSubsectionsBySection,
    fetchSectionMetricCharts
} from './sectionDetails'

export {
    fetchSubsectionBySubsectionId,
    fetchSubsectionDetails,
    fetchRoadsBySubsection,
    fetchSubsectionMetricCharts
} from './subsectionDetails'

export {
    fetchRoadByRoadId,
    fetchRoadDetails,
    fetchFeederPillarsByRoad,
    fetchRoadMetricCharts
} from './roadDetails'

export {
    getTrafficLightInfo,
    postNewTrafficLightInfo
} from './trafficLightForm'

export {
    fetchFeederPillarByFeederPillarId,
    fetchFeederPillarDetails,
    fetchFeederPillarMetricCharts
} from './feederPillarDetails'

export {
    fetchElectricityBillCSVData,
    fetchCostBreakdownBySectionData,
    fetchElectricityCostBreakdownByLevel,
    resetBreakdownLevel
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
    saveAlert,
    markAlertAsRead,
    fetchAlertByAlertCode
} from './alert';

// export {
//     handleInputChanged
// } from './formInput';

export {
    fetchUserMap,
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
    fetchReportSectionNameMapByConcessionId,
    fetchSubsectionNameMapBySectionId,
    fetchRoadNameMapBySubsectionId,
    fetchFeederPillarNameMapByRoadId,
    fetchReportData,
    // fetchReportCSVData
    fetchReportChartDataByActiveTab,
    fetchExportableReportData
} from './report';

export {
    authentication,
    logout,
    authCheckState,
    fetchUnreadNotification,
    checkUserConcessionId
} from './authentication';

export {
    fetchMasterCodeMapByMasterCode
} from './masterCode';

export {
    fetchImbalanceAmpereChartData
} from './analytics';

export {
    fetchConcessionNavItems,
    updateCustomMultiLevelMenuExpandState,
    updateMainNavItemByUserConcessionId
} from './navigation';

export {
    fetchAlertAndRemarksOrderByDesc,
    fetchTicketById,
    saveTicket,
    fetchTicketByAlertCode
} from './tickets';