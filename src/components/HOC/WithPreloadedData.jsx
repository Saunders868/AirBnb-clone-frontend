import React from "react";
import useAxios from "../../hooks/useAxios";

const WithPreloadedData = (Component) => {
  return function WithPreloadedDataComponent({
    url,
    params,
    headers,
    data,
    ...props
  }) {
    const { response, loading, error } = useAxios({
      url,
      params,
      headers,
      data,
    });
    return (
      <Component
        response={response}
        loading={loading}
        error={error}
        {...props}
      />
    );
  };
};

export default WithPreloadedData;
