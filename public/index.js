import { Gantt } from "./gantt.module.js";

const gantt = new Gantt({
  appendTo: "app",

  columns: [{ type: "name", field: "name", width: 250 }],
  viewPreset: "weekAndDayLetter",
  barMargin: 10,
  project: {
    taskStore: {
      transformFlatData: true,
    },
    loadUrl: "http://localhost:1337/load",
    autoLoad: true,
    syncUrl: "http://localhost:1337/sync",
    autoSync: true,
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production.
    validateResponse: true,
  },
});
