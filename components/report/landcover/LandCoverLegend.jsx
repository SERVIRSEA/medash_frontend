import React from 'react';

const LandCoverLegend = () => {
  const classNames = [
    'built-up area', 'mangrove', 'other Plantation', 'water', 'shrub', 'rice', 'cropland', 'grass',
    'evergreen', 'deciduous', 'wetland', 'rubber', 'flooded Forest', 'semi-evergreen', 'village', 'others'
  ];
  const palette = [
    'E600A9', 'FFFF00', 'c49963', '004DA8', '89CD66', 'fefdbd', 'FFD37F', 'D7C29E', '267300', '71a405',
    '86d8dc', 'AAFF00', 'b3d59f', '38A800', 'A900E6', 'f0f8ff'
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

  return (
    <div style={{ padding: '10px', fontSize: '14px' }}>
      <h3>Land Cover Legend</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {classNames.map((name, index) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: `#${palette[index]}`,
                marginRight: '10px',
                borderRadius: '50%',
              }}
            ></div>
            <span>{capitalizeFirstLetter(name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandCoverLegend;
