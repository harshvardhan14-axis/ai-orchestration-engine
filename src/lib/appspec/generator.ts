import {
  DataSchema,
} from "../schema/generator";

export interface AppPage {
  name: string;

  route: string;

  layout:
    | "list"
    | "detail"
    | "dashboard"
    | "settings";
}

export interface ApiEndpoint {
  path: string;

  method: string;

  description: string;

  entity: string;
}

export interface AuthRule {
  role: string;

  permissions: string[];
}

export interface AppSpec {
  pages: AppPage[];

  apiEndpoints:
    ApiEndpoint[];

  authRules:
    AuthRule[];
}

export function generateAppSpec(
  schema: DataSchema
): AppSpec {
  const pages =
    schema.entities.map(
      (entity) => ({
        name:
          entity.name,

        route: `/${entity.tableName}`,

        layout: "list" as const,
      })
    );

  const apiEndpoints =
    schema.entities.map(
      (entity) => ({
        path: `/api/${entity.tableName}`,

        method: "GET",

        description: `Fetch ${entity.name} records`,

        entity:
          entity.name,
      })
    );

  const authRules = [
    {
      role: "admin",

      permissions: [
        "read",
        "write",
        "delete",
      ],
    },

    {
      role: "user",

      permissions: [
        "read",
      ],
    },
  ];

  return {
    pages,

    apiEndpoints,

    authRules,
  };
}