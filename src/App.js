import { useState } from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import SessionExpiredPopup from "./SessionExpiredPopup";
import axios from "axios";
import { getApiDomain, getWebsiteDomain } from "./utils/utils";
Session.addAxiosInterceptors(axios);
SuperTokens.init({
    appInfo: {
        appName: "Music Player", // TODO: Your app name
        apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    recipeList: [
        EmailPassword.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
        }),
        Session.init(),
    ],
});
function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <div className="App">
            <Router>
                <Switch>
                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
                    <Route path="/">
                        <EmailPassword.EmailPasswordAuth
                            onSessionExpired={() => {
                                updateShowSessionExpiredPopup(true);
                            }}>
                            <Home />
                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                        </EmailPassword.EmailPasswordAuth>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
