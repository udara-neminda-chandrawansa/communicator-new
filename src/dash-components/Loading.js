import React from 'react';
function Loading (){
    return (
        <div style={{display:'flex', padding: '1em', height: '85%', overflowY: 'scroll', width: '100%' }}>
          <h1 style={{ color: 'white', width: '100%' }}>Loading...</h1>
          <div className="w-100"></div>
        </div>
      );    
}
export default Loading;