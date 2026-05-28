export interface FieldSchema {
  name: string;

  type: string;

  nullable?: boolean;

  isPrimary?: boolean;

  isUnique?: boolean;
}

export interface EntitySchema {
  name: string;

  tableName: string;

  fields: FieldSchema[];
}

export interface DataSchema {
  entities: EntitySchema[];
}

function makeBaseFields() {
  return [
    {
      name: "id",

      type: "uuid",

      isPrimary: true,
    },

    {
      name: "tenantId",

      type: "uuid",
    },

    {
      name: "createdAt",

      type: "timestamp",
    },
  ];
}

export function generateSchema(
  entities: string[]
): DataSchema {
  return {
    entities: entities.map(
      (entity) => ({
        name: entity,

        tableName:
          entity.toLowerCase(),

        fields: [
          ...makeBaseFields(),

          {
            name: "name",

            type: "string",
          },

          {
            name: "status",

            type: "string",
          },
        ],
      })
    ),
  };
}