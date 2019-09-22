export class MyCanvas {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    width: number
    height: number

    constructor(width: number, height: number) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height
        this.width = width
        this.height = height
        this.ctx = this.canvas.getContext('2d')
    }

    append(to: 'body' | string = 'body') {
        if (to === 'body') {
            document.body.appendChild(this.canvas)
        } else {
            document.getElementById(to).appendChild(this.canvas)
        }
    }

    fillRect(x: number, y: number, w: number, h: number, color?: string) {
        if (color !== undefined) {
            this.ctx.save()
            this.ctx.fillStyle = color
            this.ctx.fillRect(x, y, w, h)
            this.ctx.restore()
        } else {
            this.ctx.fillRect(x, y, w, h)
        }
    }

    drawPixel(x: number, y: number, color: string) {
        this.ctx.save()
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, 1, 1)
        this.ctx.restore()
    }

    filCircle(x: number, y: number, radius: number, fill?: string, border?: string) {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        if (fill) {
            this.ctx.fillStyle = fill
            this.ctx.fill()
        }
        if (border) {
            this.ctx.lineWidth = 5
            this.ctx.strokeStyle = border
            this.ctx.stroke()
        }
        this.ctx.restore()
    }
}