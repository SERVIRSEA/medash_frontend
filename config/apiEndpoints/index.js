import { LANDCOVER_ENDPOINTS } from './landcoverEndpoints';
import { EVI_ENDPOINTS } from './eviEndpoints';
import { FOREST_ENDPOINTS } from './forestEndpoints';
import { FOREST_ALERT_ENDPOINTS } from './forestAlertEndpoints';
import { FIRE_ENDPOINTS } from './fireEndpoints';
import { CROP_ENDPOINTS } from './cropEndpoints';
import { CLIMATE_ENDPOINTS } from './climateEndpoints';
import { FEEDBACK_ENDPOINTS } from './feedbackEndpoints';
import { ACTIVE_FIRE_ENDPOINTS } from './activeFireEndpoints';

export const API_ENDPOINTS = {
    LANDCOVER: LANDCOVER_ENDPOINTS,
    EVI: EVI_ENDPOINTS,
    FOREST: FOREST_ENDPOINTS,
    FOREST_ALERT: FOREST_ALERT_ENDPOINTS,
    FIRE: FIRE_ENDPOINTS,
    ACTIVE_FIRE: ACTIVE_FIRE_ENDPOINTS,
    CROP: CROP_ENDPOINTS,
    CLIMATE: CLIMATE_ENDPOINTS,
    FEEDBACK: FEEDBACK_ENDPOINTS
};
