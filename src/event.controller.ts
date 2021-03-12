import { Controller, Post } from '@nestjs/common'
import * as D from 'io-ts/Decoder'
import { DBody } from './decoder'

enum EventType {
  SystemStarted = 'system-started',
  TaskCreated = 'task-created',
}

const SystemStartedEvent = D.struct({
  type: D.literal(EventType.SystemStarted),
  systemId: D.string,
})

const TaskCreatedEvent = D.struct({
  type: D.literal(EventType.TaskCreated),
  taskId: D.string,
})

const Event = D.union(SystemStartedEvent, TaskCreatedEvent)
type Event = D.TypeOf<typeof Event>

const Events = D.array(Event)
type Events = D.TypeOf<typeof Events>

@Controller()
export class EventController {
  /*
  Valid JSONs:

  {
    "type": "system-started",
    "systemId": "qwer-asdf-zxcv"
  }

  {
    "type": "task-created",
    "taskId": "1234-asdf-zxcv"
  }
  */
  @Post('event')
  postEvent(@DBody(Event) event: Event) {
    switch (event.type) {
      case EventType.SystemStarted:
        return event.systemId

      case EventType.TaskCreated:
        return event.taskId
    }
  }

  /*
  Valid JSON:
  [
    {
      "type": "system-started",
      "systemId": "qwer-asdf-zxcv"
    },
    {
      "type": "task-created",
      "taskId": "1234-asdf-zxcv"
    }
  ]
  */
  @Post('events')
  postEvens(@DBody(Events) events: Events) {
    return events
  }
}
