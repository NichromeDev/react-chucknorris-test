import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

const elevation: number = 6;
const variant: string = "filled";

export default (props: any): JSX.Element => (
  <MuiAlert elevation={elevation} variant={variant} {...props} />
);
