import { Box, Container, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router-dom'
import HorizontalStepper from './HorizontalStepper'

const StepperContainer = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div>

      <Toolbar>
        <Typography variant='h6'>Multi Step Form</Typography>
      </Toolbar>

      <Container>
        <Box>
          <HorizontalStepper />
        </Box>
      </Container>
    </div>
  )
}

export default StepperContainer
