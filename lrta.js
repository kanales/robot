(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
var SimpleAgent = (function () {
    function SimpleAgent(position, program) {
        this.position = position;
        this.isAlive = true;
        this.program = program;
    }
    SimpleAgent.prototype.up = function () {
        this.position = environment_1.applyAction(this.position, 'up');
    };
    SimpleAgent.prototype.down = function () {
        this.position = environment_1.applyAction(this.position, 'down');
    };
    SimpleAgent.prototype.left = function () {
        this.position = environment_1.applyAction(this.position, 'left');
    };
    SimpleAgent.prototype.right = function () {
        this.position = environment_1.applyAction(this.position, 'right');
    };
    return SimpleAgent;
}());
exports.SimpleAgent = SimpleAgent;

},{"./environment":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyCanvas = (function () {
    function MyCanvas(width, height) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.ctx = this.canvas.getContext('2d');
    }
    MyCanvas.prototype.append = function (to) {
        if (to === void 0) { to = 'body'; }
        if (to === 'body') {
            document.body.appendChild(this.canvas);
        }
        else {
            document.getElementById(to).appendChild(this.canvas);
        }
    };
    MyCanvas.prototype.fillRect = function (x, y, w, h, color) {
        if (color !== undefined) {
            this.ctx.save();
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, w, h);
            this.ctx.restore();
        }
        else {
            this.ctx.fillRect(x, y, w, h);
        }
    };
    MyCanvas.prototype.drawPixel = function (x, y, color) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, 1, 1);
        this.ctx.restore();
    };
    MyCanvas.prototype.filCircle = function (x, y, radius, fill, border) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        if (fill) {
            this.ctx.fillStyle = fill;
            this.ctx.fill();
        }
        if (border) {
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = border;
            this.ctx.stroke();
        }
        this.ctx.restore();
    };
    return MyCanvas;
}());
exports.MyCanvas = MyCanvas;

},{}],3:[function(require,module,exports){
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function applyAction(pos, a) {
    var px = pos[0], py = pos[1];
    switch (a) {
        case 'up': return [px + 1, py];
        case 'down': return [px - 1, py];
        case 'left': return [px, py - 1];
        case 'right': return [px, py + 1];
    }
}
exports.applyAction = applyAction;
var SimpleEnvironment = (function () {
    function SimpleEnvironment(goal, agent) {
        this.goal = goal;
        this.goalSize = 1;
        this.data = readmaze();
        this.height = 30;
        this.width = 30;
        this.agent = agent;
        this.success = false;
    }
    SimpleEnvironment.prototype.state = function () {
        return {
            agentPosition: this.agent.position,
        };
    };
    SimpleEnvironment.prototype.percept = function () {
        var _this = this;
        var pos = this.agent.position;
        var actions = ['up', 'down', 'left', 'right'];
        return {
            available: actions.filter(function (a) { return !_this.wallAt.apply(_this, applyAction(pos, a)); }),
            goal: this.goal,
            position: this.agent.position,
        };
    };
    SimpleEnvironment.prototype.execute = function (action) {
        switch (action) {
            case 'down':
                this.agent.down();
                break;
            case 'up':
                this.agent.up();
                break;
            case 'left':
                this.agent.left();
                break;
            case 'right':
                this.agent.right();
                break;
        }
        var _a = this.agent.position, px = _a[0], py = _a[1];
        if (this.wallAt(px, py)) {
            this.agent.isAlive = false;
        }
        var _b = this.goal, gx = _b[0], gy = _b[1];
        if ((Math.abs(gx - px) + Math.abs(gy - py) < this.goalSize)) {
            this.success = true;
        }
    };
    SimpleEnvironment.prototype.isDone = function () {
        return !this.agent.isAlive || this.success;
    };
    SimpleEnvironment.prototype.step = function () {
        for (var _i = 0, _a = this.agent.program(this.percept()); _i < _a.length; _i++) {
            var action = _a[_i];
            if (this.isDone()) {
                return;
            }
            this.execute(action);
        }
    };
    SimpleEnvironment.prototype.run = function (n) {
        var c;
        if (n === void 0) { n = 1000; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    c = 0;
                    _a.label = 1;
                case 1:
                    if (!(!this.isDone() && c < n)) return [3, 3];
                    c += 1;
                    return [4, this.step()];
                case 2:
                    _a.sent();
                    return [3, 1];
                case 3: return [2];
            }
        });
    };
    SimpleEnvironment.prototype.wallAt = function (x, y) {
        return this.data[x + y * this.width];
    };
    return SimpleEnvironment;
}());
exports.SimpleEnvironment = SimpleEnvironment;
function readmaze() {
    return [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, true, true, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, true, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, true, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, true, true, true, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, true, true, true, false, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, false, true, true, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, true, false, false, false, true, true, false, false, false, false, false, true, true, true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, true, false, false, false, false, false, true, true, true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, false, false, true, true, false, false, false, false, false, true, true, true, true, false, false, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, false, false, true, true, false, false, false, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false, true, true, true, false, false, true, false, true, true, false, true, true, false, false, false, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, false, false, true, true, true, true, false, false, false, false, true, true, true, true, true, true, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
}
var EnvironmentAnimation = (function () {
    function EnvironmentAnimation(canvas, env, paused, prev) {
        if (paused === void 0) { paused = true; }
        if (prev === void 0) { prev = 0; }
        this.canvas = canvas;
        this.env = env;
        this.paused = paused;
        this.prev = prev;
    }
    EnvironmentAnimation.prototype.run = function (window, delay, maxiter) {
        var _this = this;
        this.resume();
        var frame = function (timestamp) {
            _this.draw(_this.env);
            if (!_this.paused && !(delay && (timestamp - _this.prev < delay * 1000))) {
                _this.prev = timestamp;
                _this.env.step();
                if (_this.env.isDone()) {
                    console.log('Agent died!');
                    return;
                }
            }
            window.requestAnimationFrame(frame);
        };
        window.requestAnimationFrame(frame);
    };
    EnvironmentAnimation.prototype.pause = function () {
        this.paused = true;
    };
    EnvironmentAnimation.prototype.resume = function () {
        this.paused = false;
    };
    EnvironmentAnimation.prototype.draw = function (env) {
        var canvas = this.canvas;
        var vratio = Math.ceil(canvas.height / env.height);
        var hratio = Math.ceil(canvas.width / env.width);
        for (var i = 0; i < env.height; i++) {
            for (var j = 0; j < env.width; j++) {
                var x = i * vratio;
                var y = j * hratio;
                if (env.wallAt(i, j)) {
                    canvas.fillRect(x, y, vratio, hratio, 'black');
                }
                else {
                    canvas.fillRect(x, y, vratio, hratio, 'white');
                }
            }
        }
        var _a = env.goal, gx = _a[0], gy = _a[1];
        canvas.filCircle(gx * vratio, gy * hratio, env.goalSize * Math.min(hratio, vratio), 'green');
        var _b = env.agent.position, ax = _b[0], ay = _b[1];
        canvas.filCircle(ax * vratio, ay * hratio, 1 * Math.min(hratio, vratio), 'red');
    };
    return EnvironmentAnimation;
}());
exports.EnvironmentAnimation = EnvironmentAnimation;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./canvas");
var agent_1 = require("./agent");
var environment_1 = require("./environment");
function greedy(p) {
    var goal = p.goal;
    var pos = p.position;
    var manhattan = function (p) { return Math.abs(p[0] - goal[0]) + Math.abs(p[1] - goal[1]); };
    return [p.available.reduce(function (min, nxt) {
            var pmin = environment_1.applyAction(pos, min);
            var pnxt = environment_1.applyAction(pos, nxt);
            return ((manhattan(pmin) <= manhattan(pnxt)) ? min : nxt);
        })];
}
function lrta() {
    var estimate = {};
    var results = {};
    var actionsTo = {};
    var prevState;
    var prevAction;
    var manhattan = function (p, goal) {
        return Math.abs(p[0] - goal[0]) + Math.abs(p[1] - goal[1]);
    };
    var lrtaCost = function (s, s1, goal) {
        if (s1 === undefined) {
            return manhattan(s, goal);
        }
        var cost = 1 + estimate[s1.join()];
        return cost;
    };
    return function (p) {
        var goal = p.goal, position = p.position, available = p.available;
        var key = position.join();
        if (!(key in estimate)) {
            estimate[key] = manhattan(position, goal);
        }
        if (prevState !== undefined) {
            results[[prevState, prevAction].join()] = position;
            var costs = actionsTo[prevState.join()]
                .map(function (a) {
                var s1 = results[[prevState, a].join()];
                return lrtaCost(prevState, s1, goal);
            });
            estimate[prevState.join()] = Math.min.apply(Math, costs);
        }
        if (!actionsTo[position.join()]) {
            actionsTo[position.join()] = available;
        }
        var a = available
            .reduce(function (amin, anxt) {
            var cmin = lrtaCost(position, results[[position, amin].join()], goal);
            var cnxt = lrtaCost(position, results[[position, anxt].join()], goal);
            return (cmin <= cnxt) ? amin : anxt;
        });
        prevState = position;
        prevAction = a;
        return [a];
    };
}
window.onload = function (a) {
    var div = document.getElementById('lrta');
    var agent = new agent_1.SimpleAgent([5, 3], lrta());
    var env = new environment_1.SimpleEnvironment([28, 28], agent);
    var canvas = new canvas_1.MyCanvas(300, 300);
    div.appendChild(canvas.canvas);
    var anim = new environment_1.EnvironmentAnimation(canvas, env);
    anim.run(window);
    anim.pause();
    var position = document.createElement('p');
    div.appendChild(position);
    var but = document.createElement('button');
    but.innerHTML = 'RESUME';
    but.onclick = function (e) {
        if (but.innerHTML == 'PAUSE') {
            anim.pause();
            but.innerHTML = 'RESUME';
            position.innerHTML = agent.position.join();
        }
        else {
            anim.resume();
            but.innerHTML = 'PAUSE';
        }
    };
    div.appendChild(but);
};

},{"./agent":1,"./canvas":2,"./environment":3}],5:[function(require,module,exports){

},{}]},{},[1,2,3,4,5]);
