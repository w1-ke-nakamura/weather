import React from "react";
import PropTypes from "prop-types";

function WeatherResultList({ results, dayIndex }) {
  const renderForecast = (entry) => {
    if (dayIndex !== null) {
      const f = entry.data.forecasts[dayIndex];
      return (
        <div>
          {f.dateLabel}: {f.telop}（
          {f.temperature?.max?.celsius ?? "-"}℃ /{" "}
          {f.temperature?.min?.celsius ?? "-"}℃）
        </div>
      );
    } else {
      return entry.data.forecasts.map((f, i) => (
        <div key={i}>
          {f.dateLabel}: {f.telop}（
          {f.temperature?.max?.celsius ?? "-"}℃ /{" "}
          {f.temperature?.min?.celsius ?? "-"}℃）
        </div>
      ));
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>
        {results.length === 1 && dayIndex === null
          ? `${results[0].pref} ${results[0].city} の天気`
          : "表示結果"}
      </h2>
      <ul>
        {results.map((entry, idx) => (
          <li key={idx}>
            <strong>
              {entry.region} - {entry.data.location.prefecture}
              {entry.data.location.prefecture === entry.data.location.district
                ? ""
                : ` ${entry.data.location.district}`} - {entry.data.location.city} の天気
            </strong>
            <br />
            {renderForecast(entry)}
          </li>
        ))}
      </ul>
    </div>
  );
}

WeatherResultList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      region: PropTypes.string.isRequired,
      pref: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      data: PropTypes.shape({
        location: PropTypes.shape({
          prefecture: PropTypes.string.isRequired,
          district: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
        }),
        forecasts: PropTypes.arrayOf(
          PropTypes.shape({
            dateLabel: PropTypes.string,
            telop: PropTypes.string,
            temperature: PropTypes.shape({
              max: PropTypes.shape({ celsius: PropTypes.string }),
              min: PropTypes.shape({ celsius: PropTypes.string }),
            }),
          })
        ),
      }),
    })
  ).isRequired,
  dayIndex: PropTypes.number,
};

export default WeatherResultList;
