import db from "../db/index.js"
import {urlsTable} from "../models/url.model.js"

export async function insertUrl(id, url, shortCode) {
    

  const [result] = await db.insert(urlsTable).values({
        shortCode,
        targetURL: url,
        userId: id,

    }).returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetURL: urlsTable.targetURL
    });
    return result;

}