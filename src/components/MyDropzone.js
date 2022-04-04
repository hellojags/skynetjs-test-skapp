import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Stack,Container} from "@mui/material";
import {useSkynet} from "../context";
export function MyDropzone() {
  const { uploadLargeFile} = useSkynet();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      await uploadLargeFile(file);
    //   const reader = new FileReader()

    //   reader.onabort = () => console.log('file reading was aborted')
    //   reader.onerror = () => console.log('file reading has failed')
    //   reader.onload = async () => {
    //     await uploadLargeFile(file);
    //   // Do whatever you want with the file contents
    //     const binaryStr = reader.result
    //     console.log(binaryStr)
    //   }
    //   reader.readAsArrayBuffer(file)
     })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <Container maxWidth="lg">
     <Stack
          alignItems="center"
          spacing={1}
          sx={{
            p: 1.5,
            pt: 1,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200'
          }}
        >
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
    </Stack>
    </Container>
  )
}