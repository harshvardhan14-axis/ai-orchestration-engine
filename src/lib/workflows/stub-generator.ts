import {
  integrationRegistry,
} from "../integrations/registry";

export interface WorkflowStub {
  id: string;

  name: string;

  integration: string;

  trigger: string;

  action: string;

  description: string;
}

export function generateWorkflowStubs(
  appType: string
): WorkflowStub[] {
  const workflows:
    WorkflowStub[] = [];

  if (appType === "crm") {
    workflows.push({
      id: "crm-slack-alert",

      name:
        "Slack Lead Alert",

      integration:
        "slack",

      trigger:
        "record_created",

      action:
        "send_message",

      description:
        "Send Slack message when new lead created",
    });

    workflows.push({
      id:
        "crm-gmail-followup",

      name:
        "Email Follow Up",

      integration:
        "gmail",

      trigger:
        "record_updated",

      action:
        "send_email",

      description:
        "Send follow-up email when lead updated",
    });
  }

  if (
    appType ===
    "project_management"
  ) {
    workflows.push({
      id:
        "jira-task-sync",

      name:
        "Jira Task Sync",

      integration:
        "jira",

      trigger:
        "task_created",

      action:
        "create_issue",

      description:
        "Create Jira issue when task created",
    });
  }

  if (
    appType ===
    "ecommerce"
  ) {
    workflows.push({
      id:
        "stripe-payment",

      name:
        "Stripe Payment Workflow",

      integration:
        "stripe",

      trigger:
        "payment_completed",

      action:
        "create_customer",

      description:
        "Create Stripe customer after payment",
    });
  }

  return workflows.filter(
    (workflow) =>
      integrationRegistry.find(
        (integration) =>
          integration.id ===
          workflow.integration
      )
  );
}