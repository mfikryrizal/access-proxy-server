// import express from 'express';
// import { axios } from 'axios';
const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/proxy", function (req, res) {
        const url = decodeURI(req.query.url);
        const method = req.query.method || "GET";
        const contentType = req.query.contenttype;
        const authHeader = req.headers.authorization;
        const body = req.body;

        const newHeaders = {
            "X-date": new Date().toISOString(),
        };
        if (authHeader) {
            newHeaders.Authorization = authHeader;
        }
        if (contentType) {
            newHeaders["Content-Type"] = contentType;
        }
        
        axios
        .request({
            baseUrl: '',
            url: url,
            method: method.toUpperCase(),
            headers: newHeaders,
            data: body
        })
        .then((response) => {
            console.log(response.body)
            res.statusCode = response.status;
            res.statusMessage = response.statusText;
            res.send({data: response.data, headers: response.headers});
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.statusText);
                console.log(error.response.headers);
                
                res.statusCode = error.response.status;
                res.statusMessage = error.response.statusText;
                res.send({data: error.response.data, headers: error.response.headers});
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js

                res.statusCode = 500;
                res.send(JSON.stringify(error));
            } else {
                // Something happened in setting up the request that triggered an Error

                res.statusCode = 500;
                res.send(JSON.stringify(error));
            }
        });
    });
    
    // Start the Proxy
    app.listen(PORT, () => {
        console.log(`Starting Proxy at port ${PORT}`);
    });
    