import React, { Fragment } from "react";
import {
  SafeAreaView,
  Platform,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
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
  Checkbox,
  Center,
  Square,
  Spacer,
  Flex,
} from "native-base";

import { withTranslation } from "react-i18next";

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
import { connect } from "react-redux";

import SpinnerOverlay from "react-native-loading-spinner-overlay";
import ModalAlert from "./modal-alert";
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faAngleRight,
  faPhone,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// import Gmail from "../assets/images/gmail.png";
import { faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";

import SidebarEn from "../modules/sidebar/en";
import SidebarMm from "../modules/sidebar/mm";
import SidebarZg from "../modules/sidebar/zg";

import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import { Circle } from "react-native-svg";

const AnimatedCheckbox = Animated.createAnimatedComponent(Checkbox);

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log(this.props);

    this.state = {
      login_changed: false,
      modalBlockingSpinner: {
        visible: false,
      },
      forceRender: false,
    };

    this.LOGGEDIN_USER = false;
    this.selectedLanguage = false;

    this.userModule = new UserModule();

    this.form = {
      phone: "",
      tnc: false,
    };

    this.mobileCountryCodeRef = false;

    this.modalAlert = {
      visible: false,
      title: "",
      description: "",
    };
    this.graphRequestManager = new GraphRequestManager();

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
  };

  componentDidMount() {
    AsyncStorage.multiGet([
      CommonConstants.PERSISTENT_STORAGE_KEY.LANGUAGE,
    ]).then((storedData) => {
      if (storedData) {
        if (
          storedData[0] &&
          storedData[0][1] != null &&
          storedData[0][1] != false
        ) {
          this.selectedLanguage = storedData[0][1];
        }
      }
    });
  }

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
                        {/* <PhoneInput
                          ref={(ref) => {
                            this.mobileCountryCodeRef = ref;
                          }}
                          initialCountry="mm"
                          flagStyle={{ width: 40, height: 25, borderWidth: 0 }}
                          confirmText={t("Confirm")}
                          cancelText={t("Cancel")}
                          textStyle={[
                            COMMON_STYLES[i18n.language].regular,
                            {
                              color: COLORS.BLACK,
                            },
                          ]}
                          countriesList={require("../assets/config/custom-countries.json")}
                        /> */}
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

          <Box
            style={{
              height: 210,
              justifyContent: "flex-end",
              marginBottom: 30,
              marginTop: 30,
            }}
          >
            <Box
              style={{
                height: 210,
                marginBottom: 30,
                justifyContent: "flex-end",
              }}
            >
              <Flex>
                <Box mb={5}>
                  <Text bold textAlign={"center"} fontSize={10}>
                    Doesn't Have an Account? Sign Up{" "}
                    <Text
                      onPress={this._onRegister}
                      underline
                      color={COLORS.THEME}
                    >
                      Here
                    </Text>
                  </Text>
                </Box>

                <Box alignItems={"center"}>
                  <Text fontSize={10}>or</Text>
                  <Text fontSize={10}>Sign in with</Text>
                </Box>
              </Flex>

              <Box
                style={{
                  height: 110,
                }}
              >
                <Grid
                  style={{
                    width: 140,
                    alignSelf: "center",
                  }}
                >
                  <Col
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={this._onLoginWithFacebook}
                      style={{
                        marginBottom: 10,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        size={30}
                        style={{
                          color: "#4C69BA",
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={this._onLoginWithFacebook}
                      style={{
                        marginBottom: 10,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Square
                        backgroundColor={COLORS.BLACK}
                        rounded={100}
                        size={30}
                      >
                        <FontAwesomeIcon
                          icon={faApple}
                          size={15}
                          style={{
                            color: COLORS.WHITE,
                          }}
                        />
                      </Square>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={this._onLoginWithFacebook}
                      style={{
                        marginBottom: 10,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Square
                        backgroundColor={COLORS.WHITE}
                        style={{
                          shadowColor: "gray",
                          shadowOpacity: 1,
                          shadowRadius: 1,
                          shadowOffset: { width: 0, height: 2 },
                          elevation: 5,
                        }}
                        rounded={100}
                        size={30}
                      >
                        {/* <Image source={Gmail} resizeMode={"center"} /> */}
                      </Square>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </Box>
            </Box>

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

  _onLoginWithApple = async () => {
    const { t, i18n, screenComponentId } = this.props;

    console.log("i am login");

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
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
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

                if (this.selectedLanguage == "mm") {
                  Navigation.setRoot({
                    root: {
                      sideMenu: SidebarMm,
                    },
                  });
                } else if (this.selectedLanguage == "zg") {
                  Navigation.setRoot({
                    root: {
                      sideMenu: SidebarZg,
                    },
                  });
                } else {
                  Navigation.setRoot({
                    root: {
                      sideMenu: SidebarEn,
                    },
                  });
                }

                Navigation.events().registerBottomTabSelectedListener((tab) => {
                  global.backHandlerClickCount = 1;
                  if (tab && tab.selectedTabIndex == 0) {
                    // home
                    Navigation.popToRoot("home");
                  }
                });
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
      let message = "Unable to login with Apple";
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

  _onLoginWithFacebook = () => {
    const { t, i18n, screenComponentId } = this.props;

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

                          if (this.selectedLanguage == "mm") {
                            Navigation.setRoot({
                              root: {
                                sideMenu: SidebarMm,
                              },
                            });
                          } else if (this.selectedLanguage == "zg") {
                            Navigation.setRoot({
                              root: {
                                sideMenu: SidebarZg,
                              },
                            });
                          } else {
                            Navigation.setRoot({
                              root: {
                                sideMenu: SidebarEn,
                              },
                            });
                          }

                          Navigation.events().registerBottomTabSelectedListener(
                            (tab) => {
                              global.backHandlerClickCount = 1;
                              if (tab && tab.selectedTabIndex == 0) {
                                // home
                                Navigation.popToRoot("home");
                              }
                            }
                          );
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
      (error) => {
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

  _onLogin = () => {
    // if (this.state.modalBlockingSpinner.visible == true) {
    //   return false;
    // }

    // const { t, i18n } = this.props;

    // if (!this.form.phone) {
    //   this.modalAlert = {
    //     visible: true,
    //     title: t("Phone Required"),
    //     description: t("Please provide mobile number"),
    //   };
    //   this.setState({
    //     forceRender: !this.state.forceRender,
    //   });
    //   return false;
    // }

    // // if (
    // //   this.form.phone.startsWith("+") ||
    // //   this.form.phone.startsWith(
    // //     "+" + this.mobileCountryCodeRef.getCountryCode()
    // //   )
    // // ) {
    // //   this.modalAlert = {
    // //     visible: true,
    // //     title: t("Invalid Mobile Number"),
    // //     description: t("Please provide valid mobile number"),
    // //   };
    // //   this.setState({
    // //     forceRender: !this.state.forceRender,
    // //   });

    // //   return false;
    // // }

    // // if (this.form.tnc == false) {
    // //   this.modalAlert = {
    // //     visible: true,
    // //     title: t("Terms & Conditions"),
    // //     description: t("Please accept out terms and conditions to use the app"),
    // //   };
    // //   this.setState({
    // //     forceRender: !this.state.forceRender,
    // //   });
    // //   return false;
    // // }

    // // const mobile_number =
    // //   "+" + this.mobileCountryCodeRef.getCountryCode() + this.form.phone;
    // // const validatedPhoneNumber = parsePhoneNumberFromString(mobile_number);

    // // if (
    // //   !validatedPhoneNumber ||
    // //   !validatedPhoneNumber.country ||
    // //   !validatedPhoneNumber.isValid() ||
    // //   validatedPhoneNumber.country.toLowerCase() !=
    // //     this.mobileCountryCodeRef.getISOCode()
    // // ) {
    // //   this.modalAlert = {
    // //     visible: true,
    // //     title: t("Invalid Mobile Number"),
    // //     description: t("Please provide valid mobile number"),
    // //   };
    // //   this.setState({
    // //     forceRender: !this.state.forceRender,
    // //   });
    // //   return false;
    // // }

    // this.setState({
    //   modalBlockingSpinner: {
    //     visible: true,
    //   },
    // });

    // const { screenComponentId } = this.props;

    // let form = _.clone(this.form);
    // // form.phone = validatedPhoneNumber.format("E.164");

    // this.userModule
    //   .loginWithOtp(form)
    //   .then((response) => {
    //     this.setState(
    //       {
    //         modalBlockingSpinner: {
    //           visible: false,
    //         },
    //       },
    //       () => {
    //         Navigation.push(screenComponentId, {
    //           component: {
    //             name: "navigation.panntheefoundation.passwordScreen",
    //             passProps: {
    //               source: "login_with_otp",
    //               registerForm: form,
    //             },
    //             options: {
    //               animations: {
    //                 push: {
    //                   waitForRender: true,
    //                 },
    //               },
    //               topBar: {
    //                 height: 0,
    //                 visible: false,
    //               },
    //             },
    //           },
    //         });
    //       }
    //     );
    //   })
    //   .catch((error) => {
    //     this.setState(
    //       {
    //         modalBlockingSpinner: {
    //           visible: false,
    //         },
    //       },
    //       () => {
    //         setTimeout(() => {
    //           this.modalAlert = {
    //             visible: true,
    //             title: t("Login Failed"),
    //             description: t("phone_number_is_wrong"),
    //           };
    //           this.setState({
    //             forceRender: !this.state.forceRender,
    //           });
    //         }, 450);
    //       }
    //     );
    //   });

    const { screenComponentId } = this.props;

    Navigation.push(screenComponentId, {
      component: {
        name: "navigation.panntheefoundation.passwordScreen",
        // passProps: {
        //   source: "login_with_otp",
        //   registerForm: form,
        // },
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

  _onForgotPassword = () => {
    const { t, screenComponentId } = this.props;

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

    if (
      this.form.phone.startsWith("+") ||
      this.form.phone.startsWith(
        "+" + this.mobileCountryCodeRef.getCountryCode()
      )
    ) {
      this.modalAlert = {
        visible: true,
        title: t("Invalid Mobile Number"),
        description: t(
          "Please provide mobile number without + sign and country code"
        ),
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

    let form = {};
    form.phone = validatedPhoneNumber.format("E.164");

    this.setState({
      modalBlockingSpinner: {
        visible: true,
      },
    });

    // generate OTP to reset password
    this.userModule
      .generateOtpBySms({
        phone: form.phone,
      })
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
                  source: "forgot_password",
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
              this.modalAlert = {
                visible: true,
                title: t("Reset Password Failed"),
                description:
                  error.response && error.response.data
                    ? t(error.response.data)
                    : t("Reset password was not successful"),
              };
              this.setState({
                forceRender: !this.state.forceRender,
              });
            }, 150);
          }
        );
      });
  };

  _onRegister = () => {
    const { screenComponentId } = this.props;
    Navigation.push(screenComponentId, {
      component: {
        name: "navigation.panntheefoundation.RegisterScreen",
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
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
