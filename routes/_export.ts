// Imports route modules for serverless env that doesn't support the dynamic import.
// This module will be updated automaticlly in develoment mode, do NOT edit it manually.

import * as $0 from "./_404.tsx";
import * as $1 from "./_app.tsx";
import * as $2 from "./index.tsx";
import * as $3 from "./history.tsx";
import * as $4 from "./api/todayreportstatus.ts";
import * as $5 from "./api/historydata.ts";
import * as $6 from "./api/todayreport.ts";
import * as $7 from "./api/testdata.ts";
import * as $8 from "./api/testCase.ts";
import * as $9 from "./report/$reportId.tsx";

export default {
  "/_404": $0,
  "/_app": $1,
  "/": $2,
  "/history": $3,
  "/api/todayreportstatus": $4,
  "/api/historydata": $5,
  "/api/todayreport": $6,
  "/api/testdata": $7,
  "/api/testCase": $8,
  "/report/:reportId": $9,
};
