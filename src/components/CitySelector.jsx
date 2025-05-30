import React from "react";
import PropTypes from "prop-types";

function CitySelector({ cities, selectedCity, onSelect, pref }) {
  return (
    <>
      <h2 style={{ marginTop: "1rem" }}>{pref} の地方名</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {cities.map((city) => (
          <div
            key={city}
            onClick={() => onSelect(city)}
            style={{
              background: city === selectedCity ? "#FF0000" : "#f0f0f0",
              color: city === selectedCity ? "#fff" : "#000",
              cursor: "pointer",
              padding: "0.3rem",
            }}
          >
            {city}
          </div>
        ))}
      </div>
    </>
  );
}

CitySelector.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCity: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  pref: PropTypes.string.isRequired,
};

export default CitySelector;
