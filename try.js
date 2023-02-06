require('dotenv').config()

const express=require('express')
const app =express
app.request(express.json())

const stripe =require('stripe')