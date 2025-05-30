// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App.js がこの階層にある前提

// ルート DOM ノードを取得
const rootElement = document.getElementById("root");

// React 18 以降の createRoot API を使用
const root = ReactDOM.createRoot(rootElement);

// App コンポーネントを描画
root.render(
  <React.StrictMode>
    <App
      title="天気予報アプリ"
      defaultRegion=""
      defaultPref=""
      defaultCity=""
    />
  </React.StrictMode>
);
