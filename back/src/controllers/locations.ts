import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', function (req: Request, res: Response) {
  res.send([{
    _id: '1234',
    name: 'name',
    type: 'type',
    address: 'address',
    siteLink: 'sitelink',
    zipcode: 75010
  }])
})

export default router;
