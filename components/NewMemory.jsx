import { Button, FormField, TextArea, Form, Layer, Box } from "grommet";
import { Add } from "grommet-icons";
import Head from "next/head";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore, timestamp } from "../firebase/config";
import { FormatDate } from "./DateInput";
import EmojiPicker from "./EmojiPicker";

const usersRef = firestore.collection("users");
const query = usersRef.orderBy("createdAt", "desc");

export default function NewMemory() {
  const { uid, photoURL, email, displayName } = auth.currentUser;
  const memoriesRef = firestore.collection("memories");
  const [usersData, loading, error] = useCollectionData(query, {
    idField: "uid",
  });

  const initialFormState = {
    title: "",
    body: "",
  };
  const [values, setValues] = useState(initialFormState);
  const [memorydate, setmemorydate] = useState(new Date().toISOString());
  const [overlayIsActive, setoverlayIsActive] = useState(false);
  const [emotion, setEmotion] = useState(null);

  async function addMemory() {
    await memoriesRef.add({
      title: values.title,
      body: values.body,
      user: {
        uid,
        photoURL,
      },
      upvotes: [],
      emotion:
        emotion ||
        "https://cdn.discordapp.com/attachments/792429986094907392/810879690901684244/winking-face-with-halo.png",
      tagged: [],
      createdAt: timestamp(),
      date: timestamp(memorydate),
    });
    sendEmail();
    handleClose();
  }

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleClose(e) {
    setValues(initialFormState);
    setEmotion(null);
    setoverlayIsActive(false);
  }

  function sendEmail(l) {
    const filterusers = usersData.filter((user) => user.uid !== uid);
    filterusers.map((user) => {
      Email.send({
        Host: "smtp.google.com",
        Username: "hatwarkalash@gmail.com",
        Password: "hatwar@123",
        To: user.email,
        From: "hatwarkalash@gmail.com",
        Subject: "Hatwaar beta from the MemoriesApp.",
        Body: `Dear user, \n\n ${displayName} Just added a new memory 📝 . `,
      }).then((message) => console.log(message));
    });
  }

  return (
    <>
      <Head>
        <script src="https://smtpjs.com/v3/smtp.js"></script>
      </Head>
      <div
        style={{
          height: "4vw",
          width: "4vw",
          borderRadius: "50%",
        }}
        className="btn-wrap"
      >
        <Button
          primary
          full
          icon={<Add />}
          onClick={(e) => setoverlayIsActive(true)}
        />
      </div>{" "}
      {overlayIsActive && (
        <Layer
          modal
          responsive
          position="center"
          onClickOutside={handleClose}
          onEsc={handleClose}
        >
          <Box pad="0.2em" fill align="center" justify="center">
            <Box pad="0.5em" width="medium">
              <Form
                validate="blur"
                onReset={(event) => console.log(event)}
                onSubmit={({ value }) => console.log("Submit", value)}
              >
                <FormField
                  label="Title"
                  name="title"
                  focus
                  required
                  onChange={handleChange}
                />

                <FormField
                  onChange={handleChange}
                  value={values.body}
                  name="body"
                  placeholder="Something eventful 😉"
                  as={TextArea}
                  label="Body"
                  required
                />

                <FormField label="Date" as={null}>
                  <FormatDate
                    pad="small"
                    memorydate={memorydate}
                    setmemorydate={setmemorydate}
                  />
                </FormField>
                <Box width="100%">
                  <EmojiPicker emotion={emotion} setemotion={setEmotion} />
                </Box>
                <Box
                  direction="row"
                  justify="between"
                  margin={{ top: "small" }}
                >
                  <Button label="Cancel" onClick={handleClose} />
                  <Button
                    type="reset"
                    label="Reset"
                    onClick={() => setEmotion(null)}
                  />
                  <Button
                    onClick={values.title && values.body ? addMemory : null}
                    type="submit"
                    label="Add ✍"
                    primary
                  />
                </Box>
              </Form>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
}
