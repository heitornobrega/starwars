import React from 'react';

function TextFilter() {
  return (
    <div>
      <input
        data-testid="name-filter"
        id="name-filter"
        type="text"
        onChange={ textFilter }
      />
    </div>
  );
}

export default TextFilter;
