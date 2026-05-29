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

  } else if (
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

  } else if (
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

  } else if (
    appType.includes(
      "hospital"
    )
  ) {

    workflows.push({
      id:
        "appointment-reminder",

      name:
        "Appointment Reminder",

      integration:
        "gmail",

      trigger:
        "appointment_created",

      action:
        "send_email",

      description:
        "Send appointment reminder to patient",
    });

    workflows.push({
      id:
        "doctor-notification",

      name:
        "Doctor Notification",

      integration:
        "slack",

      trigger:
        "appointment_updated",

      action:
        "send_message",

      description:
        "Notify doctor when appointment changes",
    });

  } else if (
    appType.includes(
      "food"
    )
  ) {

    workflows.push({
      id:
        "order-confirmation",

      name:
        "Order Confirmation",

      integration:
        "gmail",

      trigger:
        "order_created",

      action:
        "send_email",

      description:
        "Send order confirmation to customer",
    });

    workflows.push({
      id:
        "restaurant-notification",

      name:
        "Restaurant Notification",

      integration:
        "slack",

      trigger:
        "order_received",

      action:
        "send_message",

      description:
        "Notify restaurant of new order",
    });

  } else if (
    appType.includes(
      "school"
    ) ||
    appType.includes(
      "erp"
    )
  ) {

    workflows.push({
      id:
        "attendance-alert",

      name:
        "Attendance Alert",

      integration:
        "gmail",

      trigger:
        "attendance_marked",

      action:
        "send_email",

      description:
        "Notify parents about attendance updates",
    });

    workflows.push({
      id:
        "assignment-notification",

      name:
        "Assignment Notification",

      integration:
        "slack",

      trigger:
        "assignment_created",

      action:
        "send_message",

      description:
        "Notify teachers and students about assignments",
    });

  } else if (
    appType.includes(
      "travel"
    )
  ) {

    workflows.push({
      id:
        "booking-confirmation",

      name:
        "Booking Confirmation",

      integration:
        "gmail",

      trigger:
        "booking_created",

      action:
        "send_email",

      description:
        "Send booking confirmation to customer",
    });

    workflows.push({
      id:
        "ticket-generation",

      name:
        "Ticket Generation",

      integration:
        "slack",

      trigger:
        "payment_completed",

      action:
        "send_message",

      description:
        "Notify operations team to generate tickets",
    });

  } else {

    workflows.push({
      id:
        "generic-email-notification",

      name:
        "Email Notification",

      integration:
        "gmail",

      trigger:
        "record_created",

      action:
        "send_email",

      description:
        "Send email when a new record is created",
    });

    workflows.push({
      id:
        "generic-slack-alert",

      name:
        "Slack Alert",

      integration:
        "slack",

      trigger:
        "record_updated",

      action:
        "send_message",

      description:
        "Notify team when important updates occur",
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