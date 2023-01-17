import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default [
  {
    stack: {
      children: [
        {
          component: {
            id: "home",
            name: "navigation.panntheefoundation.HomeScreen",
          },
        },
      ],
      options: {
        topBar: {
          height: 0,
          visible: false,
        },
        bottomTab: {
          fontFamily: "RobotoMono-Regular",
          text: "Home",
          icon: require("../../assets/images/icons/home-icon.png"),
        },
      },
    },
  },
  {
    stack: {
      children: [
        {
          component: {
            id: "recent",
            name: "navigation.panntheefoundation.RecentTutorialScreen",
          },
        },
      ],
      options: {
        topBar: {
          height: 0,
          visible: false,
        },
        bottomTab: {
          fontFamily: "RobotoMono-Regular",
          text: "Recent",
          icon: require("../../assets/images/icons/recent-icon.png"),
        },
      },
    },
  },
  {
    stack: {
      children: [
        {
          component: {
            id: "chatting",
            name: "navigation.panntheefoundation.chatting",
          },
        },
      ],
      options: {
        topBar: {
          height: 0,
          visible: false,
        },
        bottomTab: {
          fontFamily: "RobotoMono-Regular",
          text: "chat",
          icon: require("../../assets/images/icons/search-icon.png"),
        },
      },
    },
  },
  {
    stack: {
      children: [
        {
          component: {
            id: "wishlist",
            name: "navigation.panntheefoundation.MyWishlistScreen",
          },
        },
      ],
      options: {
        topBar: {
          height: 0,
          visible: false,
        },
        bottomTab: {
          fontFamily: "RobotoMono-Regular",
          text: "Favourites",
          icon: require("../../assets/images/icons/heart-icon.png"),
        },
      },
    },
  },
  {
    stack: {
      children: [
        {
          component: {
            id: "profile",
            name: "navigation.panntheefoundation.ProfileScreen",
          },
        },
      ],
      options: {
        topBar: {
          height: 0,
          visible: false,
        },
        bottomTab: {
          fontFamily: "RobotoMono-Regular",
          text: "Profile",
          icon: require("../../assets/images/icons/user-icon.png"),
        },
      },
    },
  },
];
