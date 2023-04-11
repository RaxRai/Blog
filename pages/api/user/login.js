import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()

export default async function handler(req, res) {

  const {email, password} = req.body


  try{


    const result = await prisma.user.findUnique({
      where: {
        email
      },
    })

    const decoded = jwt.verify(result?.accessToken, process.env.JWT_SECRET);

    // const otp = await prisma.oTPs.create({
    //   data: {
    //     userId: userId,
    //     otp: '' + Math.floor(100000 + Math.random() * 900000)
    //   }
    // })

    if(decoded.password === password){
      res.status(200).json(result)
    } else {      
      throw new Error('Email or password wrong')
    } 

  }catch(err){
    console.log(err.error)
    res.status(401).json({ err: 'Email or password wrong'})
  }


}
