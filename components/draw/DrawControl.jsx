import React, { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import { polygonCoordinatesAtom } from '@/state/atoms';
import DrawControlButtons from './DrawControlButtons';
import ActionButtons from './ActionButtons';
import DeleteDialog from './DeleteDialog';
import AreaDialog from './AreaDialog';
import UploadDialog from './UploadDialog';
import { areaTypeAtom, areaIdAtom, geojsonDataAtom } from '@/state/atoms';

export default function DrawControl() {
  const [showActions, setShowActions] = useState(false);
  const [drawLayer, setDrawLayer] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mapClickHandler, setMapClickHandler] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useAtom(polygonCoordinatesAtom);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [polygonArea, setPolygonArea] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [, setAreaType] = useAtom( areaTypeAtom);
  const [, setAreaId] = useAtom(areaIdAtom);
  const [tempGeomData, setTempGeomData] = useState(null); 
  const [geomData, setGeojsonData] = useAtom(geojsonDataAtom);
  
  const map = useMap();

  const handleDrawClick = useCallback((e) => {
    e.stopPropagation(); 
    setShowActions(true);
    setIsDrawing(true);

    if (!drawLayer) {
      const newLayer = L.polygon([]).addTo(map);
      setDrawLayer(newLayer);

      const onMapClick = (e) => {
        if (!e || !e.latlng) return; // Guard against null event

        const latlngs = newLayer.getLatLngs()[0] || [];
        if (latlngs.length === 0 || !latlngs[latlngs.length - 1].equals(e.latlng)) {
          newLayer.addLatLng(e.latlng);

          // Store coordinates in Jotai atom
          setPolygonCoordinates([...latlngs, e.latlng]);
        }
      };

      map.on('click', onMapClick);
      setMapClickHandler(onMapClick);
    }
  }, [drawLayer, isDrawing, map, setPolygonCoordinates]);

  const handleFinishClick = useCallback((e) => {
    e.stopPropagation(); // Prevent the map click event

    if (drawLayer && isDrawing) {
      let latlngs = drawLayer.getLatLngs()[0];
      
      if (latlngs.length > 0) {
        latlngs.pop();
      }
      
      if (latlngs.length >= 2) {
        latlngs.push(latlngs[0]); 
        drawLayer.setLatLngs([latlngs]);
        drawLayer.redraw(); 

        // Store final coordinates in Jotai atom
        setPolygonCoordinates(latlngs);

        // Define style as a constant
        const polygonStyle = {
          color: '#2563eb', 
          weight: 2,
          opacity: 1,
          fillColor: '#2563eb', 
          fillOpacity: 0.0 
        };

        const geoJson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [latlngs.map(latlng => [latlng.lng, latlng.lat])]
              }
            }
          ]
        };

        // Add GeoJSON layer to the map
        const geoJsonLayer = L.geoJSON(geoJson, {
          style: polygonStyle,
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              setDialogOpen(true);
              setShowActions(false);
            });
          }
        }).addTo(map);

        // Fit map bounds to the GeoJSON layer
        const bounds = geoJsonLayer.getBounds();
        map.fitBounds(bounds);

        const coordinates = latlngs.map(coord => [coord.lng, coord.lat]);
        const polygon = turf.polygon([[...coordinates]]);

        // Calculate the area in square meters
        const areaInSquareMeters = turf.area(polygon);
        
        // Convert to hectares
        const areaInHectares = turf.convertArea(areaInSquareMeters, 'meters', 'hectares');
      
        setPolygonArea(areaInHectares); 
        setDialogOpen(true);

        // Store temporary GeoJSON data
        setTempGeomData(geoJson);
        
        // Remove existing draw layer
        if (drawLayer) {
          map.removeLayer(drawLayer);
          setDrawLayer(null);
        }
        map.off('click', mapClickHandler); // Stop drawing
        setShowActions(false);
        setIsDrawing(false);
      } else {
        console.error("Polygon must have at least two unique points.");
      }
    }
  }, [drawLayer, isDrawing, map, mapClickHandler, setPolygonCoordinates, setTempGeomData]);

  const handleCancelClick = useCallback((e) => {
    e.stopPropagation(); // Prevent the map click event
    if (drawLayer) {
      map.removeLayer(drawLayer);
      setDrawLayer(null);
    }
    map.off('click', mapClickHandler); // Stop drawing
    setShowActions(false);
    setIsDrawing(false);
  }, [drawLayer, map, mapClickHandler]);

  const handleDeleteClick = useCallback(() => {
    setOpenDeleteDialog(true);
    setShowActions(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        map.removeLayer(layer);
      }
    });
    setPolygonCoordinates([]);
    setOpenDeleteDialog(false);
  }, [map, setPolygonCoordinates]);

  const handleCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false);
  }, []);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  const handleUpload = useCallback((geojsonData) => {
    try {
      // Define the polygon style
      const polygonStyle = {
        color: '#2563eb', 
        weight: 2,
        opacity: 1,
        fillColor: '#2563eb', 
        fillOpacity: 0.0 
      };
  
      // Add GeoJSON layer to the map
      const geoJsonLayer = L.geoJSON(geojsonData, {
        style: polygonStyle,
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            setDialogOpen(true);
            setShowActions(false);
          });
        }
      }).addTo(map);

      // Fit map bounds to the GeoJSON layer
      const bounds = geoJsonLayer.getBounds();
      map.fitBounds(bounds);
  
      // Calculate area using Turf.js
      const areaInSquareMeters = geojsonData.features.reduce((totalArea, feature) => {
        if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
          const area = turf.area(feature);  // Calculate area of each feature
          return totalArea + area;  // Sum areas of all features
        }
        return totalArea;
      }, 0);
  
      const areaInHectares = turf.convertArea(areaInSquareMeters, 'meters', 'hectares');
      setPolygonArea(areaInHectares);
      setDialogOpen(true);
      // Store temporary GeoJSON data
      setTempGeomData(geojsonData);
      // console.log(areaInHectares);
    } catch (error) {
      console.error('Error processing GeoJSON/KML data:', error);
    }
  }, [map, setPolygonArea, setDialogOpen, setShowActions]);
  
  const handleGenerateInsights = useCallback(async () => {
    try {
      if (tempGeomData && tempGeomData.features && tempGeomData.features.length > 0) {
        const lastFeature = tempGeomData.features[tempGeomData.features.length - 1]; // Get the last feature
        
        // Create a new GeoJSON object with only the last feature
        const lastGeomData = {
          type: 'FeatureCollection',
          features: [lastFeature] // Only the last feature
        };
        setAreaType('custom');
        setAreaId('custom');
        setGeojsonData(lastGeomData); // Update Jotai state with only the last feature
      }
      // Close the dialog after processing
      setDialogOpen(false);
    } catch (error) {
      console.error('Error generating insights:', error);
    }
  }, [setAreaType, setAreaId, setGeojsonData, tempGeomData, setDialogOpen]);

  return (
    <>
      <DrawControlButtons
        onDrawClick={handleDrawClick}
        onUploadClick={handleOpenUploadDialog}
        onDeleteClick={handleDeleteClick}
      />
      {showActions && (
        <ActionButtons
          onFinishClick={handleFinishClick}
          onCancelClick={handleCancelClick}
        />
      )}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
      <AreaDialog 
        open={dialogOpen} 
        handleClose={handleCloseDialog} 
        handleGenerateInsights={handleGenerateInsights}
        area={polygonArea} 
      />
      <UploadDialog 
        open={uploadDialogOpen} 
        onClose={handleCloseUploadDialog} 
        onUpload={handleUpload} 
      />
    </>
  );
}