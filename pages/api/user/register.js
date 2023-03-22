import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {name, email, password} = req.body

  try{
    const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET);
    const result = await prisma.user.create({
      data: {
        name,
        email,
        accessToken : token
      }
    })
  
    res.status(200).json({ res : result })

  }catch(err){
    console.log(err)
    res.status(401).json({ gadbad: 'giyo' })
  }

}
