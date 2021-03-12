import { PipeTransform, BadRequestException, Body } from '@nestjs/common'
import * as D from 'io-ts/Decoder'
import * as Either from 'fp-ts/Either'

export class DecoderPipe<A> implements PipeTransform {
  constructor(private decoder: D.Decoder<unknown, A>) {}

  transform(value: unknown): A {
    const result = this.decoder.decode(value)

    if (Either.isRight(result)) {
      return result.right
    }

    throw new BadRequestException(D.draw(result.left))
  }
}

export const DBody = <A>(decoder: D.Decoder<unknown, A>) =>
  Body(new DecoderPipe(decoder))
