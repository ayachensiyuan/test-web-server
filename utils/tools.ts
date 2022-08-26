import { testCaseInterface } from "./interface.d.ts"
import { config } from 'dotenv'
//     statusIcon = 'check_circle'
//     statusIcon = 'report_problem'
//     statusIcon = 'highlight_off'
export const changeStatusIcon = (caseItems?: testCaseInterface[]) => {
    if(caseItems) {
    for(let i = 0; i < caseItems.length; i++) {
        if(caseItems[i].caseStatus == 'passed') {
            caseItems[i].statusIcon = 'check_circle'
            caseItems[i].statusIconColor = 'green'
        } else if(caseItems[i].caseStatus == 'failed') {
            caseItems[i].statusIcon = 'highlight_off'
            caseItems[i].statusIconColor = 'red'
        } else {
            caseItems[i].statusIcon = 'report_problem'
            caseItems[i].statusIconColor = 'yellow'
        }
    }
    return caseItems
    }
}

export const getEnv = (key: string) => {
    if(Deno.env.get(key)) {
        return Deno.env.get(key) as string
    } else {
        config({
            path: './test-web-server/.env',
            export: true
        })
        return Deno.env.get(key) as string
    }
}

export const verifyToken = (headers: Headers) => {
    const token = headers.get('authorization')?.split(' ')[1]
    if(token === getEnv("ACCESS_TOKEN")) {
        return true
    } else {
        return false
    }
}

