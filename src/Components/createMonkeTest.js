import React, {useContext, useEffect, useState} from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Jumbotron} from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../context';
import './createMonkTest.css';

export default function CreateMonkTest(){
    const onFormSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <div className="wrapper">
            <div className="form-wrapper">
                <h1 className="custom-h1">Create Test</h1>
                <form className="custom-form" onSubmit ={onFormSubmit}>
                    <div className="title">
                    <label>Title:</label>
                    <input
                    placeholder="Descriptive title for the quiz."
                    type="text"
                    name="title"
                    />
                    </div>
                    <div className="noOfQuestion">
                    <label>Number of Question:</label>
                    <select>
                        <option selected value="verySmall">25</option>
                        <option value="small">40</option>
                        <option value="medium">50</option>
                        <option value="large">60</option>
                        <option value="varylarge">75</option>
                        <option value="extralarge">100</option>
                    </select>
                    </div>
                    <div className="difficulty">
                    <label>Dificulty Level:</label>
                    <select>
                        <option selected value="easy">Easy</option>
                        <option value="moderate">Moderate</option>
                        <option value="hard">Hard</option>
                    </select>
                    </div>
                    <div className="noOfQuestion">
                    <label>Quiz type:</label>
                    <select>
                        <option selected value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                    </div>
                    <div className="difficulty">
                    <label>Include Question:</label>
                    <select>
                        <option selected value="all">ALL</option>
                        <option value="mine">Only uploaded by me</option>
                    </select>
                    </div>
                </form>
            </div>
        </div>
    )
}