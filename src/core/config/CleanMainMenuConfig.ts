export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  evrimxIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        evrimxIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "invoices",
        route: "/invoices",
        evrimxIcon: "book",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "map",
        route: "/map",
        evrimxIcon: "map",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "icons",
        route: "/icons",
        evrimxIcon: "rocket",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
];

export default MainMenuConfig;
