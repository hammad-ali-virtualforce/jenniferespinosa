import { fetchGraphQL } from "./graphql";

export interface MenuItem {
  id: string;
  databaseId: number;
  label: string;
  url: string | null;
  path: string | null;
  parentId: string | null;
  order: number;
  target: string | null;
  cssClasses: string[];
}

export interface Menu {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  locations: string[];
  menuItems: {
    nodes: MenuItem[];
  };
}

interface MenusResponse {
  menus: {
    nodes: Menu[];
  };
}

const GET_MENUS = `
  query GetMenus {
    menus(first: 20) {
      nodes {
        id
        databaseId
        name
        slug
        locations

        menuItems(first: 100) {
          nodes {
            id
            databaseId
            label
            url
            path
            parentId
            order
            target
            cssClasses
          }
        }
      }
    }
  }
`;

function findMenu(menus: Menu[], location: string) {
  const menu = menus.find((menu) =>
    menu.locations.includes(location)
  );

  if (!menu) {
    return null;
  }

  return {
    ...menu,
    menuItems: {
      nodes: [...menu.menuItems.nodes].sort(
        (a, b) => a.order - b.order
      ),
    },
  };
}

export async function getMenus() {
  const data = await fetchGraphQL<MenusResponse>({
    query: GET_MENUS,
  });

  const menus = data.menus.nodes;

  return {
    headerPrimary: findMenu(menus, "HEADER_PRIMARY"),
    headerSecondary: findMenu(menus, "HEADER_SECONDARY"),

    footerPrimary: findMenu(menus, "FOOTER_PRIMARY"),
    footerSecondary: findMenu(menus, "FOOTER_SECONDARY"),
    footerTertiary: findMenu(menus, "FOOTER_TERTIARY"),
  };
}