declare module '*.svg' {
  import React from 'react'
  export const Component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
