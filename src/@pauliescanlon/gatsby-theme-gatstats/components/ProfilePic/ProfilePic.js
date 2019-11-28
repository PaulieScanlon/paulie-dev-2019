/** @jsx jsx */
import { jsx } from "theme-ui"

const profileImage = require("./profile_image.png")

export const ProfilePic = () => (
  <img
    alt="Paul Scanlon"
    sx={{
      width: "200px",
      height: "200px",
      borderWidth: "3px",
      borderStyle: "solid",
      borderColor: "primary",
      borderRadius: "50%",
    }}
    src={profileImage}
  />
)
