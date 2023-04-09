import { CardContent, Container, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { serviceTools } from '../data'

const CustomerCare = () => {
  return (
    <>
        <Container>
            <Typography variant="body2" align="center" my={3}>Self Service Tools</Typography>
            <Grid container spacing={3}>
                {serviceTools.map((tool) => {
                    return (
                        <Grid item xs={3} key={tool.id}>
                            <Card>
                                <CardContent sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <tool.icon sx={{color: "#F26924"}}/>
                                    <Typography variant="body2" mt={2}>{tool.label}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}               
            </Grid>
            <Typography variant="body2" align="center" my={3}>Top Question</Typography>
            <Grid container spacing={3} fontFamily="sans-serif">
                <Grid item xs={4}>
                    <ul>
                        <li>Deliver Timelines</li>
                        <li>How do I track my Order?</li>
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <ul>
                        <li>How do I use a gift card or voucher?</li>
                        <li>How do I cancel my order?</li>
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <ul>
                        <li>What is shop's return policy?</li>
                        <li>What are the refunds timelines?</li>
                    </ul>
                </Grid>
            </Grid>
        </Container>
    </>
  )
}

export default CustomerCare