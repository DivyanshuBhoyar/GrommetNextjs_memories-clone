import React from "react";
import { Anchor, Box } from "grommet";
import { Github, Grommet, LinkedinOption, Reactjs } from "grommet-icons";
import NavBar from "../components/NavBar";

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <div
        style={{
          width: "70vw",
          fontFamily: "Montserrat",
          fontWeight: 400,

          color: "black",
          margin: "0 auto",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexFlow: "row wrap",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        <Box
          gap="5px"
          direction="row"
          align="center"
          justify="center"
          pad="medium"
          wrap
        >
          {/* <p>Current Version : 1.0 </p> */}
          Created with
          <div style={{ flexBasis: "100%" }}></div>
          <img
            src="https://cdn.discordapp.com/attachments/792429986094907392/811865640423915550/icons8-google-firebase-console-50.png"
            alt="firebase logo"
            style={{ margin: "0.8rem" }}
          />
          <Reactjs style={{ margin: "0.8rem" }} size="50px" color="plain" />
          <Grommet style={{ margin: "0.8rem" }} size="50px" color="plain" />
        </Box>{" "}
        <div style={{ flexBasis: "100%" }}></div>
        <div style={{ lineHeight: 1.2 }}>
          <center>by Divyanshu Bhoyar.</center>{" "}
        </div>
        <div style={{ flexBasis: "100%" }}></div>
        <div className="">
          <Anchor
            style={{ margin: "0.3rem" }}
            href="https://www.linkedin.com/in/divyanshu-bhoyar/"
          >
            <LinkedinOption color="plain" />
          </Anchor>
          <Anchor
            style={{ margin: "0.3rem" }}
            href="https://github.com/DivyanshuBhoyar"
          >
            <Github color="plain" />
          </Anchor>
        </div>
      </div>
    </>
  );
}
