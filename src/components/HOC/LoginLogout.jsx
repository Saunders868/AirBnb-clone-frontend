import React from "react";

function WithTitle(Component) {
  return function WithTitleComponent({ title, ...props }) {
    return (
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32">
          <h1 className="text-4xl text-center mb-4">{title}</h1>
          <Component {...props} />
        </div>
      </div>
    );
  };
}

export default WithTitle;
