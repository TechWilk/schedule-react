import JsonApiContext from "../JsonApiContext";
import { useContext } from "react";

const state: any = {};

interface jsonApiQuery {
  resource: string;
  fields: string[];
}

//function fetchApiQuery(query: jsonApiQuery): Promise<any> {
//}

function preloadApiQuery(query: jsonApiQuery) {}

function useApiPreloadQuery(query: jsonApiQuery) {
  const apiContext = useContext(JsonApiContext);

  if (state[0] === undefined) {
    state[0] = wrapPromise(startFakeApiCall(apiContext.baseUri));
  }

  return state[0]();
}

function useApiPreloadQueryPromise(key: string, query: () => Promise<Response>) {
  const apiContext = useContext(JsonApiContext);

  if (state[key] === undefined) {
    state[key] = wrapJsonPromise(query());
  }

  return state[key]();
}

function startFakeApiCall(message: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, 2500);
  });
}

function wrapJsonPromise(promise: Promise<Response>): () => Object {
  let status = "pending";
  let result: Object;
  let errorResult = "";

  let suspender = promise.then(
    (r) => {
      r.json().then(
        (data) => {
          status = "success";
          result = data;
        },
        (e) => {
          status = "error";
          errorResult = e;
        }
      );
    },
    (e) => {
      status = "error";
      errorResult = e;
    }
  );

  return () => {
    if (status === "pending") {
      throw suspender;
    } else if (status === "error") {
      throw errorResult;
    }

    return result;
  };
}
function wrapPromise<T>(promise: Promise<T>): () => T {
  let status = "pending";
  let result: T;
  let errorResult = "";

  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      errorResult = e;
    }
  );

  return () => {
    if (status === "pending") {
      throw suspender;
    } else if (status === "error") {
      throw errorResult;
    }

    return result;
  };
}

export { useApiPreloadQuery, useApiPreloadQueryPromise };
