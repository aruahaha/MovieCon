import React from "react";
import { Button } from "@mui/material";
import { useRouteError } from "react-router";

export default function ErrorBoundary() {
    let error = useRouteError();

    return (
        <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column" , marginTop:"30px"}}>
            <h1 style={{textAlign:"center"}}>Dang Error!</h1>
            <Button href={`/`} variant="contained" color="primary" >
                Return
            </Button>
        </div>
    )
}