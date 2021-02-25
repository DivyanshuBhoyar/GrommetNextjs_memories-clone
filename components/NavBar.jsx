import { Button, Grommet } from "grommet";
import React from "react";
import Link from "next/link";
import { auth } from "../firebase/config";

export default function NavBar() {
  const theme = {
    global: {
      colors: {
        text: "white",
      },
    },
  };
  return (
    <div className="navBar-wrap0">
      <div className="nav-wrap1">
        <div className="navitem">
          <div className="title">
            <h3>Memories v1.0</h3>
          </div>
        </div>{" "}
        <div className="nav-wrap2">
          {auth.currentUser && (
            <div className="navitem">
              <Grommet theme={theme}>
                <Button
                  label="Sign out"
                  color="white"
                  size="small"
                  onClick={() => {
                    auth.signOut();
                  }}
                />
              </Grommet>
            </div>
          )}
          {/* <div className="navitem">
            <Link
              href="/about"
              style={{ textDecoration: "none", color: "whitesmoke" }}
              className = "Link"
            >
              About
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
