/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"

export const Logo = () => (
  <Link to="/">
    <svg id="demo-logo" x="0px" y="0px" viewBox="0 0 48 48" width="42px">
      <path
        sx={{
          fill: "primary",
        }}
        d="M5,25c0-9.9,8.1-18,18-18l0,0V2C17.2,2,12.3,3.9,7.9,7.6C-1.7,16-2.7,30.5,5.6,40.1l3.8-3.3
		C6.7,33.6,5,29.5,5,25z"
      />
      <path
        sx={{
          fill: "textMuted",
        }}
        d="M23,43c-5.4,0-10.3-2.4-13.6-6.2l-3.8,3.3c0.8,0.9,1.7,1.8,2.6,2.5c9.7,8.2,24.2,6.9,32.4-2.8l-3.8-3.2
		C33.5,40.5,28.5,43,23,43z"
      />
      <path
        sx={{
          fill: "secondary",
        }}
        d="M23,2v5c9.9,0,18,8.1,18,18c0,4.4-1.6,8.4-4.2,11.6l3.8,3.2c3.7-4.4,5.4-9,5.4-14.8C46,12.3,35.7,2,23,2z"
      />
      <circle
        sx={{
          fill: "textSecondary",
        }}
        cx="23"
        cy="24.5"
        r="7"
      />
    </svg>
  </Link>
)
