import React from "react";
import PropTypes from "prop-types";

function PrefSelector({ prefs, selectedPref, onSelect, region }) {
  return (
    <>
      <h2 style={{ marginTop: "1rem" }}>{region} の都道府県を選択</h2>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {prefs.map((pref) => (
          <div
            key={pref}
            onClick={() => onSelect(pref)}
            style={{
              background: pref === selectedPref ? "#28a745" : "#f0f0f0",
              color: pref === selectedPref ? "#fff" : "#000",
              cursor: "pointer",
              padding: "0.3rem",
            }}
          >
            {pref}
          </div>
        ))}
      </div>
    </>
  );
}

PrefSelector.propTypes = {
  prefs: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPref: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  region: PropTypes.string.isRequired,
};

export default PrefSelector;
