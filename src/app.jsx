import React from 'react'
import reactDOM from 'react-dom';
import './app.less';
import Tree from './components/Tree';
import { treeData, config } from "./data/feakData";

function nodeClick (data) {
  console.log(data)
}
function selectChange(data) {
  console.log(data)
}
reactDOM.render(
    <Tree
      config={ config }
      treeData={ treeData }
      selectChange={(data) => selectChange(data)}
      nodeClick={(data) => nodeClick(data)} />, document.getElementById('react-tree'))