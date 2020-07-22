import { useState, useCallback } from "react";

import {serverUrl} from "../variables";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = {
        "Content-Type": "application/json"
      }
    ) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(serverUrl + url, {
          method: method,
          headers: {
            "Content-Type": "application/json"
          },
          body: body
        });
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "something was wrong");

        setLoading(false);
        return data;
      } catch (ex) {
        setLoading(false);
        setError(ex.message);
        throw ex;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
