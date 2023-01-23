import React, { Fragment } from "react";
import {
  SafeAreaView,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import {
  NativeBaseProvider,
  extendTheme,
  Box,
  HStack,
  Text,
  FormControl,
  Stack,
  Input,
  Button,
  Flex,
  Square,
  Checkbox,
} from "native-base";

import { withTranslation } from "react-i18next";
import { faPhone, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Gmail from "../assets/images/gmail.png";
import { faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";

import COMMON_STYLES, {
  COLORS,
  FONTS,
  COMMON_STYLE,
} from "../modules/styles.common.js";

import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Navigation } from "react-native-navigation";
import UserModule from "../services/user.module";
import CommonConstants from "../modules/constants.common.js";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

Input.defaultProps = Input.defaultProps || {};
Input.defaultProps.allowFontScaling = false;

import PhoneInput from "react-native-phone-input";
import { Grid, Row, Col } from "react-native-easy-grid";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import _ from "lodash";
import SpinnerOverlay from "react-native-loading-spinner-overlay";
import ModalAlert from "./modal-alert";

import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from "@invertase/react-native-apple-authentication";

const AnimatedCheckbox = Animated.createAnimatedComponent(Checkbox);

class Register extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      login_changed: false,
      forceRender: false,
      modalBlockingSpinner: {
        visible: false,
      },
    };

    this.form = {
      phone: props.phone || "",
      first_name: props.name || "",
      email: "",
      tnc: false,
    };

    this.LOGGEDIN_USER = false;

    this.userModule = new UserModule();

    this.mobileCountryCodeRef = false;
    this.modalAlert = {
      visible: false,
      title: "",
      description: "",
    };

    this.graphRequestManager = new GraphRequestManager();

    this.popScreenComponent = false;

    this.theme = extendTheme({
      colors: {
        theme: {
          600: COLORS.THEME,
        },
      },
    });
  }

  onModalAlertPress = () => {
    this.modalAlert = {
      visible: false,
      title: "",
      description: "",
    };
    this.setState({
      forceRender: !this.state.forceRender,
    });

    if (this.popScreenComponent == true) {
      this.popScreenComponent = false;
      Navigation.pop(this.props.screenComponentId);
    }
  };

  render() {
    const { width, height } = Dimensions.get("window");
    const statusBarCurrentHeight =
      Platform.OS == "ios" ? getStatusBarHeight(true) : 0;
    const state = this.state;
    const { t, i18n } = this.props;
    const modalAlert = this.modalAlert;
    const majorVersionIOS = parseInt(Platform.Version);
    const logo_image = require("../assets/images/panthee-logo.png");

    return (
      <NativeBaseProvider theme={this.theme}>
        <Box
          style={{
            paddingLeft: COMMON_STYLE.PADDING,
            paddingRight: COMMON_STYLE.PADDING,
            height: height < 680 ? 680 : height,
          }}
        >
          <SpinnerOverlay
            visible={state.modalBlockingSpinner.visible}
            cancelable={false}
            textContent={t("Loading")}
            textStyle={[
              COMMON_STYLES[i18n.language].regular,
              {
                textAlign: "center",
                color: COLORS.WHITE,
                fontWeight: "",
              },
            ]}
            animation={"fade"}
            overlayColor={"rgba(0, 0, 0, 0.75)"}
          />

          <ModalAlert
            modalAlert={modalAlert}
            onPress={this.onModalAlertPress}
          ></ModalAlert>

          <Box
            style={{
              height: 450,
              justifyContent: "center",
            }}
          >
            <Box
              style={{
                marginBottom: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={logo_image}
                style={{
                  width: 160,
                  height: 160,
                  marginTop: 30,
                }}
              />
              <Text letterSpacing={3} fontSize={10}>
                Education
              </Text>
            </Box>

            <FormControl
              isRequired
              style={{
                height: 80,
                marginBottom: 7,
              }}
            >
              <Stack>
                <Box alignItems={"center"}>
                  <Input
                    p={Platform.OS === "ios" ? 4 : 3}
                    backgroundColor="gray.100"
                    width={280}
                    onChangeText={(text) => {
                      this.form.phone = text;
                    }}
                    InputLeftElement={
                      <Box>
                        <FontAwesomeIcon
                          icon={faPhone}
                          size={15}
                          style={{
                            color: COLORS.THEME,
                            marginLeft: 20,
                          }}
                        />
                      </Box>
                    }
                    placeholder="09xxxxxxxx"
                    placeholderTextColor={COLORS.GRAY}
                    keyboardType={"decimal-pad"}
                    variant="rounded"
                    style={[
                      COMMON_STYLES[i18n.language],
                      {
                        fontSize: 13,
                        letterSpacing: 3,
                      },
                    ]}
                  />
                </Box>
              </Stack>
            </FormControl>

            <Box alignItems={"center"} rounded={"full"} justifyContent="center">
              <Button
                block
                onPress={this._onLogin}
                style={COMMON_STYLES.LOGIN_BUTTON}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={20}
                  style={{
                    color: COLORS.WHITE,
                  }}
                />
              </Button>
            </Box>
          </Box>

          <Box>
            <Flex>
              <Box mb={5}>
                <Text bold textAlign={"center"} fontSize={10}>
                  Already Have an Account? Login{" "}
                  <Text onPress={this._onLogin} color={COLORS.THEME}>
                    Here
                  </Text>
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box
            style={{
              height: 210,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity>
              <Text
                style={[
                  COMMON_STYLES[i18n.language].regular,
                  {
                    textDecorationLine: "underline",
                    color: COLORS.BLACK,
                    textAlign: "center",
                    fontSize: 12,
                  },
                ]}
              >
                {t("Terms of use | Private Policy")}
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </NativeBaseProvider>
    );
  }

  _onRegisterWithApple = async () => {
    const { t, i18n, screenComponentId } = this.props;

    if (Platform.OS != "ios") {
      this.modalAlert = {
        visible: true,
        title: t("Device Not Supported"),
        description: t("Please use iPhone to login with Apple Sign In"),
      };
      this.setState({
        forceRender: !this.state.forceRender,
      });
      return false;
    }

    // do apple login

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      this.setState({
        modalBlockingSpinner: {
          visible: true,
        },
      });
      let form = {
        first_name: appleAuthRequestResponse.fullName.givenName,
        last_name: appleAuthRequestResponse.fullName.familyName,
        email: appleAuthRequestResponse.email,
        apple_id: appleAuthRequestResponse.user,
        language: i18n.language,
        apple_auth_response: {
          nonce: appleAuthRequestResponse.nonce,
          user: appleAuthRequestResponse.user,
          fullName: appleAuthRequestResponse.fullName,
          realUserStatus: appleAuthRequestResponse.realUserStatus,
          authorizedScopes: appleAuthRequestResponse.authorizedScopes,
          identityToken: appleAuthRequestResponse.identityToken,
          email: appleAuthRequestResponse.email,
          state: appleAuthRequestResponse.state,
          authorizationCode: appleAuthRequestResponse.authorizationCode,
        },
      };
      form.registration_source = 5; //FROM APPLE SIGN IN MCOMMERCE
      this.userModule
        .register(form)
        .then((response) => {
          this.setState(
            {
              modalBlockingSpinner: {
                visible: false,
              },
            },
            () => {
              this.LOGGEDIN_USER = response.data.data;

              AsyncStorage.setItem(
                CommonConstants.PERSISTENT_STORAGE_KEY.LOGGEDIN_USER,
                JSON.stringify(this.LOGGEDIN_USER)
              );

              setTimeout(() => {
                this.props.updateLoginChanged(this.LOGGEDIN_USER);
                this.modalAlert = {
                  visible: true,
                  title: t("Registration Successful"),
                };
                this.setState({
                  forceRender: !this.state.forceRender,
                });

                this.popScreenComponent = true;
                // Navigation.pop(screenComponentId)
              }, 150);
            }
          );
        })
        .catch((error) => {
          this.setState(
            {
              modalBlockingSpinner: {
                visible: false,
              },
            },
            () => {
              setTimeout(() => {
                this.modalAlert = {
                  visible: true,
                  title: t("Registration Failed"),
                  description:
                    error.response && error.response.data
                      ? t(error.response.data)
                      : t("Registration was not successful"),
                };
                this.setState({
                  forceRender: !this.state.forceRender,
                });
              }, 150);
            }
          );
        });
    } else {
      let message = "Unable to login with Applen";
      if (credentialState === AppleAuthCredentialState.REVOKED) {
        message = "Your apple credential has been revoked";
      } else if (credentialState === AppleAuthCredentialState.NOT_FOUND) {
        message = "Your apple ID has not been found";
      } else if (credentialState === AppleAuthCredentialState.TRANSFERRED) {
        message = "Your apple account has been transferred";
      }
      this.modalAlert = {
        visible: true,
        title: t("Unable to login with Apple"),
        description: t(message),
      };
      this.setState({
        forceRender: !this.state.forceRender,
      });
    }
  };

  _onRegisterWithFacebook = () => {
    const { t, i18n, screenComponentId } = this.props;

    // if (Platform.OS === "android") {
    //     LoginManager.setLoginBehavior("web_only")
    // }

    LoginManager.logOut();
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (result) => {
        if (result.isCancelled) {
          this.modalAlert = {
            visible: true,
            title: t("Facebook Login"),
            description: t("Facebook login was cancelled"),
          };
          this.setState({
            forceRender: !this.state.forceRender,
          });
        } else {
          this.setState({
            modalBlockingSpinner: {
              visible: true,
            },
          });

          let request = new GraphRequest(
            "/me",
            { fields: "id,first_name,last_name,email" },
            (error, user_info) => {
              if (user_info) {
                // profile.avatar = `https://graph.facebook.com/${result.id}/picture`
                let form = {
                  first_name: user_info.name,
                  email: user_info.email,
                  facebook_id: user_info.id,
                  language: i18n.language,
                  facebook_auth_response: {
                    authResponse: {
                      userID: user_info.id,
                    },
                  },
                };
                form.registration_source = 4; //FROM MCOMMERCE FACEBOOK
                this.userModule
                  .register(form)
                  .then((response) => {
                    this.setState(
                      {
                        modalBlockingSpinner: {
                          visible: false,
                        },
                      },
                      () => {
                        this.LOGGEDIN_USER = response.data.data;

                        AsyncStorage.setItem(
                          CommonConstants.PERSISTENT_STORAGE_KEY.LOGGEDIN_USER,
                          JSON.stringify(this.LOGGEDIN_USER)
                        );

                        setTimeout(() => {
                          this.props.updateLoginChanged(this.LOGGEDIN_USER);
                          this.modalAlert = {
                            visible: true,
                            title: t("Registration Successful"),
                          };
                          this.setState({
                            forceRender: !this.state.forceRender,
                          });

                          this.popScreenComponent = true;
                        }, 150);
                      }
                    );
                  })
                  .catch((error) => {
                    this.setState(
                      {
                        modalBlockingSpinner: {
                          visible: false,
                        },
                      },
                      () => {
                        setTimeout(() => {
                          this.modalAlert = {
                            visible: true,
                            title: t("Registration Failed"),
                            description:
                              error.response && error.response.data
                                ? t(error.response.data)
                                : t("Registration was not successful"),
                          };
                          this.setState({
                            forceRender: !this.state.forceRender,
                          });
                        }, 150);
                      }
                    );
                  });
              } else {
                this.modalAlert = {
                  visible: true,
                  title: t("Facebook Login"),
                  description: t("Facebook login failed"),
                };
                this.setState({
                  forceRender: !this.state.forceRender,
                });
              }
            }
          );

          this.graphRequestManager.addRequest(request).start();
        }
      },
      function (error) {
        this.modalAlert = {
          visible: true,
          title: t("Facebook Login"),
          description: t("Facebook login failed"),
        };
        this.setState({
          forceRender: !this.state.forceRender,
        });
      }
    );
  };

  _onRegister = () => {
    if (this.state.modalBlockingSpinner.visible == true) {
      return false;
    }

    const { t, i18n } = this.props;
    if (!this.form.phone) {
      this.modalAlert = {
        visible: true,
        title: t("Phone Required"),
        description: t("Please provide mobile number"),
      };
      this.setState({
        forceRender: !this.state.forceRender,
      });

      return false;
    }

    if (!this.form.first_name) {
      this.modalAlert = {
        visible: true,
        title: t("Name Required"),
        description: t("Please provide name"),
      };
      this.setState({
        forceRender: !this.state.forceRender,
      });
      return false;
    }

    if (
      this.form.phone.startsWith("+") ||
      this.form.phone.startsWith(
        "+" + this.mobileCountryCodeRef.getCountryCode()
      )
    ) {
      this.modalAlert = {
        visible: true,
        title: t("Invalid Mobile Number"),
        description: t("Please provide valid mobile number"),
      };
      this.setState({
        forceRender: !this.state.forceRender,
      });
      return false;
    }

    if (this.form.tnc == false) {
      this.modalAlert = {
        visible: true,
        title: t("Terms & Conditions"),
        description: t("Please accept out terms and conditions to use the app"),
      };
      this.setState({
        forceRender: !this.state.forceRender,
      });
      return false;
    }

    const mobile_number =
      "+" + this.mobileCountryCodeRef.getCountryCode() + this.form.phone;
    const validatedPhoneNumber = parsePhoneNumberFromString(mobile_number);

    if (
      !validatedPhoneNumber ||
      !validatedPhoneNumber.country ||
      !validatedPhoneNumber.isValid() ||
      validatedPhoneNumber.country.toLowerCase() !=
        this.mobileCountryCodeRef.getISOCode()
    ) {
      this.modalAlert = {
        visible: true,
        title: t("Invalid Mobile Number"),
        description: t("Please provide valid mobile number"),
      };
      this.setState({
        forceRender: !this.state.forceRender,
      });
      return false;
    }

    // validate email

    if (this.form.email) {
      let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(this.form.email)) {
        this.modalAlert = {
          visible: true,
          title: t("Invalid Email"),
          description: t("Please enter a valid email address"),
        };
        this.setState({
          forceRender: !this.state.forceRender,
        });
        return false;
      }
    }

    this.setState({
      modalBlockingSpinner: {
        visible: true,
      },
    });

    const { screenComponentId } = this.props;

    let form = _.clone(this.form);

    form.phone = validatedPhoneNumber.format("E.164");
    form.language = i18n.language;

    // direct register if OTP verification is not enabled
    form.registration_source = 3; //FROM MCOMMERCE
    this.userModule
      .register(form)
      .then((response) => {
        this.setState(
          {
            modalBlockingSpinner: {
              visible: false,
            },
          },
          () => {
            Navigation.push(screenComponentId, {
              component: {
                name: "navigation.panntheefoundation.VerifyOtpScreen",
                passProps: {
                  registerForm: form,
                },
                options: {
                  animations: {
                    push: {
                      waitForRender: true,
                    },
                  },
                  topBar: {
                    height: 0,
                    visible: false,
                  },
                },
              },
            });
          }
        );
      })
      .catch((error) => {
        this.setState(
          {
            modalBlockingSpinner: {
              visible: false,
            },
          },
          () => {
            setTimeout(() => {
              let msg = false;
              if (error.response && error.response.data) {
                if (
                  error.response.data
                    .toString()
                    .indexOf(
                      "is already registered. Please use a different Phone"
                    ) > -1
                ) {
                  msg = t("phone_already_registered", {
                    phone: this.form.phone,
                  });
                } else if (
                  error.response.data
                    .toString()
                    .indexOf(
                      "is already registered. Please use a different Email"
                    ) > -1
                ) {
                  msg = t("email_already_registered", {
                    email: this.form.email,
                  });
                } else {
                  msg = t(error.response.data);
                }
              }
              this.modalAlert = {
                visible: true,
                title: t("Registration Failed"),
                description: msg ? msg : t("Registration was not successful"),
              };
              this.setState({
                forceRender: !this.state.forceRender,
              });
            }, 150);
          }
        );
      });
  };

  _onLogin = () => {
    const { screenComponentId } = this.props;
    Navigation.push(screenComponentId, {
      component: {
        name: "navigation.panntheefoundation.VerifyOtpScreen",
        passProps: {
          screenComponentId: this.props.componentId,
        },
        options: {
          animations: {
            push: {
              waitForRender: true,
            },
          },
          topBar: {
            height: 0,
            visible: false,
          },
        },
      },
    });
  };

  _onClickedTncCheckbox = () => {
    this.form.tnc = !this.form.tnc;

    this.setState({
      forceRender: !this.state.forceRender,
    });
  };

  _onClickedTncReadmore = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: "sidebar.panntheefoundation.TermsAndConditionsScreenLeft",
              passProps: {
                isModal: true,
              },
              options: {
                topBar: {
                  height: 0,
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };
}

function mapStateToProps(state) {
  return {
    login_changed: state.login_changed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLoginChanged: (LOGGEDIN_USER) =>
      dispatch({ type: "LOGIN_CHANGED", payload: LOGGEDIN_USER }),
  };
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
