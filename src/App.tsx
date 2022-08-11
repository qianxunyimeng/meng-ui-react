import React from 'react';

import Button, { ButtonType,ButtonSize} from './components/Button/button';

function App() {
  
  return (
    <div className="App">
      <h1>hello world</h1>
      <code>
        const a = '123'
      </code>
      <Button>确定</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large} onClick={() => { alert('123')}}>确定</Button>
      <Button btnType={ ButtonType.Link} href="https://www.baidu.com" disabled>确定</Button>
    </div>
  );
}

export default App;
