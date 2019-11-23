/** @jsx jsx */
import { jsx } from "theme-ui"

const profileImage = require("./profile_image.jpg")

export const ProfilePic = () => (
  <img
    alt="Paul Scanlon"
    sx={{
      width: "100%",
      height: "auto",
    }}
    src={profileImage}
  />
)
