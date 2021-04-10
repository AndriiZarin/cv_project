import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Form, Grid, Image, Icon } from "semantic-ui-react";
import useAsync from "../hooks/useAsync";
import { Spinner } from "../styles/app.jsx";

const fakeImg = "http://via.placeholder.com/130x130";
const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
const MAX_SIZE = 4000000;

const UploadImage = ({ img, updatePhoto }) => {
  const [file, setFile] = useState(null);
  const [renderImg, setRenderImg] = useState(fakeImg);
  const [imgError, setImgError] = useState(null);
  const { isLoading, error, run } = useAsync();

  const fileRef = useRef();

  useEffect(() => {
    if (img) {
      setRenderImg(img);
    } else {
      setRenderImg(fakeImg);
    }
  }, [img]);

  const selectFile = (e) => {
    const file = fileRef.current.files && fileRef.current.files[0];
    if (!file) return;

    const tooLarge = file.size > MAX_SIZE;
    if (!allowedTypes.includes(file.type) || tooLarge) {
      const msg = tooLarge ? "File too large" : "not allowed type";
      setImgError(msg);
      return;
    }
    setFile(file);
  };

  async function handleSendFile(e) {
    if (!file || imgError) return;
    const formData = new FormData();
    formData.append("file", file);
    await run(
      axios.post("/api/upload", formData).then((res) => {
        updatePhoto(res.data.file);
        setRenderImg(res.data.file);
        setFile(null);
        return res.data;
      })
    );
  }
  return (
    <Form.Group centered>
      <Grid.Column centered>
        <Image
          src={renderImg}
          alt="fake img"
          size="medium"
          centered
          rounded
          bordered
        />
        <input
          type="file"
          id="photo"
          onChange={selectFile}
          ref={fileRef}
          style={{ display: "none" }}
        />
        <Button.Group widths={2} className="mt-3">
          <Button
            animated
            fluid
            basic
            color="orange"
            type="button"
            onClick={() => fileRef.current.click()}
          >
            <Button.Content visible>Choose File</Button.Content>
            <Button.Content hidden>
              <Icon name="file" />
            </Button.Content>
          </Button>
          <Button
            animated
            fluid
            type="button"
            basic
            color="red"
            onClick={handleSendFile}
          >
            <Button.Content visible>
              Upload
              {isLoading && <Spinner />}
            </Button.Content>
            <Button.Content hidden>
              <Icon name="cloud upload" />
            </Button.Content>
          </Button>
        </Button.Group>
        {file && <div>{file.name}</div>}
        {error && <p>{error.message}</p>}
      </Grid.Column>
    </Form.Group>
  );
};

export default UploadImage;
