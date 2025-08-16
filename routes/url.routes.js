import express from 'express';
import {shortenPostRequestBodySchema} from "../validations/request.validation.js"
const router = express.Router()
import { nanoid } from 'nanoid';
import db from "../db/index.js"
import {urlsTable} from "../models/url.model.js"
import {ensureAuthenticated} from "../middlewares/auth.middleware.js"
import { insertUrl } from '../services/url.service.js';
import { eq } from 'drizzle-orm';

router.get('/codes', ensureAuthenticated, async function (req, res) {
    const codes = await db.select().from(urlsTable).where(eq(urlsTable.userId, req.user.id));
    return res.json({codes});
})

router.get('/:shortCode', async function(req, res) {
    const code = req.params.shortCode
    const [result] = await db.select({targetURL: urlsTable.targetURL}).from(urlsTable).where(eq(urlsTable.shortCode, code))

    if (!result) {
        return res.status(404).json({ error: 'Invalid URL' });
    }
    return res.redirect(result.targetURL)
})



router.post('/shorten', ensureAuthenticated, async function(req, res) {
    const userID = req.user?.id;
     console.log('Verifying User ID:', `'${userID}'`);
    console.log('Verifying User ID Length:', userID?.length);
const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error });
    }

    const {url, code} = validationResult.data;

    const shortCode = code ?? nanoid(6);

    const result = await insertUrl(req.user.id, url, shortCode)

    return res.status(201).json({id:result.id, shortCode: result.shortCode, targetURL: result.targetURL})
})

export default router;