// Imports route modules for serverless env that doesn't support the dynamic import.
// This module will be updated automaticlly in develoment mode, do NOT edit it manually.

import * as $0 from "./_404.tsx";
import * as $1 from "./_app.tsx";
import * as $2 from "./index.tsx";
import * as $3 from "./history.tsx";
import * as $4 from "./api/historydata.ts";
import * as $5 from "./api/testdata.ts";
import * as $6 from "./api/testCase.ts";
import * as $7 from "./report/$reportId.tsx";
import * as $8 from "./api/report/index.ts";
import * as $9 from "./api/report/$reportId.ts";

export default {
  "/_404": $0,
  "/_app": $1,
  "/": $2,
  "/history": $3,
  "/api/historydata": $4,
  "/api/testdata": $5,
  "/api/testCase": $6,
  "/report/:reportId": $7,
  "/api/report/index": $8,
  "/api/report/:reportId": $9,
};
