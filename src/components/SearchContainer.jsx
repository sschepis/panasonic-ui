import React from 'react';

import "../App.css";

const SearchContainer = (props) => {
  const [searchValue, setSearchValue] = React.useState('');

  const { handleButtonClick } = props;

  const _handleButtonClick = async () => {
    const sVal = searchValue;
    setSearchValue('');
    handleButtonClick(sVal);
  };

   return (
     <div className="search-container">
       <p>Search or chat with the AI for maintenance procedures:</p>
       <input type="text" placeholder="Type your question..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <input
        type="submit"
        value="Submit"
        onClick={_handleButtonClick}
      />
     </div>
   );
 };

 export default SearchContainer;