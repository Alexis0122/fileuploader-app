// import { useRef, useState } from 'react';
// import { Button, FileButton, Group, Text } from '@mantine/core';
// import { useUploadFile } from '@/hooks/useUploadFile';
// import { UploadResult } from '../UploadResult/UploadResult';

// export const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const resetRef = useRef<() => void>(null);
//   const { mutate, data, isPending } = useUploadFile();

//   const handleUpload = () => {
//     if (file) mutate(file);
//   };

//   return (
//     <div>
//       <Group mb="md">
//         <FileButton onChange={setFile} accept="*/*" resetRef={resetRef}>
//           {(props) => <Button {...props}>Seleccionar archivo</Button>}
//         </FileButton>

//         <Button
//           onClick={() => {
//             setFile(null);
//             resetRef.current?.();
//           }}
//           variant="default"
//         >
//           Reset
//         </Button>

//         <Button onClick={handleUpload} disabled={!file || isPending}>
//           Subir
//         </Button>
//       </Group>

//       {file && <Text size="sm">Archivo seleccionado: <strong>{file.name}</strong></Text>}
//       {data && <UploadResult result={data} />}
//     </div>
//   );
// };

import { useRef, useState } from 'react';
import {
  Button,
  Code,
  Group,
  Stack,
  Text,
  Title,
  rem,
  Container,
  Box
} from '@mantine/core';
import { Dropzone, type DropzoneProps, IMAGE_MIME_TYPE} from '@mantine/dropzone'
import { UploadSimple, X, Image } from '@phosphor-icons/react'
import { useUploadFile } from '@/hooks/useUploadFile';

export const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const { mutate, data, isPending } = useUploadFile();

  const handleUpload = () => {
    if (file) mutate(file);
  };

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  return (
    <Container size="md" p="md" style={{ backgroundColor: '#0f1117', borderRadius: rem(8) }}>
      <Stack>
        <Title order={5} c="gray.4">
          Matricula
        </Title>

        <Dropzone
          onDrop={(files) => setFile(files[0])}
          onReject={(files) => console.log('Rejected files', files)}
          maxSize={5 * 1024 ** 2}
          accept={[...IMAGE_MIME_TYPE]}
          multiple={false}
          style={{
            borderColor: '#2e2e2e',
            backgroundColor: '#1a1b1e',
            padding: rem(40),
            borderRadius: rem(6),
          }}
        >
          <Group justify="center" style={{ pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <UploadSimple size="3.2rem" />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <X size="3.2rem" />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <Image size="3.2rem"  />
            </Dropzone.Idle>

            <div>
              <Text ta="center" size="md" c="gray.4">
                Coloque la imagen aquí
              </Text>
              <Text ta="center" size="xs" c="gray.5">
                Haga click para cargar
              </Text>
            </div>
          </Group>
        </Dropzone>

        <Group justify="apart" mt="md">
          <Button variant="default" onClick={clearFile} fullWidth>
            Clear
          </Button>
          <Button onClick={handleUpload} disabled={!file || isPending} fullWidth>
            Submit
          </Button>
        </Group>

        {file && (
          <Text size="sm" c="gray.4">
            Archivo seleccionado: <strong>{file.name}</strong>
          </Text>
        )}

        {data && (
          <Box mt="md">
            <Title order={6} c="gray.4">
              JSON
            </Title>
            <Code block color="white" mt="xs">
              {JSON.stringify(data, null, 2)}
            </Code>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

