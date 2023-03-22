// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{

    const result = await prisma.projects.create({
      data: {
        name : req.body.name
      }
    })
  
    res.status(200).json({ name: 'John Doe', res : result })

  }catch(err){
    console.log(err)
  }


}
