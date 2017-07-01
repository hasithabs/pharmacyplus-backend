import { Router } from 'express'

import drugcategory from './drugcategory'
import drugdosage from './drugdosage'
import drugfrequency from './drugfrequency'
import stock from './stock'
import batch_handle from './batch_handle'
import notification from './notification'
import prescription from './prescription'
import prescriptiontimes from './prescriptiontimes'
import prescriptiondurations from './prescriptiondurations'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

router.use('/drugcategory', drugcategory)
router.use('/drugdosage', drugdosage)
router.use('/drugfrequency', drugfrequency)
router.use('/stock', stock)
router.use('/batches', batch_handle)
router.use('/notification', notification)
router.use('/prescription', prescription)
router.use('/prescriptiontimes', prescriptiontimes)
router.use('/prescriptiondurations', prescriptiondurations)

export default router
