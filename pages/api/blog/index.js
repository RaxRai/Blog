import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()

export default async function handler(req, res) {

  const {title, content, type, accessToken} = req.body

    try{
    const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);

    const result = await prisma.blogs.create({
      data: {
        title,
        content,
        type ,
        userId : decoded.userId
      }
    })

    res.status(200).json({ res: result })

  }catch(err){
    console.log(err)
    res.status(401).json({ err: 'Email or password wrong'})
  }


}
