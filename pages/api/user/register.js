import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()
import { v4 as uuidv4 } from 'uuid';



export default async function handler(req, res) {
    const {name, email, password} = req.body

  try{

    const userId = uuidv4()

    const token = jwt.sign({ name, email, password, userId }, process.env.JWT_SECRET);
    const result = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        accessToken : token
      }
    })
  
    res.status(200).json({ res : result })

  }catch(err){
    console.log(err)
    res.status(401).json({ msg: 'Something went wrong!' })
  }

}
