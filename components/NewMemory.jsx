import { Button, FormField, TextArea, Form, Layer, Box } from "grommet";
import { Add } from "grommet-icons";

import React, { useState } from "react";

import { auth, firestore, timestamp } from "../firebase/config";
import { FormatDate } from "./DateInput";
import EmojiPicker from "./EmojiPicker";

export default function NewMemory() {
  const memoriesRef = firestore.collection("memories");
  const initialFormState = {
    title: "",
    body: "",
  };
  const [values, setValues] = useState(initialFormState);
  const [memorydate, setmemorydate] = useState(new Date().toISOString());
  const [overlayIsActive, setoverlayIsActive] = useState(false);
  const [emotion, setEmotion] = useState(null);

  async function addMemory() {
    const { uid, photoURL } = auth.currentUser;
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

  return (
    <>
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
                    onClick={values.title && values.body && addMemory}
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
