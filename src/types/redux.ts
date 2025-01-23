export interface RootState {
  puzzle: PuzzleState
  header: HeaderState
  footer: FooterState
}

export interface PuzzleState {
  id: number
  status: 'IN_PROGRESS' | 'SUCCESS' | 'FAILURE'
  wires: number[]
}

export interface HeaderState {
  title: string
}

export interface FooterState {
  timer: number
} 
