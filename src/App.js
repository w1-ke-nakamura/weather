import React, { useState } from "react";
import PropTypes from "prop-types";
import { cityCodeData } from "./CityCodes";
import RegionSelector from "./components/RegionSelector";
import PrefSelector from "./components/PrefSelector";
import CitySelector from "./components/CitySelector";
import WeatherResultList from "./components/WeatherResultList";

const regionData = {
  北海道: ["北海道"],
  東北: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  関東甲信越: [
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "山梨県",
    "長野県",
    "新潟県",
  ],
  東海北陸近畿: [
    "愛知県",
    "岐阜県",
    "三重県",
    "富山県",
    "石川県",
    "福井県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
  ],
  中国四国: [
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "香川県",
    "徳島県",
    "愛媛県",
    "高知県",
  ],
  九州沖縄: [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ],
};

function App({
  title,
  defaultRegion = "",
  defaultPref = "",
  defaultCity = "",
}) {
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion);
  const [selectedPref, setSelectedPref] = useState(defaultPref);
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [allWeatherData, setAllWeatherData] = useState([]);
  const [loadingAllData, setLoadingAllData] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredDayIndex, setFilteredDayIndex] = useState(null);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedPref("");
    setSelectedCity("");
    setFilteredResults([]);
  };

  const handlePrefClick = (pref) => {
    setSelectedPref(pref);
    setSelectedCity("");
    setFilteredResults([]);
  };

  const handleCityClick = async (city) => {
    setSelectedCity(city);
    const cityCode = cityCodeData[selectedRegion][selectedPref][city];
    const res = await fetch(
      `https://weather.tsukumijima.net/api/forecast?city=${cityCode}`
    );
    const data = await res.json();
    setFilteredResults([
      { region: selectedRegion, pref: selectedPref, city, data },
    ]);
    setFilteredDayIndex(null);
  };

  const fetchAllWeatherData = async () => {
    setLoadingAllData(true);
    const promises = [];

    for (const region of Object.keys(cityCodeData)) {
      for (const pref of Object.keys(cityCodeData[region])) {
        for (const city of Object.keys(cityCodeData[region][pref])) {
          const cityCode = cityCodeData[region][pref][city];
          promises.push(
            fetch(
              `https://weather.tsukumijima.net/api/forecast?city=${cityCode}`
            )
              .then((res) => res.json())
              .then((data) => ({ region, pref, city, data }))
          );
        }
      }
    }

    const results = await Promise.all(promises);
    setAllWeatherData(results);
    setLoadingAllData(false);
  };

  const filterByRain = (dayIndex) => {
    const rainyAreas = allWeatherData.filter((entry) => {
      const forecast = entry.data.forecasts?.[dayIndex];
      return forecast && forecast.telop.includes("雨");
    });
    setFilteredResults(rainyAreas);
    setFilteredDayIndex(dayIndex);
  };

  const sortByHighTemp = () => {
    const sorted = allWeatherData
      .map((entry) => {
        const max = entry.data.forecasts?.[0]?.temperature?.max?.celsius;
        return {
          ...entry,
          maxTemp: max ? parseFloat(max) : -Infinity,
        };
      })
      .filter((e) => e.maxTemp !== -Infinity)
      .sort((a, b) => b.maxTemp - a.maxTemp)
      .slice(0, 20);

    setFilteredResults(sorted);
    setFilteredDayIndex(0);
  };

  const prefList = selectedRegion
    ? Object.keys(cityCodeData[selectedRegion])
    : [];
  const cityList = selectedPref
    ? Object.keys(cityCodeData[selectedRegion][selectedPref])
    : [];

  return (
    <div>
      <h1>{title || "天気予報アプリ"}</h1>

      <RegionSelector
        regions={Object.keys(regionData)}
        selectedRegion={selectedRegion}
        onSelect={handleRegionClick}
      />

      {selectedRegion && (
        <PrefSelector
          prefs={prefList}
          selectedPref={selectedPref}
          onSelect={handlePrefClick}
          region={selectedRegion}
        />
      )}

      {selectedPref && (
        <CitySelector
          cities={cityList}
          selectedCity={selectedCity}
          onSelect={handleCityClick}
          pref={selectedPref}
        />
      )}

      <div style={{ marginTop: "2rem" }}>
        <button onClick={fetchAllWeatherData}>全地方名の天気を取得</button>
        {loadingAllData && <p>取得中...</p>}
        {allWeatherData.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <button onClick={() => filterByRain(0)}>今日の雨の地方名</button>
            <button onClick={() => filterByRain(1)}>明日の雨の地方名</button>
            <button onClick={() => filterByRain(2)}>明後日の雨の地方名</button>
            <button onClick={sortByHighTemp}>気温が高い上位20地方名</button>
          </div>
        )}
      </div>

      {filteredResults.length > 0 && (
        <WeatherResultList
          results={filteredResults}
          dayIndex={filteredDayIndex}
        />
      )}
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string,
  defaultRegion: PropTypes.string,
  defaultPref: PropTypes.string,
  defaultCity: PropTypes.string,
};

export default App;
