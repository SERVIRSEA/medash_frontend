export const API_ENDPOINTS = {
    LANDCOVER: {
        MAP: '/api/v1/landcover/map/',
        DOWNLOAD: '/api/v1/landcover/map/download/',
        CHART: '/api/v1/landcover/chart/',
    },
    EVI: {
        MAP: '/api/v1/evi/map/',
        DOWNLOAD: '/api/v1/evi/map/download/',
        CHART_PIE: '/api/v1/evi/chart/pie/',
        CHART_LINE: '/api/v1/evi/chart/line/',
    },
    FOREST: {
        FOREST_COVER_MAP: '/api/v1/forest/cover/map/',
        FOREST_GAIN_MAP: '/api/v1/forest/gain/map/',
        FOREST_LOSS_MAP: '/api/v1/forest/loss/map/',
        DOWNLOAD_FOREST_COVER: '/forest/cover/download/',
        DOWNLOAD_FOREST_GAIN: '/forest/gain/download/',
        DOWNLOAD_FOREST_LOSS: '/forest/loss/download/',
        CHART: '/forest/chart',
    },
    FOREST_ALERT: {
        GLAD_ALERT: {
            MAP: '/api/v1/glad/alert/map/',
            DOWNLOAD: '/api/v1/glad/alert/map/download/',
            CHART: '/api/v1/glad/alert/chart/',
        }, 
        SARFDAS_ALERT: {
            MAP: '/api/v1/sarfdas/alert/map/',
            DOWNLOAD: '/api/v1/sarfdas/alert/map/download/',
            CHART: '/api/v1/sarfdas/alert/chart/',
        }
    },
    FIRE: {
        MAP: '/api/v1/fire/map/',
        DOWNLOAD: '/api/v1/fire/map/download/',
        CHART: '/api/v1/fire/chart/',
    },
    CROP: {
        RICE:{
            MAP: '/api/v1/rice/map/',
            DOWNLOAD: '/api/v1/rice/map/download/',
            CHART: '/api/v1/rice/chart/',
        },
        RUBBER:{
            MAP: '/api/v1/rubber/map/',
            DOWNLOAD: '/api/v1/rubber/map/download/',
            CHART: '/api/v1/rubber/chart/',
        }
    },
    CLIMATE: {
        MAP: '/api/v1/climate/map/',
        DOWNLOAD: '/api/v1/climate/map/download/',
        CHART: '/api/v1/climate/chart/',
    },
};