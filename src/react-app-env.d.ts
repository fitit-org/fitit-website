/// <reference types="react-scripts" />

declare function createRef<T>(): RefObject<T>

interface RefObject<T> {
  readonly cuttent: T | null
}
