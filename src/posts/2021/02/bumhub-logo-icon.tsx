import React, { FunctionComponent } from 'react'
import { Box } from 'theme-ui'

export const LogoIcon: FunctionComponent = () => {
  return (
    <Box
      as="svg"
      version="1.0"
      x="0px"
      y="0px"
      viewBox="0 0 24 32"
      width="128px"
      height="100%"
      sx={{
        '.logo-outline': {
          fill: 'surface',
        },
        '.logo-solid': {
          fill: 'primary',
        },
        '.logo-detail': {
          fill: 'text',
        },
      }}
    >
      <g>
        <path
          className="logo-solid"
          d="M19.81,13.83l-.14.13a8.21,8.21,0,0,1,4.64,6,6.54,6.54,0,0,1-.93,4.46,7.14,7.14,0,0,1-4,2.71,23.54,23.54,0,0,1-4.21,1l-1.49.26c-1.5.25-1.69.11-2-1.38-1.35-6.84-2.66-13.7-4-20.54A1.41,1.41,0,0,1,8.93,4.65a50.25,50.25,0,0,1,5.16-.93,9.48,9.48,0,0,1,4.76.35,5.91,5.91,0,0,1,2.9,2.85,5.4,5.4,0,0,1,.09,4.55A5.47,5.47,0,0,1,19.81,13.83Z"
          transform="translate(-4.85 -0.81)"
        />
        <g className="logo-detail">
          <path d="M20.29,24.13a.81.81,0,0,0,.26,1.6A.81.81,0,0,0,20.29,24.13Z" transform="translate(-4.85 -0.81)" />
          <path d="M20.61,22.15a.62.62,0,0,0,.2,1.23A.62.62,0,0,0,20.61,22.15Z" transform="translate(-4.85 -0.81)" />
          <path d="M22,23.26a.67.67,0,0,0,.22,1.32A.67.67,0,0,0,22,23.26Z" transform="translate(-4.85 -0.81)" />
          <path
            d="M20.31,9a.83.83,0,0,1-.76-.52A3.68,3.68,0,0,0,15,6.08a.82.82,0,1,1-.47-1.57,5.38,5.38,0,0,1,6.56,3.38A.83.83,0,0,1,20.61,9,1,1,0,0,1,20.31,9Z"
            transform="translate(-4.85 -0.81)"
          />
          <path d="M12.49,4.94a.86.86,0,0,0,.29,1.7A.86.86,0,0,0,12.49,4.94Z" transform="translate(-4.85 -0.81)" />
        </g>

        <path
          className="logo-outline"
          d="M27.06,19.57a10.17,10.17,0,0,0-3.19-6,9,9,0,0,0,.5-.92,8.23,8.23,0,0,0-.11-6.91A8.72,8.72,0,0,0,20,1.53,11.89,11.89,0,0,0,13.81,1c-.55.05-1.13.13-1.76.24-1,.16-1.91.36-2.82.55l-.86.18A4.18,4.18,0,0,0,4.93,7Q6,12.23,7,17.5q1,5,2,10c.58,3,2.17,4.08,5.16,3.58l1.45-.25.83-.12a27.58,27.58,0,0,0,3.79-.95,9.7,9.7,0,0,0,5.54-3.84A9.4,9.4,0,0,0,27.06,19.57Zm-3.68,4.84a7.14,7.14,0,0,1-4,2.71,23.54,23.54,0,0,1-4.21,1l-1.49.26c-1.5.25-1.69.11-2-1.38-1.35-6.84-2.66-13.7-4-20.54A1.41,1.41,0,0,1,8.93,4.65a50.25,50.25,0,0,1,5.16-.93,9.48,9.48,0,0,1,4.76.35,5.91,5.91,0,0,1,2.9,2.85,5.4,5.4,0,0,1,.09,4.55,5.32,5.32,0,0,1-1.23,1.71,8.17,8.17,0,0,0-2.46-.2,5.2,5.2,0,0,0-5.21-2.37.82.82,0,1,0,.29,1.61,3.58,3.58,0,0,1,3.15,1.11,8.23,8.23,0,0,0-1.62.71,1.08,1.08,0,1,0,1.07,1.88,6,6,0,0,1,7.12.86,1,1,0,0,0,.13.09A7,7,0,0,1,24.31,20,6.54,6.54,0,0,1,23.38,24.41Z"
          transform="translate(-4.85 -0.81)"
        />
      </g>
    </Box>
  )
}
