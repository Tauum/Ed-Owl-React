import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";
import { useEffect, useState } from 'react';
import Child from './Child';
import { Button} from 'react-bootstrap';

export default function Parent() {

  const[ parentToChildData, setParentToChildData]=useState('')
  const[ childToParentData, setchildToParentData]=useState('')

  const childToParent = (childToParentData) => {
    setchildToParentData(childToParentData);
  }

  const parentToChild = () => {
    setParentToChildData("This is data from Parent Component to the Child Component.");
  }

  const resetData = () => {
    setParentToChildData("")
    setchildToParentData("")
  }

  return (
    <div className="App">
      <br/>
      <br/>
      <br/>
      <br/>
      aaaa
      <br/>
        parent data = {childToParentData}
      <br/>
      <div>
        <Button primary onClick={() => parentToChild()}>Click Parent</Button>
      </div>
      <br/>
      <Child parentToChild={parentToChildData} childToParent={childToParent}/>
      <br/>
      <Button onClick={() => resetData()}>Reset all</Button>
    </div>
  );
}
