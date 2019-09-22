import { SimpleAgent } from './agent'
import { MyCanvas } from './canvas'

export interface Action { }
export type SimpleAction = 'left' | 'right' | 'up' | 'down'
type position = [number, number]
export interface SimplePercept {
    available: SimpleAction[],
    goal: position,
    position: position,
}

export interface Environment<P, A> {
    state(): any
    percept(): P
    execute(actions: A): void
    step(): any
    run(n?: number): Iterator<any>
}

export function applyAction(pos: position, a: SimpleAction): position {
    let [px, py] = pos
    switch (a) {
        case 'up': return [px + 1, py]
        case 'down': return [px - 1, py]
        case 'left': return [px, py - 1]
        case 'right': return [px, py + 1]
    }
}
export class SimpleEnvironment implements Environment<SimplePercept, SimpleAction> {
    height: number
    width: number
    goalSize: number
    goal: [number, number]
    agent: SimpleAgent
    data: Array<boolean>
    success: boolean
    constructor(goal: [number, number], agent: SimpleAgent) {
        this.goal = goal
        this.goalSize = 1
        this.data = readmaze()
        this.height = 30
        this.width = 30
        this.agent = agent
        this.success = false
    }

    state() {
        return {
            agentPosition: this.agent.position,
        }
    }

    percept(): SimplePercept {
        let pos = this.agent.position
        let actions: SimpleAction[] = ['up', 'down', 'left', 'right']
        return {
            available: actions.filter(a => !this.wallAt(...applyAction(pos, a))),
            goal: this.goal,
            position: this.agent.position,
        }
    }

    execute(action: SimpleAction) {
        switch (action) {
            case 'down':
                this.agent.down()
                break
            case 'up':
                this.agent.up()
                break
            case 'left':
                this.agent.left()
                break
            case 'right':
                this.agent.right()
                break
        }
        let [px, py] = this.agent.position
        if (this.wallAt(px, py)) {
            this.agent.isAlive = false
        }
        let [gx, gy] = this.goal
        if ((Math.abs(gx - px) + Math.abs(gy - py) < this.goalSize)) {
            this.success = true
        }

    }

    isDone() {
        return !this.agent.isAlive || this.success
    }

    step() {
        for (let action of this.agent.program(this.percept())) {
            if (this.isDone()) {
                return
            }
            this.execute(action)
        }
    }

    *run(n: number = 1000) {
        let c = 0
        while (!this.isDone() && c < n) {
            c += 1
            yield this.step()
        }
    }

    wallAt(x: number, y: number): boolean {
        return this.data[x + y * this.width]
    }
}

function readmaze(): Array<boolean> {
    return [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, true, true, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, true, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, true, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, true, true, true, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, true, true, true, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, false, true, true, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, true, false, false, false, true, true, false, false, false, false, false, true, true, true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, true, false, false, false, false, false, true, true, true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, false, false, true, true, false, false, false, false, false, true, true, true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, false, false, true, true, false, false, false, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false, true, true, true, false, false, true, false, true, true, false, true, true, false, false, false, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, false, false, true, true, true, true, false, false, false, false, true, true, true, true, true, true, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
}

export class EnvironmentAnimation {

    constructor(private canvas: MyCanvas, private env: SimpleEnvironment, private paused: boolean = true, private prev: number = 0) { }

    run(window: Window, delay?: number, maxiter?: number) {
        this.resume()
        let frame = (timestamp: number) => {
            this.draw(this.env)
            if (!this.paused && !(delay && (timestamp - this.prev < delay * 1000))) {
                this.prev = timestamp
                this.env.step()
                if (this.env.isDone()) {
                    console.log('Agent died!')
                    return
                }
            }
            window.requestAnimationFrame(frame)
        }
        window.requestAnimationFrame(frame)
    }

    pause() {
        this.paused = true
    }

    resume() {
        this.paused = false
    }
    draw(env: SimpleEnvironment) {
        let canvas = this.canvas
        let vratio = Math.ceil(canvas.height / env.height)
        let hratio = Math.ceil(canvas.width / env.width)

        // Draw environment
        for (let i = 0; i < env.height; i++) {
            for (let j = 0; j < env.width; j++) {
                let x = i * vratio
                let y = j * hratio
                if (env.wallAt(i, j)) {
                    //canvas.drawPixel(i, j, wall)
                    canvas.fillRect(x, y, vratio, hratio, 'black')
                } else {
                    //canvas.drawPixel(i, j, empty)
                    canvas.fillRect(x, y, vratio, hratio, 'white')
                }
            }
        }

        // draw goal
        let [gx, gy] = env.goal
        canvas.filCircle(gx * vratio, gy * hratio, env.goalSize * Math.min(hratio, vratio), 'green')

        // draw agen
        let [ax, ay] = env.agent.position
        canvas.filCircle(ax * vratio, ay * hratio, 1 * Math.min(hratio, vratio), 'red')
    }
}