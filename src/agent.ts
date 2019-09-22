import { SimpleAction, SimplePercept, applyAction } from './environment'

export interface Agent<P, A> {
    position: [number, number]
    isAlive: boolean
    program: (p: P) => A[]
}

export class SimpleAgent implements Agent<SimplePercept, SimpleAction> {
    position: [number, number]
    isAlive: boolean
    program: (p: SimplePercept) => SimpleAction[]

    constructor(position: [number, number], program: (p: SimplePercept) => SimpleAction[]) {
        this.position = position
        this.isAlive = true
        this.program = program
    }

    up() {
        this.position = applyAction(this.position, 'up')
    }
    down() {
        this.position = applyAction(this.position, 'down')
    }
    left() {
        this.position = applyAction(this.position, 'left')
    }
    right() {
        this.position = applyAction(this.position, 'right')
    }
}