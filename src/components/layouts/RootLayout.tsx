import React, { type FC, type PropsWithChildren } from 'react'
import { Paper, Stack } from '@mantine/core'
import classes from './RootLayout.module.css'

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Paper className={classes.paper}>
        <Stack className={classes.content}>{children}</Stack>
      </Paper>
    </>
  )
}
