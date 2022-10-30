import { Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

const ProductService = () => {
  return (
    <>
      <Typography fontSize={12}>Services</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <AccessAlarmIcon />
          </ListItemIcon>
          <ListItemText>7 days in return</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CreditScoreIcon />
          </ListItemIcon>
          <ListItemText>Get full refound within 3 to 7 days</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DeliveryDiningIcon />
          </ListItemIcon>
          <ListItemText>Return with free delivery</ListItemText>
        </ListItem>
      </List>
    </>
  );
};

export default ProductService;
