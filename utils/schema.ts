import { ObjectId } from "mongodb/dep"
import { testStatus } from "./interface.d.ts";

export interface UserSchema {
  _id?: ObjectId;
  username: string;
  password: string;
}

export interface TestSchema {
  uuid: string;
  parentUUID: string;
  title: string;
  fullTitle: string;
  duration: number;
  state: 'pass' | 'fail' | 'pending' | null;
  pass: boolean;
  pending: boolean;
  fail: boolean;
  code: string;
  err: {
    message: string;
    estack: string;
    diff: string;
  }
}

export interface MetaSchema {
  mocha: {
    version: string;
  }
  mochawesome: {
    version: string;
  }
  marge: {
    version: string;
  }
}

export interface CaseSchema {
  // from mochawesome
  uuid: string;
  title: string;
  fullFile: string;
  file: string;
  start: string;
  end: string;
  state: 'pass' | 'fail' | 'pending';
  passes: string[],
  failures: string[],
  pending: string[],
  duration: number;
  tests: TestSchema[];
  meta: MetaSchema;
  // custom fields
  author: string;
  caseURL: string;
  jobId: string;
  parentRunId: string;
  coreVersion: "V1/V2" | "V3";
  //from github
  os: "linux" | "windows" | "mac";
  nodeVersion: "v14" | "v16"
  targetType: "TS/JS" | "TS" | "JS";
  slowMethod: number;
}

export interface ReportSchema {
  // from github
  runid: string;
  // from mochawesome
  passes: number;
  failures: number;
  pending: number;
  duration: number;
  cases: CaseSchema[];
  // custom fields
  reportName: string;
  reportState: "GET" | "OUT_OF_DATA";
  reportId: number;
  reportStatus?: testStatus;
  reportDate: string;
  reportTime: string;
  casesCount: number;
}


export interface Fields {
  [key: string]: any;
}

export interface Filter {
  $ne?: null;
  [key: string]: any;
}

export interface aggregateOptions {
  $match?: Fields;
  $set?: Fields;
  $group?: Fields;
  $sort?: Fields;
  $sum?: Fields;
}

interface Hooks {
  title: string;
  fullTitle: string;
  timeOut: number;
  duration: number;
  state: 'pass' | 'fail' | 'pending'| null;
  speed: number | null;
  pass: boolean;
  pending: boolean;
  fail: boolean;
  context: string | null;
  code: string,
  err: {
    message: string;
    estack: string;
    diff: string;
  };
  uuid: string;
  parentUUID: string;
  isHook: boolean;
  skiped: boolean;
}

export interface MochawesomeData {
  stats:{
    suites: number;
    tests: number;
    passes: number;
    pending: number;
    failures: number;
    start: string;
    end: string;
    duration: number;
    testsRegistered: number;
    passPercent: number;
    other: number;
    hasOther: boolean;
    skipped: number;
    hasSkipped: boolean;
  },
  results: {
    uuid: string;
    title: string;
    fullFile: string;
    file: string;
    beforeHooks: string[];
    afterHooks: string[];
    tests: TestSchema[];
    suites: {
      uuid: string;
      title: string;
      fullFile: string;
      file: string;
      beforeHooks: Hooks[];
      afterHooks: Hooks[];
      tests: Hooks[];
      passes: string[];
      failures: string[];
      pending: string[];
      skipped: string[];
      duration: number;
      root: boolean;
      rootEmpty: boolean;
      _timeout: number;
    }[];
    passes: string[];
    failures: string[];
    pending: string[];
    skipped: string[];
    duration: number;
    root: boolean;
    rootEmpty: boolean;
    _timeout: number;
  }[],
  meta: {
    mocha: {
      version: string;
    },
    mochawesome: {
      options: {
        quiet: boolean;
        reoprtFilename: string;
        saveHtml: boolean;
        saveJson: boolean;
        consoleReporter: string;
        useInlineDiffs: boolean;
        code: boolean;
      },
      version: string;
    },
    marge: {
      version: string;
      options: Record<string, any> | null;
    }
  },
  author: string;
  caseURL: string;
  jobId: string;
  parentRunId: string;
  coreVersion: "V1/V2" | "V3";
  os: "linux" | "windows" | "mac";
  nodeVersion: "v14" | "v16"
  targetType: "TS/JS" | "TS" | "JS";
  slowMethod: number;
}
