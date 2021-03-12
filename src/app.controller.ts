import { Controller, Post } from '@nestjs/common'
import { pipe } from 'fp-ts/lib/function'
import * as D from 'io-ts/Decoder'
import { DBody } from './decoder'

const Point = pipe(
  D.struct({
    X: D.number,
    Y: D.number,
  }),
  D.map(({ X, Y }) => ({ x: X, y: Y }))
)

const Data = D.struct({
  a: D.string,
  b: D.number,
  c: D.boolean,
  d: D.nullable(Point),
})

type Data = D.TypeOf<typeof Data>

/*
Valid JSONs:

{
  "a": "a",
  "b": 42,
  "c": true,
  "d": {
    "X": 42,
    "Y": 24
  }
}

{
  "a": "a",
  "b": 42,
  "c": true,
  "d": null
}
*/

@Controller()
export class AppController {
  @Post()
  post(@DBody(Data) body: Data) {
    return body
  }
}
