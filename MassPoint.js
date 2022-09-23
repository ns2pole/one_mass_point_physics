let index = 0;
class MassPoint {
    constructor(mass, initialPositionVec, initialVelocityVec, recievedForceFunc) {
        Object.defineProperty(
            this,
            'mass', {
              value: mass
            }
        );
        Object.defineProperty(
            this,
            'positionVecSeries', {
              value: [initialPositionVec]
            }
        );
        Object.defineProperty(
            this,
            'velocityVecSeries', {
              value: [initialVelocityVec]
            }
        );
        Object.defineProperty(
            this,
            'initialPositionVec', {
              value: initialPositionVec
            }
        );
        Object.defineProperty(
            this,
            'initialVelocityVec', {
              value: initialVelocityVec
            }
        );
        Object.defineProperty(
            this,
            'getRecievedForceOn', {
              value: recievedForceFunc
            }
        );
        Object.defineProperty(
            this,
            'accelerationVecSeries', {
              value: [this.getAccelerationVecOn(initialPositionVec, initialVelocityVec)]
            }
        );

    }

    static getNextStepValBy(previousValVec, previousValOfDerivativeVec) {
        return previousValVec.add(previousValOfDerivativeVec.getMultiplicatedVecBy(dt));
    }

    getAccelerationVecOn(position, velocity) {
        return this.getRecievedForceOn(position, velocity).getMultiplicatedVecBy(1 / this.mass);
    }

    evolutionOfPositionVecSeries() {
        const newPositionVec = MassPoint.getNextStepValBy(this.positionVecSeries[this.positionVecSeries.length - 1], this.velocityVecSeries[this.velocityVecSeries.length - 1]);
        this.positionVecSeries.push(newPositionVec);
    }

    
    evolutionOfVelocityVecSeries() {
        const newVelocityVec = MassPoint.getNextStepValBy(this.velocityVecSeries[this.velocityVecSeries.length - 1], this.accelerationVecSeries[this.accelerationVecSeries.length - 1]);
        this.velocityVecSeries.push(newVelocityVec);
    }

    evolutionOfAccelerationVecSeries() {
        const newAccelerationVec = this.getAccelerationVecOn(this.positionVecSeries[this.positionVecSeries.length - 1], this.velocityVecSeries[this.velocityVecSeries.length - 1]);
        this.accelerationVecSeries.push(newAccelerationVec);
    }

    calc() {
        for(let i = 0; i < TOTAL_TIMESTEP_NUM; i ++) {
            this.evolutionOfPositionVecSeries();
            this.evolutionOfVelocityVecSeries();
            this.evolutionOfAccelerationVecSeries();
        }
    }
    
    getPositionVertexSeries() {
        return this.positionVecSeries.map(positionVec => {
            return (new Vertex(positionVec.x, positionVec.y)).getVertexActionedBy(Vec2D.getVec2DBy(new Vertex(0,0), ORIGIN_VERTEX));
        });
    }
    
    getPositionVertexSeriesForDrawing() {
        return this.getPositionVertexSeries().filter((positionVertex, index) => {
            index % Math.floor(PLAYBACK_SPEED / (dt * FRAME_RATE)) == 0
        });       
    }

    drawMotion() {
        const positionVertexSeriesForDrawing = this.getPositionVertexSeries()
        fill(color("#00FF00"));
        console.table(positionVertexSeriesForDrawing)
        //console.table(this.velocityVecSeries)
        circle(positionVertexSeriesForDrawing[index].x, positionVertexSeriesForDrawing[index].y, 10);
        index++;
    }

}