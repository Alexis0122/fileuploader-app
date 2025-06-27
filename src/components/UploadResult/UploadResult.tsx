import { Code } from '@mantine/core';

type Props = {
  result: any;
};

export const UploadResult = ({ result }: Props) => {
  return (
    <Code block color="blue" mt="md">
      {JSON.stringify(result, null, 2)}
    </Code>
  );
};
