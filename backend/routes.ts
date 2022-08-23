import { Router }from "https://deno.land/x/oak@v11.0.0/mod.ts"
import { getTestData } from './controller.ts'

const router = new Router()
router.get('/api/gettestdata', getTestData)

export default router