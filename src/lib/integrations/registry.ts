export interface IntegrationTrigger {
  event: string;

  description: string;
}

export interface IntegrationAction {
  id: string;

  name: string;

  description: string;

  inputSchema: Record<
    string,
    string
  >;
}

export interface IntegrationDefinition {
  id: string;

  displayName: string;

  authType:
    | "oauth2"
    | "api_key"
    | "webhook_secret"
    | "none";

  triggers:
    IntegrationTrigger[];

  actions:
    IntegrationAction[];
}

export const integrationRegistry:
  IntegrationDefinition[] = [
  {
    id: "slack",

    displayName: "Slack",

    authType: "oauth2",

    triggers: [
      {
        event:
          "record_updated",

        description:
          "Triggered when a record updates",
      },
    ],

    actions: [
      {
        id: "send_message",

        name:
          "Send Message",

        description:
          "Send message to Slack channel",

        inputSchema: {
          channel: "string",

          text: "string",
        },
      },
    ],
  },

  {
    id: "gmail",

    displayName: "Gmail",

    authType: "oauth2",

    triggers: [
      {
        event:
          "record_created",

        description:
          "Triggered when record created",
      },
    ],

    actions: [
      {
        id: "send_email",

        name:
          "Send Email",

        description:
          "Send email notification",

        inputSchema: {
          to: "string",

          subject: "string",

          body: "string",
        },
      },
    ],
  },

  {
    id: "whatsapp",

    displayName:
      "WhatsApp",

    authType: "api_key",

    triggers: [
      {
        event:
          "status_changed",

        description:
          "Triggered when status changes",
      },
    ],

    actions: [
      {
        id:
          "send_template_message",

        name:
          "Send Template Message",

        description:
          "Send WhatsApp template message",

        inputSchema: {
          phone:
            "string",

          template:
            "string",
        },
      },
    ],
  },

  {
    id: "stripe",

    displayName:
      "Stripe",

    authType: "api_key",

    triggers: [
      {
        event:
          "payment_completed",

        description:
          "Triggered after payment",
      },
    ],

    actions: [
      {
        id:
          "create_customer",

        name:
          "Create Customer",

        description:
          "Create Stripe customer",

        inputSchema: {
          email:
            "string",
        },
      },
    ],
  },

  {
    id: "jira",

    displayName:
      "Jira",

    authType: "oauth2",

    triggers: [
      {
        event:
          "task_created",

        description:
          "Triggered when task created",
      },
    ],

    actions: [
      {
        id:
          "create_issue",

        name:
          "Create Issue",

        description:
          "Create Jira issue",

        inputSchema: {
          title:
            "string",

          description:
            "string",
        },
      },
    ],
  },
];