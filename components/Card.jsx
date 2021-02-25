import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Grommet,
  Avatar,
} from "grommet";
import { CaretUpFill } from "grommet-icons";
import styled from "styled-components";
// import bg from "../assets/winking-face-with-halo.png";
import moment from "moment";
// import TaggedGroup from "./taggedgroup";
import { auth, firestore } from "../firebase/config";

export default function MemoryCard({ post }) {
  const { title, body, emotion, upvotes, user, date } = post;
  const event_date = date && moment(date.toDate()).format("MMMM Do YY");
  const { uid } = auth.currentUser;

  async function handleUpvote(e) {
    const memoryRef = firestore.collection("memories").doc(post.id);
    if (post.upvotes.includes(uid))
      post.upvotes = post.upvotes.filter((userid) => userid !== uid);
    else post.upvotes.push(uid);

    const res = await memoryRef.update({ upvotes: post.upvotes });
  }

  return (
    <div>
      <Grommet>
        <StyledCard
          emotion={emotion}
          background="light-1"
          elevation="medium"
          height="auto"
          width="325px"
          style={{ position: "relative" }}
        >
          <WhiteOverlay />
          <StyledCardHeader pad="medium">
            <div className="">{title}</div>
            {/* <div className="">
              {" "}
              <TaggedGroup />{" "}
            </div> */}
          </StyledCardHeader>
          <StyledCardBody
            pad={{
              top: "small",
              left: "medium",
              right: "medium",
              bottom: "medium",
            }}
          >
            {body}
          </StyledCardBody>
          <StyledCardFooter style={{ zIndex: 10 }} background="light-2">
            <StyledUpvotes>
              <Button
                focusIndicator={false}
                icon={<CaretUpFill color="red" onClick={handleUpvote} />}
                hoverIndicator
              />
              <div className="upvotes">{upvotes.length}</div>
            </StyledUpvotes>
            <StyledDate className="date">{event_date}</StyledDate>
            <Avatar size="small" src={user.photoURL} />
          </StyledCardFooter>
        </StyledCard>
      </Grommet>
    </div>
  );
}

const StyledCardHeader = styled(CardHeader)`
  font-size: 1.4rem;
  line-height: 1;
  color: #000;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Roboto Slab";
`;
const StyledCardBody = styled(CardBody)`
  font-size: 1em;
  z-index: 10;
  font-family: "Montserrat";
  color: #000;
  font-weight: 600;
  line-height: 1.15;
`;
const StyledUpvotes = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 0.8em;
  color: red;
`;
const StyledCard = styled(Card)`
  /* background-image: url(${bg}); */
  background-image: url(${(props) =>
    props.emotion ? props.emotion : props.emotion});
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 10px 10px 20px #b5b5b5, -10px -10px 20px #ffffff;
`;
const WhiteOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.52);
  z-index: 2;
`;
const StyledCardFooter = styled(CardFooter)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  padding: 0 0.75em 0 0;
  background-color: rgba(49, 255, 80, 0.589);
`;
const StyledDate = styled.div`
  margin-right: 0.8em;
  letter-spacing: 3px;
  font-size: 0.72em;
  text-transform: uppercase;
  font-family: "Source Sans Pro";
  color: #ffffff;
`;
