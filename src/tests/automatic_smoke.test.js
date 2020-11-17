import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import fs from 'fs';
function isCaps(str)
{
  if(str[0] === str[0].toUpperCase())
  {
    return true;
  }
  return false;
}
function getReactComponents()
{
  let files = fs.readdirSync('./src');
  let result = {};
  for(const file of files)
  {
    if(isCaps(file) && file.includes('.js'))
    {
      
      result[file] = require(`../${file}`)
      
    }
  }
  return result;
}
const components = getReactComponents();

//I decided to read the file directory and automatically grab all of the components in the src since they all start with capital letters.
//Pretty awesome you can do it like this, I wish I had made this earlier in the program.
for(const [name,Component] of Object.entries(components))
{
  it(`renders ${name} without crashing`, () => {
    const div = document.createElement('div');
    ReactDom.render(
    <BrowserRouter>
      <Component.default/>
    </BrowserRouter>, div);
  
    ReactDom.unmountComponentAtNode(div);
  });
}


