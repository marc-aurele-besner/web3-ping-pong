import create from 'zustand'

export interface IBall {
  blockNumber: string
}

interface IBallsState {
  balls: IBall[]
  lastBallAdded: Date
  pendingBalls: IBall[]
  addBall: (blockNumber: string) => void
  addPendingBall: (blockNumber: string) => void
  removeBall: (blockNumber: string) => void
  removePendingBall: (blockNumber: string) => void
  setLastBallAdded: (date: Date) => void
  addBallFromPending: (blockNumber: string) => void
}

const useBalls = create<IBallsState>((set) => ({
  balls: [],
  lastBallAdded: new Date(),
  pendingBalls: [],
  addBall: (blockNumber: string) =>
    set((state) => ({
      balls: state.balls.find((ball) => ball.blockNumber === blockNumber) ? state.balls : [...state.balls, { blockNumber }],
      lastBallAdded: state.balls.find((ball) => ball.blockNumber === blockNumber) ? new Date() : state.lastBallAdded
    })),
  addPendingBall: (blockNumber: string) =>
    set((state) => ({
      pendingBalls: state.pendingBalls.find((ball) => ball.blockNumber === blockNumber) ? state.pendingBalls : [...state.pendingBalls, { blockNumber }]
    })),
  removeBall: (blockNumber: string) => set((state) => ({ balls: state.balls.filter((ball) => ball.blockNumber !== blockNumber) })),
  removePendingBall: (blockNumber: string) => set((state) => ({ pendingBalls: state.pendingBalls.filter((ball) => ball.blockNumber !== blockNumber) })),
  setLastBallAdded: (date: Date) => set(() => ({ lastBallAdded: date })),
  addBallFromPending: (blockNumber: string) =>
    set((state) => ({
      balls: [...state.balls, { blockNumber }],
      pendingBalls: state.pendingBalls.filter((ball) => ball.blockNumber !== blockNumber)
    }))
}))

export default useBalls
