// deno-lint-ignore-file no-explicit-any
import { ObjectId } from "mongodb/dep"
import { testStatus } from "./interface.d.ts";

export interface UserSchema {
  _id?: ObjectId;
  username: string;
  password: string;
}

export enum reportNameEnum {
  '01' = 'CLI e2e test',
  '02' = 'vsx UI test',
  '03' = 'performance test',
  '04' = 'vs UI test',
  '05' = 'sdk e2e test',
  '06' = 'CI/CD e2e test'
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
  // from basic data
  basic: {
    author?: string;
    title: string;
    uploadTime?: Date;
    reportId: '01' | '02' | '03' | '04' | '05' | '06';
    reportName?: string;
  };
  // from git data
  git: {
    orginazation?: string;
    repository?: string;
    commit?: string;
    author?: string;
    branch?: string;
    date?: Date;
  };
  // from github data
  github?: {
    os?: string;
    nodeVersion?: string;
    targetType?: string;
    on: string;
    coreVersion?: string;
    jobId: string;
    runId: string;
    caseURL?: string;
    duration?: number;
    slowMethod?: number;
  };
  // from mochawesome data
  mochawesome?: MochawesomeData;
  azure?: {[key: string]: any};
}

export interface ReportSchema {
  // from github runtime
  github?: {
    runId: string;
    on: 'schedule' | 'workflow_dispatch' | 'pull_request';
  }
  // from mochawesome
  mochawesome?: {
    passes: number;
    failures: number;
    pending: number;
    cases: CaseSchema[];
  }
  // custom fields
  reportName: string;
  reportState: "GET" | "OUT_OF_DATA";
  reportId: string;
  reportStatus?: testStatus;
  reportDate: string;
  reportStartTime: Date;
  reportEndTime: Date;
  duration: number;
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
  state: 'pass' | 'fail' | 'pending' | null;
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

export interface GitData {
  orginazation?: string;
  repository?: string;
  commit?: string;
  author?: string;
  branch?: string;
  date?: Date;
}

export interface TestCaseData {
  author?: string;
  title: string;
  uploadTime?: Date;
  reportId: '01' | '02' | '03' | '04' | '05' | '06';
  reportName?: string;
}

export interface GithubData {
  caseURL: string;
  jobId: string;
  runId: string;
  coreVersion: "V1/V2" | "V3";
  os: "linux" | "windows" | "mac";
  nodeVersion: "v14" | "v16"
  targetType: "TS/JS" | ".NET";
  slowMethod: number;
  duration: number;
  on: 'schedule' | 'workflow_dispatch' | 'pull_request';
}

export interface AzureData {
  [key: string]: any;
}

export interface MochawesomeData {
  stats?: {
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
    beforeHooks?: string[];
    afterHooks?: string[];
    tests?: TestSchema[];
    suites: {
      uuid: string;
      title: string;
      fullFile: string;
      file: string;
      beforeHooks?: Hooks[];
      afterHooks?: Hooks[];
      tests: Hooks[];
      passes: string[];
      failures: string[];
      pending?: string[];
      skipped: string[];
      duration: number;
      root?: boolean;
      rootEmpty?: boolean;
      _timeout?: number;
    }[];
    passes: string[];
    failures: string[];
    pending?: string[];
    skipped?: string[];
    duration: number;
    root?: boolean;
    rootEmpty?: boolean;
    _timeout?: number;
  }[],
  meta?: {
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
  targetType: "TS/JS" | ".NET";
  slowMethod: number;
}

