import AppRoutes from "./AppRoutes";
import { ReactElement } from "react";
import { Route } from "react-router-dom";
import ErrorPage from "../components/error-404/ErrorPage";
import React from "react";
import HomePage from "../../modules/home/pages/HomePage"




class RouterClass {
  static routes = [
    {
      path: AppRoutes.home,
      element: <HomePage/>,
    },
  ];

  static getRoutes() {
    return RouterClass.routes.map((route) => {
      return RouterClass.handelRoutes(route);
    });
  }

  static handelRoutes(route) {
    // check if route has children
    if (route.children) {
      return (
        // return route with children
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children.map((child) => {
            // check if child has children
            return RouterClass.handelRoutes(child);
          })}
        </Route>
      );
    } else {
      return (
        // return route without children
        <Route key={route.path} path={route.path} element={route.element} />
      );
    }
  }
}

export default RouterClass;
