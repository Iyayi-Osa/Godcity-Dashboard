import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Text,
} from "@chakra-ui/react";

const SermonForm = ({ sermonData, handleChange, filePreview }) => {
  return (
    <>
      <FormControl mb={3}>
        <FormLabel>Title</FormLabel>
        <Input id="title" value={sermonData.title} onChange={handleChange} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Speaker</FormLabel>
        <Input id="speaker" value={sermonData.speaker} onChange={handleChange} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Date</FormLabel>
        <Input type="date" id="date" value={sermonData.date} onChange={handleChange} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Description</FormLabel>
        <Textarea id="description" value={sermonData.description} onChange={handleChange} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Upload File</FormLabel>
        <Input type="file" id="file" onChange={handleChange} />
        {filePreview && (
          <Box mt={2}>
            {sermonData.fileType.startsWith("audio/") ? (
              <audio controls>
                <source src={filePreview} type={sermonData.fileType} />
                Your browser does not support the audio element.
              </audio>
            ) : sermonData.fileType.startsWith("video/") ? (
              <video width="100%" controls>
                <source src={filePreview} type={sermonData.fileType} />
                Your browser does not support the video element.
              </video>
            ) : (
              <Text>No preview available</Text>
            )}
          </Box>
        )}
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Or Enter URL</FormLabel>
        <Input id="url" value={sermonData.url} onChange={handleChange} />
      </FormControl>
    </>
  );
};

export default SermonForm;
