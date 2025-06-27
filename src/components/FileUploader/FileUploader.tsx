import { useRef, useState, useEffect } from 'react';
import {
  Button,
  Code,
  Group,
  Stack,
  Text,
  Title,
  rem,
  Container,
  Box,
  Image,
  Loader,
  Progress,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { UploadSimple, X, ImageSquare } from '@phosphor-icons/react'
import { useUploadFile } from '@/hooks/useUploadFile';

export const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [localData, setLocalData] = useState<any>(null); // para controlar el JSON
  const [isTiming, setIsTiming] = useState(false);

  const resetRef = useRef<() => void>(null);
  const { mutate, data, isPending } = useUploadFile();

  const handleUpload = () => {
    if (file) {
      setStartTime(performance.now());
      setElapsedTime(0);
      setIsTiming(true);
      mutate(file);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setElapsedTime(null);
    setStartTime(null);
    setIsTiming(false);
    setLocalData(null);
    resetRef.current?.();
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  useEffect(() => {
    let animationFrameId: number;

    const updateElapsed = () => {
      if (startTime !== null) {
        const now = performance.now();
        const diff = (now - startTime) / 1000;
        setElapsedTime(parseFloat(diff.toFixed(1)));
      }

      if (isTiming) {
        animationFrameId = requestAnimationFrame(updateElapsed);
      }
    };

    if (isTiming) {
      animationFrameId = requestAnimationFrame(updateElapsed);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isTiming, startTime]);

  useEffect(() => {
    if (data && isTiming) {
      setIsTiming(false);
      setLocalData(data);
    }
  }, [data, isTiming]);

  return (
    <Container size="md" p="md" style={{ backgroundColor: '#0f1117', borderRadius: rem(8) }}>
      <Stack>
        <Title order={5} c="gray.4">
          Documento
        </Title>

        {!previewUrl ? (
          <Dropzone
            onDrop={(files) => setFile(files[0])}
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
                <ImageSquare size="3.2rem" />
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
        ) : (
          <Image src={previewUrl} alt="Preview" radius="md" fit="contain" h={200} />
        )}

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

        {/* Loader circular */}
        {isTiming && (
          <Group mt="sm">
            <Loader color="blue" />
            <Text c="gray.4">Cargando... {elapsedTime?.toFixed(1)}s</Text>
          </Group>
        )}

        {/* Loader tipo barra */}
        {isTiming && (
          <Box>
            <Progress
              value={Math.min((elapsedTime ?? 0) * 10, 100)}
              striped
              size="md"
              mt="sm"
              color="blue"
            />
            <Text size="xs" c="gray.5" ta="center" mt="xs">
              Tiempo transcurrido: {elapsedTime?.toFixed(1)}s
            </Text>
          </Box>
        )}

        {localData && (
          <Box mt="md">
            <Title order={6} c="gray.4">
              JSON
            </Title>
            <Code block color="white" mt="xs">
              {JSON.stringify(localData, null, 2)}
            </Code>
          </Box>
        )}
      </Stack>
    </Container>
  );
};
