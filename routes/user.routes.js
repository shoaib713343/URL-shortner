import express from 'express'
import db from '../db/index.js'
import { usersTable } from '../models/user.model.js'
import { eq } from 'drizzle-orm'
const router = express.Router()
import {signupPostRequestBodySchema} from "../validations/request.validation.js"
import {hashedPasswordWithSalt} from "../utils/hash.js"
import {getUserByEmail} from "../services/user.service.js"

router.post('/signup', async (req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error) {
        return res.status(400).json({ error: validationResult.error.format() })
    }

    const { firstname, lastname, email, password } = validationResult.data;
    


   const {existingUser}= getUserByEmail(email)

    if (existingUser)
        return res
            .status(400)
            .json({ error: `User with email ${email} already exists!`});

       const {salt, password: hashedPassword} = hashedPasswordWithSalt(password);

    const user = await db.insert(usersTable).values({
        
        firstname: firstname,
        lastname: lastname,
        email: email,
        salt:salt,
        password: hashedPassword,
    }).returning({ id: usersTable.id })

    return res.status(201).json({ data: { userId: user[0].id } })

});

export default router;