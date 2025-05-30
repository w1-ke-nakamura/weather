import React from "react";
import PropTypes from "prop-types";

function RegionSelector({ regions, selectedRegion, onSelect }) {
  return (
    <div>
      <h2>地方名を選択</h2>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {regions.map((region) => (
          <div
            key={region}
            onClick={() => onSelect(region)}
            style={{
              background: region === selectedRegion ? "#007bff" : "#f0f0f0",
              color: region === selectedRegion ? "#fff" : "#000",
              cursor: "pointer",
              padding: "0.3rem",
            }}
          >
            {region}
          </div>
        ))}
      </div>
    </div>
  );
}

RegionSelector.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedRegion: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default RegionSelector;
