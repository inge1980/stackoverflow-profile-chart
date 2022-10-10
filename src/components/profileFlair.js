import React from "react";

function ProfileFlair() {
  const userID = 1248273;
  const userName = "turbopipp";
  let flairUrl = "https://stackoverflow.com/users/" + userID + "/" + userName;
  let flairImage =
    "https://stackoverflow.com/users/flair/" + userID + ".png?theme=dark";
  let flairDesc =
    "profile for " +
    userName +
    " at Stack Overflow, Q&amp;A for professional and enthusiast programmers";
  let flairStyle = {
    "margin-top": "-58px",
    "text-align": "right",
    position: "absolute",
    right: 0,
  };

  return (
    <span style={flairStyle}>
      <a href={flairUrl}>
        <img
          src={flairImage}
          width="208"
          height="58"
          alt={flairDesc}
          title={flairDesc}
        />
      </a>
    </span>
  );
}

export default ProfileFlair;
