import { MyCanvas } from './canvas'
import { SimpleAgent } from './agent'
import { SimpleEnvironment, SimpleAction, SimplePercept, applyAction, EnvironmentAnimation } from './environment'

function greedy(p: SimplePercept): SimpleAction[] {
    let goal = p.goal
    let pos = p.position
    let manhattan = (p: [number, number]) => Math.abs(p[0] - goal[0]) + Math.abs(p[1] - goal[1])
    return [p.available.reduce((min, nxt) => {
        let pmin = applyAction(pos, min)
        let pnxt = applyAction(pos, nxt)
        return ((manhattan(pmin) <= manhattan(pnxt)) ? min : nxt)
    })]
}


function lrta(): (p: SimplePercept) => SimpleAction[] {
    let estimate: { [key: string]: number } = {}
    let results: { [key: string]: [number, number] } = {}
    let actionsTo: { [key: string]: SimpleAction[] } = {}
    let prevState: [number, number]
    let prevAction: SimpleAction

    let manhattan = (p: [number, number], goal: [number, number]) =>
        Math.abs(p[0] - goal[0]) + Math.abs(p[1] - goal[1])

    let lrtaCost = (s: [number, number], s1: [number, number], goal: [number, number]) => {
        if (s1 === undefined) {
            return manhattan(s, goal)
        }
        let cost = 1 /* cost to go from prevState to s1 given a */ + estimate[s1.join()]
        return cost
    }

    return function (p: SimplePercept): SimpleAction[] {

        let {
            goal, position, available
        } = p
        let key = position.join()
        if (!(key in estimate)) {
            estimate[key] = manhattan(position, goal)
        }
        if (prevState !== undefined) {
            results[[prevState, prevAction].join()] = position

            let costs = actionsTo[prevState.join()]
                //.filter(a => results[[prevState, a].join()])
                .map((a: SimpleAction) => {
                    // Get costs
                    let s1 = results[[prevState, a].join()]

                    return lrtaCost(prevState, s1, goal)
                })
            estimate[prevState.join()] = Math.min(...costs)
        }
        if (!actionsTo[position.join()]) {
            actionsTo[position.join()] = available
        }
        let a = available
            .reduce((amin, anxt) => {
                let cmin = lrtaCost(position, results[[position, amin].join()], goal)
                let cnxt = lrtaCost(position, results[[position, anxt].join()], goal)
                return (cmin <= cnxt) ? amin : anxt
            })

        prevState = position
        prevAction = a
        return [a]
    }
}

window.onload = (a: any) => {
    let div = document.getElementById('lrta')
    let agent = new SimpleAgent([5, 3], lrta())

    let env = new SimpleEnvironment([28, 28], agent)
    let canvas = new MyCanvas(300, 300)
    div.appendChild(canvas.canvas)

    let anim = new EnvironmentAnimation(canvas, env)
    anim.run(window)
    anim.pause()

    // debug
    let position = document.createElement('p')
    div.appendChild(position)


    // Pause-resume button
    let but = document.createElement('button')
    but.innerHTML = 'RESUME'
    but.onclick = e => {
        if (but.innerHTML == 'PAUSE') {
            anim.pause()
            but.innerHTML = 'RESUME'
            position.innerHTML = agent.position.join()
        } else {
            anim.resume()
            but.innerHTML = 'PAUSE'
        }

    }
    div.appendChild(but)
}