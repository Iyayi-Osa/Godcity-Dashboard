/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import Home from "views/Home/Home";
import { ChakraProvider } from "@chakra-ui/react";
import extendTheme from "theme/theme";
import { AuthProvider } from "context/AuthContext";
import NotFound from "views/NotFound/NotFound";
// import Home from "pages/Home";

ReactDOM.render(
	<ChakraProvider theme={extendTheme}>
		<AuthProvider>
			<HashRouter>
				<Switch>
					<Route path={`/auth`} component={AuthLayout} />
					<Route path={`/admin`} component={AdminLayout} />
					<Route path={`/rtl`} component={RTLLayout} />
					<Route exact path={`/`} component={Home} />
					<Route component={NotFound} />
				</Switch>
			</HashRouter>
		</AuthProvider>
	</ChakraProvider>,
	document.getElementById("root")
);
