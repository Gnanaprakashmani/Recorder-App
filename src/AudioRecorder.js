import React, { useState } from "react";
import { ReactMic } from "react-mic";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AudioRecorder() {
  const [record, setRecord] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const startRecording = () => setRecord(true);
  const stopRecording = () => setRecord(false);

  const onStop = (recordedData) => {
    setAudioData(recordedData);
  };

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: "eu-north-1",
  });

  const s3 = new AWS.S3();

  const uploadFileToS3 = async () => {
    const response = await fetch(audioData.blobURL);
    const fileBlob = await response.blob();
    const params = {
      Bucket: "hr-01",
      Key: v4(),
      Body: fileBlob,
      ContentType: "audio/mpeg",
    };

    try {
      const data = await s3.upload(params).promise();
      if (data) {
        toast.success("File uploaded successfully !!");
        setAudioData(null);
      }
    } catch (error) {
      toast.error("Error uploaded successfully !!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="audio-recorder">
      <ToastContainer />
      <h1 className="title">Audio Recorder App</h1>

      <div className="recorder-section">
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          mimeType="audio/webm"
          echoCancellation={true}
          strokeColor="#000"
          backgroundColor="#e0f7fa"
        />
        <div className="button-group">
          <button
            onClick={startRecording}
            disabled={record}
            className="record-button"
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!record}
            className="stop-button"
          >
            Stop Recording
          </button>
        </div>
      </div>

      {audioData && (
        <div className="playback-section">
          <h3>Playback</h3>
          <audio controls src={audioData.blobURL} className="audio-player" />
        </div>
      )}

      <button
        onClick={uploadFileToS3}
        className="upload-button"
        disabled={!audioData}
      >
        Upload to S3
      </button>
    </div>
  );
}

export default AudioRecorder;
