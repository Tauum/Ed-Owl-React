import React from 'react'
import { Button} from 'react-bootstrap';

export default function Child({parentToChild, childToParent})  {

    const childToParentData = "This is data from Child Component to the Parent Component."

    return (
        <div>
            bbbb
            <br/>
            child data = {parentToChild}
            <br/>
            <Button primary onClick={() => childToParent(childToParentData)}>Click Child</Button>
        </div>
    )
}
