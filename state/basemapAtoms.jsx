import { atom } from 'jotai';

export const basemapAtom = atom('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}');
export const activeBasemapAtom =  atom(0);
export const basemapPopperAtom = atom(false);