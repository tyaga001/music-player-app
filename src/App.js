import { useRef, useState, useEffect } from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";
import axios from "axios";
Session.addAxiosInterceptors(axios);

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}


function App() {
    // axios.interceptors.request.use(function (config) {
    //     // Do something before request is sent
    //     console.log(config);
    //     return config;
    //   }, function (error) {
    //     // Do something with request error
    //     return Promise.reject(error);
    //   })
    const [alreadyExists, setAlreadyExists] = useState(false);
    const elementRef = useRef();
    const [loaded, setLoaded] = useState(false);
  const setError = status => {
      if (status === 'SESSION_ALREADY_EXISTS') {
        setAlreadyExists(true);
      } else {
          setAlreadyExists(false);
      }
  }
  useEffect(() => {
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
                 override: {
                    components: {
                        /**
                         * In this case, the <EmailPasswordSignIn> will render the original component
                         * wrapped in div with octocat picture above it.
                         */
                        EmailPasswordSignIn: ({ DefaultComponent, ...props }) => {
                            return (
                                <div>
                                    <DefaultComponent {...props} />
                                </div>
                            );
                        },
                    },
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
    
                            // we will only be overriding what happens when a user
                            // clicks the sign in button.
                            signIn: async (input) => {
                                // TODO: some custom logic
                                console.log('override....');
                              
                                
                                // or call the default behaviour as show below
                                const res = await originalImplementation.signIn(input);
                                setTimeout(() => setError(res.status), 0);
                                console.log(elementRef.current)
                                return res;
                            },
                            // ...
                            // TODO: override more functions
                        }
                    }
                }
            }),
            Session.init(),
           
        ],
    });
    (async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        setLoaded(true)
    })()
    
  }, [])
  
    
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <div className="App">
            {alreadyExists && <h4 className="already-error-text">Already Logged In on another device.</h4>}
            {loaded && <Router>
              
                    <Switch>
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                        <Route path="/">
                            <EmailPassword.EmailPasswordAuth ref={elementRef}
                                onSessionExpired={() => {
                                    updateShowSessionExpiredPopup(true);
                                }}>
                                <Home/>
                                {showSessionExpiredPopup && <SessionExpiredPopup />}
                            </EmailPassword.EmailPasswordAuth>
                        </Route>
                    </Switch>
                {/* </div> */}
                {/* <Footer /> */}
            </Router>}
        </div>
    );
}

export default App;