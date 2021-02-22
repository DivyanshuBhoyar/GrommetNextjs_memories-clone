import { Button } from "grommet";
import React from "react";
import FadeIn from "react-fade-in";
import styled from "styled-components";
import { emojiData } from "../assets/emojiData";

export default function EmojiPicker({ emotion, setemotion }) {
  const [collapse, setcollapse] = React.useState(false);

  function handleEmojiClick(e) {
    setemotion(e.target.getAttribute("src"));
    setcollapse(false);
  }

  return (
    <div style={{ width: "100%" }} className="root_wrap">
      <EmojiPickerMain>
        {!emotion && (
          <StyledButton
            onClick={(e) => setcollapse(!collapse)}
            label="Attach an emotion"
          />
        )}
        <FadeIn>
          {collapse && (
            <div className="emoji_content">
              {emojiData.map((e) => (
                <div className="emoji-box">
                  <img onClick={handleEmojiClick} src={e.url} alt="" />
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </EmojiPickerMain>
    </div>
  );
}

const EmojiPickerMain = styled.div`
  .emoji_content {
    display: flex;
    flex-flow: row wrap;
  }

  img {
    width: 28px;
    cursor: pointer;
    margin: 2.5px;
  }
  img:hover {
    filter: contrast(2);
  }
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin: 5px auto;
  border: 0.25px solid blueviolet;
`;
