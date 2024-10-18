declare module "chatwoot-client" {
  import { AxiosInstance, AxiosResponse } from "axios";

  interface ApiResponse<T> {
    success: boolean;
    error?: string;
    errorCode?: number;
    errors?: Array<{ field: string; message: string; code: string }>;
    data?: T;
  }

  interface Config {
    host: string;
    userToken?: string;
    platformToken?: string;
    version?: string;
  }

  interface Account {
    id: number;
    name: string;
    locale: string;
    domain: string | null;
    support_email: string;
    features: {
      inbound_emails: boolean;
      channel_email: boolean;
      channel_facebook: boolean;
      channel_twitter: boolean;
      help_center: boolean;
      macros: boolean;
      agent_management: boolean;
      team_management: boolean;
      inbox_management: boolean;
      labels: boolean;
      custom_attributes: boolean;
      automations: boolean;
      canned_responses: boolean;
      integrations: boolean;
      voice_recorder: boolean;
      channel_website: boolean;
      campaigns: boolean;
      reports: boolean;
      crm: boolean;
      auto_resolve_conversations: boolean;
      send_agent_name_in_whatsapp_message: boolean;
      read_message: boolean;
      agent_conversation_viewed: boolean;
      channel_whatsapp: boolean;
      channel_api: boolean;
    };
    custom_attributes: Record<string, any>;
    limits: Record<string, any>;
    status: "active" | "inactive";
  }

  interface CreateAccount {
    name: string;
  }

  interface GetAccount {
    accountId: number;
  }

  interface UpdateAccount {
    accountId: number;
    name: string;
  }

  interface DeleteAccount {
    accountId: number;
  }

  interface AccountUser {
    account_id: number;
    user_id: number;
    role: "administrator" | "agent";
  }

  interface ListAccountUsers {
    accountId: number;
  }

  interface CreateAccountUser {
    accountId: number;
    userId: number;
    role: "administrator" | "agent";
  }

  interface DeleteAccountUser {
    accountId: number;
    userId: number;
  }

  interface ListAgentBots {}

  interface CreateAgentBot {
    name: string;
    description: string;
    outgoing_url: string;
  }

  interface GetAgentBotDetails {
    id: number;
  }

  interface UpdateAgentBot {
    id: number;
    name: string;
    description: string;
    outgoing_url: string;
  }

  interface DeleteAgentBot {
    id: number;
  }

  interface AgentBot {
    id: number;
    name: string;
    description: string;
    account_id: number;
    outgoing_url: string;
  }

  interface CreateUser {
    name?: string;
    email?: string;
    password?: string;
    customAttributes?: Record<string, any>;
  }

  interface GetUserDetails {
    id: number;
  }

  interface UserDetails {
    id: number;
    uid: string;
    name: string;
    available_name: string;
    display_name: string;
    email: string;
    account_id: number;
    role: "agent" | "administrator";
    confirmed: boolean;
    custom_attributes: Record<string, any>;
    accounts: Array<{
      id: number;
      name: string;
      role: "administrator" | "agent";
    }>;
  }

  interface UpdateUser {
    id: number;
    name: string;
    email: string;
    password: string;
    customAttributes?: Record<string, any>;
  }

  interface DeleteUser {
    id: number;
  }

  interface GetUserSSOLink {
    id: number;
  }

  interface UserSSOLink {
    url: string;
  }

  interface User {
    id: number;
    uid: string;
    name: string;
    available_name: string;
    display_name: string;
    email: string;
    account_id: number;
    role: "agent" | "administrator";
    confirmed: boolean;
    custom_attributes: Record<string, any>;
    accounts: Array<{
      id: number;
      name: string;
      role: "administrator" | "agent";
    }>;
  }

  interface ListAccountAgentBots {
    accountId: number;
  }

  interface CreateAccountAgentBot {
    accountId: number;
    name: string;
    description: string;
    outgoing_url: string;
  }

  interface GetAccountAgentBotDetails {
    accountId: number;
    id: number;
  }

  interface UpdateAccountAgentBot {
    accountId: number;
    id: number;
    name: string;
    description: string;
    outgoing_url: string;
  }

  interface DeleteAccountAgentBot {
    accountId: number;
    id: number;
  }

  interface AccountAgentBot {
    id: number;
    name: string;
    description: string;
    account_id: number;
    outgoing_url: string;
  }

  interface ListAgents {
    accountId: number;
  }

  interface AddAgent {
    accountId: number;
    name: string;
    email: string;
    role: "agent" | "administrator";
    availabilityStatus?: "available" | "busy" | "offline";
    autoOffline?: boolean;
  }

  interface UpdateAgent {
    accountId: number;
    id: number;
    role: "agent" | "administrator";
    availability?: "available" | "busy" | "offline";
    autoOffline?: boolean;
  }

  interface RemoveAgent {
    accountId: number;
    id: number;
  }

  interface Agent {
    id: number;
    uid: string;
    name: string;
    available_name: string;
    display_name: string;
    email: string;
    account_id: number;
    role: "agent" | "administrator";
    confirmed: boolean;
    availability_status: "available" | "busy" | "offline";
    auto_offline: boolean;
    custom_attributes: Record<string, any>;
  }

  interface ListCannedResponses {
    accountId: number;
  }

  interface AddCannedResponse {
    accountId: number;
    content: string;
    short_code: string;
  }

  interface DeleteCannedResponse {
    accountId: number;
    id: number;
  }

  interface CannedResponse {
    id: number;
    content: string;
    short_code: string;
    account_id: number;
  }

  interface ListContacts {
    accountId: number;
    sort?:
      | "name"
      | "email"
      | "phone_number"
      | "last_activity_at"
      | "-name"
      | "-email"
      | "-phone_number"
      | "-last_activity_at";
    page?: number;
  }

  interface ContactPayload {
    payload: {
      contact: {
        email: string;
        name: string;
        phone_number: string;
        thumbnail: string;
        additional_attributes: Record<string, any>;
        custom_attributes: Record<string, any>;
        contact_inboxes: Array<Record<string, any>>;
      };
    };
    id: number;
    availability_status: "online" | "offline";
  }
  interface SearchContacts {
    accountId: number;
    q: string;
    sort?:
      | "name"
      | "email"
      | "phone_number"
      | "last_activity_at"
      | "-name"
      | "-email"
      | "-phone_number"
      | "-last_activity_at";
    page?: number;
  }

  interface ContactListItem {
    id: number;
    payload: {
      contact: {
        email: string;
        name: string;
        phone_number: string;
        thumbnail: string;
        additional_attributes: Record<string, any>;
        custom_attributes: Record<string, any>;
        contact_inboxes: Array<{
          source_id: string;
          inbox: {
            id: number;
            name: string;
            website_url: string;
            channel_type: string;
            avatar_url: string;
            widget_color: string;
            website_token: string;
            enable_auto_assignment: boolean;
            web_widget_script: string;
            welcome_title: string;
            welcome_tagline: string;
            greeting_enabled: boolean;
            greeting_message: string;
          };
        }>;
      };
    };
  }

  interface SearchContactsResponse {
    payload: ContactListItem[];
  }

  interface CreateContact {
    accountId: number;
    inboxId: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    avatar?: string;
    avatarUrl?: string;
    identifier?: string;
    customAttributes?: Record<string, any>;
  }

  interface GetContact {
    accountId: number;
    id: number;
  }

  interface UpdateContact {
    accountId: number;
    id: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    avatar?: string;
    avatarUrl?: string;
    identifier?: string;
    customAttributes?: Record<string, any>;
  }

  interface DeleteContact {
    accountId: number;
    id: number;
  }

  interface Contact {
    id: number;
    email: string;
    name: string;
    phone_number: string;
    thumbnail: string;
    additional_attributes: Record<string, any>;
    custom_attributes: Record<string, any>;
    contact_inboxes: Array<Record<string, any>>;
  }

  interface GetContactConversations {
    accountId: number;
    id: number;
  }

  interface Conversation {
    id: number;
    messages: Array<{
      content: string;
      content_type: "text" | "input_select" | "cards" | "form";
      content_attributes: Record<string, any>;
      message_type: "incoming" | "outgoing" | "activity" | "template";
      created_at: number;
      private: boolean;
      attachment: Record<string, any>;
      sender: Record<string, any>;
      conversation_id: number;
    }>;
    account_id: number;
    inbox_id: number;
    status: "open" | "resolved" | "pending";
    timestamp: string;
    contact_last_seen_at: string;
    agent_last_seen_at: string;
    unread_count: number;
    additional_attributes: Record<string, any>;
    custom_attributes: {
      attribute_key: string;
      priority_conversation_number: number;
    };
    meta: {
      sender: {
        id: number;
        name: string;
        thumbnail: string;
        channel: string;
      };
      assignee: {
        id: number;
        uid: string;
        name: string;
        available_name: string;
        display_name: string;
        email: string;
        account_id: number;
        role: "agent" | "administrator";
        confirmed: boolean;
        custom_attributes: Record<string, any>;
        accounts: Array<{
          id: number;
          name: string;
          role: "administrator" | "agent";
        }>;
      };
    };
    display_id: number;
  }

  interface SearchContacts {
    accountId: number;
    q: string;
    sort?:
      | "name"
      | "email"
      | "phone_number"
      | "last_activity_at"
      | "-name"
      | "-email"
      | "-phone_number"
      | "-last_activity_at";
    page?: number;
  }

  interface ContactListItemPayload {
    id: number;
    payload: {
      contact: {
        email: string;
        name: string;
        phone_number: string;
        thumbnail: string;
        additional_attributes: Record<string, any>;
        custom_attributes: Record<string, any>;
        contact_inboxes: Array<{
          source_id: string;
          inbox: {
            id: number;
            name: string;
            website_url: string;
            channel_type: string;
            avatar_url: string;
            widget_color: string;
            website_token: string;
            enable_auto_assignment: boolean;
            web_widget_script: string;
            welcome_title: string;
            welcome_tagline: string;
            greeting_enabled: boolean;
            greeting_message: string;
          };
        }>;
      };
    };
  }

  interface FilterContacts {
    accountId: number;
    page?: number;
    payload: Array<{
      attribute_key: string;
      filter_operator:
        | "equal_to"
        | "not_equal_to"
        | "contains"
        | "does_not_contain";
      values: string[];
      query_operator?: "AND" | "OR";
    }>;
  }

  interface ContactFilterResponse {
    id: number;
    payload: {
      contact: {
        email: string;
        name: string;
        phone_number: string;
        thumbnail: string;
        additional_attributes: Record<string, any>;
        custom_attributes: Record<string, any>;
        contact_inboxes: Array<{
          source_id: string;
          inbox: {
            id: number;
            name: string;
            website_url: string;
            channel_type: string;
            avatar_url: string;
            widget_color: string;
            website_token: string;
            enable_auto_assignment: boolean;
            web_widget_script: string;
            welcome_title: string;
            welcome_tagline: string;
            greeting_enabled: boolean;
            greeting_message: string;
          };
        }>;
      };
    };
  }

  interface AssignConversation {
    accountId: number;
    conversationId: number;
    assigneeId?: number;
    teamId?: number;
  }

  interface Assignee {
    id: number;
    uid: string;
    name: string;
    available_name: string;
    display_name: string;
    email: string;
    account_id: number;
    role: "agent" | "administrator";
    confirmed: boolean;
    custom_attributes: Record<string, any>;
    accounts: Array<{
      id: number;
      name: string;
      role: "administrator" | "agent";
    }>;
  }

  interface ListConversationLabels {
    accountId: number;
    conversationId: number;
  }

  interface AddConversationLabels {
    accountId: number;
    conversationId: number;
    labels: string[];
  }

  interface LabelsPayload {
    payload: string[];
  }

  interface GetConversationCounts {
    accountId: number;
    status?: "open" | "resolved" | "pending" | "snoozed";
    q?: string;
    inboxId?: number;
    teamId?: number;
    labels?: string[];
  }

  interface ConversationCounts {
    meta: {
      mine_count: number;
      unassigned_count: number;
      assigned_count: number;
      all_count: number;
    };
  }

  interface ListConversations {
    accountId: number;
    assigneeType?: "me" | "unassigned" | "all" | "assigned";
    status?: "open" | "resolved" | "pending" | "snoozed";
    q?: string;
    inboxId?: number;
    teamId?: number;
    labels?: string[];
    page?: number;
  }

  interface ConversationMeta {
    mine_count: number;
    unassigned_count: number;
    assigned_count: number;
    all_count: number;
  }

  interface ConversationData {
    id: number;
    messages: Array<{
      content: string;
      content_type: "text" | "input_select" | "cards" | "form";
      content_attributes: Record<string, any>;
      message_type: "incoming" | "outgoing" | "activity" | "template";
      created_at: number;
      private: boolean;
      attachment: Record<string, any>;
      sender: Record<string, any>;
      conversation_id: number;
    }>;
    account_id: number;
    inbox_id: number;
    status: "open" | "resolved" | "pending";
    timestamp: string;
    contact_last_seen_at: string;
    agent_last_seen_at: string;
    unread_count: number;
    additional_attributes: Record<string, any>;
    custom_attributes: Record<string, any>;
    meta: {
      sender: {
        id: number;
        name: string;
        thumbnail: string;
        channel: string;
      };
      assignee: {
        id: number;
        uid: string;
        name: string;
        available_name: string;
        display_name: string;
        email: string;
        account_id: number;
        role: "agent" | "administrator";
        confirmed: boolean;
        custom_attributes: Record<string, any>;
        accounts: Array<{
          id: number;
          name: string;
          role: "administrator" | "agent";
        }>;
      };
    };
  }

  interface ConversationListResponse {
    data: {
      meta: ConversationMeta;
      payload: ConversationData[];
    };
  }

  interface CreateConversation {
    accountId: number;
    sourceId: string;
    inboxId: string;
    contactId?: string;
    additionalAttributes?: Record<string, any>;
    customAttributes?: Record<string, any>;
    status?: "open" | "resolved" | "pending";
    assigneeId?: string;
    teamId?: string;
    message: {
      content: string;
      template_params?: {
        name?: string;
        category?: string;
        language?: string;
        processed_params?: Record<string, any>;
      };
    };
  }

  interface Conversation {
    id: number;
    account_id: number;
    inbox_id: number;
  }

  interface FilterConversations {
    accountId: number;
    page?: number;
    payload: Array<{
      attribute_key: string;
      filter_operator:
        | "equal_to"
        | "not_equal_to"
        | "contains"
        | "does_not_contain";
      values: string[];
      query_operator?: "AND" | "OR";
    }>;
  }

  interface ConversationMeta {
    mine_count: number;
    unassigned_count: number;
    assigned_count: number;
    all_count: number;
  }

  interface ConversationData {
    id: number;
    messages: Array<{
      content: string;
      content_type: "text" | "input_select" | "cards" | "form";
      content_attributes: Record<string, any>;
      message_type: "incoming" | "outgoing" | "activity" | "template";
      created_at: number;
      private: boolean;
      attachment: Record<string, any>;
      sender: Record<string, any>;
      conversation_id: number;
    }>;
    account_id: number;
    inbox_id: number;
    status: "open" | "resolved" | "pending";
    timestamp: string;
    contact_last_seen_at: string;
    agent_last_seen_at: string;
    unread_count: number;
    additional_attributes: Record<string, any>;
    custom_attributes: Record<string, any>;
    meta: {
      sender: {
        id: number;
        name: string;
        thumbnail: string;
        channel: string;
      };
      assignee: {
        id: number;
        uid: string;
        name: string;
        available_name: string;
        display_name: string;
        email: string;
        account_id: number;
        role: "agent" | "administrator";
        confirmed: boolean;
        custom_attributes: Record<string, any>;
        accounts: Array<{
          id: number;
          name: string;
          role: "administrator" | "agent";
        }>;
      };
    };
  }

  interface ConversationFilterResponse {
    data: {
      meta: ConversationMeta;
      payload: ConversationData[];
    };
  }

  interface GetConversationDetails {
    accountId: number;
    conversationId: number;
  }

  interface ToggleConversationStatus {
    accountId: number;
    conversationId: number;
    status: "open" | "resolved" | "pending";
  }

  interface ToggleConversationPriority {
    accountId: number;
    conversationId: number;
    priority: "urgent" | "high" | "medium" | "low" | "none";
  }

  interface ConversationDetails {
    id: number;
    messages: Array<{
      content: string;
      content_type: "text" | "input_select" | "cards" | "form";
      content_attributes: Record<string, any>;
      message_type: "incoming" | "outgoing" | "activity" | "template";
      created_at: number;
      private: boolean;
      attachment: Record<string, any>;
      sender: Record<string, any>;
      conversation_id: number;
    }>;
    account_id: number;
    inbox_id: number;
    status: "open" | "resolved" | "pending";
    timestamp: string;
    contact_last_seen_at: string;
    agent_last_seen_at: string;
    unread_count: number;
    additional_attributes: Record<string, any>;
    custom_attributes: Record<string, any>;
    meta: {
      sender: {
        id: number;
        name: string;
        thumbnail: string;
        channel: string;
      };
      assignee: {
        id: number;
        uid: string;
        name: string;
        available_name: string;
        display_name: string;
        email: string;
        account_id: number;
        role: "agent" | "administrator";
        confirmed: boolean;
        custom_attributes: Record<string, any>;
        accounts: Array<{
          id: number;
          name: string;
          role: "administrator" | "agent";
        }>;
      };
    };
  }

  interface ToggleStatusResponse {
    meta: Record<string, any>;
    payload: {
      success: boolean;
      current_status: "open" | "resolved";
      conversation_id: number;
    };
  }

  interface ListCustomAttributes {
    accountId: number;
    attributeModel: "0" | "1";
  }

  interface AddCustomAttribute {
    accountId: number;
    attribute_display_name: string;
    attribute_display_type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    attribute_description: string;
    attribute_key: string;
    attribute_values: string[];
    attribute_model: 0 | 1;
  }

  interface GetCustomAttributeDetails {
    accountId: number;
    id: number;
  }

  interface UpdateCustomAttribute {
    accountId: number;
    id: number;
    attribute_display_name: string;
    attribute_display_type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    attribute_description: string;
    attribute_key: string;
    attribute_values: string[];
    attribute_model: 0 | 1;
  }

  interface DeleteCustomAttribute {
    accountId: number;
    id: number;
  }

  interface CustomAttribute {
    id: number;
    attribute_display_name: string;
    attribute_display_type: string;
    attribute_description: string;
    attribute_key: string;
    attribute_values: string;
    default_value: string;
    attribute_model: string;
    account_id: number;
  }

  interface ListCustomFilters {
    accountId: number;
    filterType: "conversation" | "contact" | "report";
  }

  interface AddCustomFilter {
    accountId: number;
    name: string;
    type: "conversation" | "contact" | "report";
    query: Record<string, any>;
  }

  interface GetCustomFilterDetails {
    accountId: number;
    customFilterId: number;
  }

  interface UpdateCustomFilter {
    accountId: number;
    customFilterId: number;
    name: string;
    type: "conversation" | "contact" | "report";
    query: Record<string, any>;
  }

  interface DeleteCustomFilter {
    accountId: number;
    customFilterId: number;
  }

  interface CustomFilter {
    id: number;
    name: string;
    type: "conversation" | "contact" | "report";
    query: Record<string, any>;
    created_at: string;
    updated_at: string;
  }

  interface ListInboxes {
    accountId: number;
  }

  interface GetInboxDetails {
    accountId: number;
    id: number;
  }

  interface CreateInbox {
    accountId: number;
    name: string;
    avatar?: string;
    channel: {
      type: "web_widget";
      website_url: string;
      welcome_title: string;
      welcome_tagline: string;
      agent_away_message?: string;
      widget_color?: string;
    };
  }

  interface UpdateInbox {
    accountId: number;
    id: number;
    name: string;
    enable_auto_assignment: boolean;
    avatar?: string;
    channel: {
      website_url: string;
      welcome_title: string;
      welcome_tagline: string;
      agent_away_message?: string;
      widget_color?: string;
    };
  }

  interface Inbox {
    id: number;
    name: string;
    website_url: string;
    channel_type: string;
    avatar_url: string;
    widget_color: string;
    website_token: string;
    enable_auto_assignment: boolean;
    web_widget_script: string;
    welcome_title: string;
    welcome_tagline: string;
    greeting_enabled: boolean;
    greeting_message: string;
  }

  interface ListInboxAgents {
    accountId: number;
    inboxId: number;
  }

  interface AddInboxAgent {
    accountId: number;
    inboxId: string;
    user_ids: number[];
  }

  interface UpdateInboxAgents {
    accountId: number;
    inboxId: string;
    user_ids: number[];
  }

  interface RemoveInboxAgent {
    accountId: number;
    inboxId: string;
    user_ids: number[];
  }

  interface InboxAgent {
    id: number;
    uid: string;
    name: string;
    available_name: string;
    display_name: string;
    email: string;
    account_id: number;
    role: "agent" | "administrator";
    confirmed: boolean;
    availability_status: "available" | "busy" | "offline";
    auto_offline: boolean;
    custom_attributes: Record<string, any>;
  }

  interface ListIntegrations {
    accountId: number;
  }

  interface CreateIntegrationHook {
    accountId: number;
    app_id: string;
    inbox_id?: string;
    settings: Record<string, any>;
  }

  interface UpdateIntegrationHook {
    accountId: number;
    hook_id: number;
    settings: Record<string, any>;
  }

  interface DeleteIntegrationHook {
    accountId: number;
    hook_id: number;
  }

  interface Integration {
    id: string;
    name: string;
    description: string;
    hook_type: string;
    enabled: boolean;
    allow_multiple_hooks: boolean;
    hooks: Record<string, any>[];
  }

  interface IntegrationHook {
    id: string;
    app_id: string;
    inbox_id?: string;
    account_id: string;
    status: boolean;
    hook_type: boolean;
    settings: Record<string, any>;
  }

  interface GetMessages {
    accountId: number;
    conversationId: number;
  }

  interface CreateMessage {
    accountId: number;
    conversationId: number;
    content: string;
    message_type: "outgoing" | "incoming";
    private?: boolean;
    content_type?:
      | "input_email"
      | "cards"
      | "input_select"
      | "form"
      | "article";
    content_attributes?: Record<string, any>;
    template_params?: {
      name?: string;
      category?: string;
      language?: string;
      processed_params?: Record<string, any>;
    };
  }

  interface DeleteMessage {
    accountId: number;
    conversationId: number;
    messageId: number;
  }

  interface Message {
    id: number;
    content: string;
    content_type: "text" | "input_select" | "cards" | "form";
    content_attributes: Record<string, any>;
    message_type: "incoming" | "outgoing" | "activity" | "template";
    created_at: number;
    private: boolean;
    attachment: Record<string, any>;
    sender: Record<string, any>;
    conversation_id: number;
  }

  interface GetAccountReports {
    accountId: number;
    metric:
      | "conversations_count"
      | "incoming_messages_count"
      | "outgoing_messages_count"
      | "avg_first_response_time"
      | "avg_resolution_time"
      | "resolutions_count";
    type: "account" | "agent" | "inbox" | "label" | "team";
    id?: string;
    since?: string;
    until?: string;
  }

  interface GetAccountReportsSummary {
    accountId: number;
    type: "account" | "agent" | "inbox" | "label" | "team";
    id?: string;
    since?: string;
    until?: string;
  }

  interface GetAccountConversationMetrics {
    accountId: number;
    type: "account";
  }

  interface GetAgentConversationMetrics {
    accountId: number;
    type: "agent";
    user_id: string;
  }

  interface Report {
    value: string;
    timestamp: number;
  }

  interface ReportSummary {
    avg_first_response_time: string;
    avg_resolution_time: string;
    conversations_count: number;
    incoming_messages_count: number;
    outgoing_messages_count: number;
    resolutions_count: number;
    previous: {
      avg_first_response_time: string;
      avg_resolution_time: string;
      conversations_count: number;
      incoming_messages_count: number;
      outgoing_messages_count: number;
      resolutions_count: number;
    };
  }

  interface ConversationMetrics {
    open: number;
    unattended: number;
    unassigned: number;
  }

  interface AgentConversationMetrics {
    id: number;
    name: string;
    email: string;
    thumbnail: string;
    availability: string;
    metric: Record<string, any>;
  }

  interface ListTeams {
    accountId: number;
  }

  interface CreateTeam {
    accountId: number;
    name: string;
    description: string;
    allow_auto_assign: boolean;
  }

  interface GetTeamDetails {
    accountId: number;
    teamId: number;
  }

  interface UpdateTeam {
    accountId: number;
    teamId: number;
    name: string;
    description: string;
    allow_auto_assign: boolean;
  }

  interface DeleteTeam {
    accountId: number;
    teamId: number;
  }

  interface ListTeamAgents {
    accountId: number;
    teamId: number;
  }

  interface AddTeamAgent {
    accountId: number;
    teamId: number;
    user_ids: number[];
  }

  interface UpdateTeamAgents {
    accountId: number;
    teamId: number;
    user_ids: number[];
  }

  interface RemoveTeamAgent {
    accountId: number;
    teamId: number;
    user_ids: number[];
  }

  interface Team {
    id: number;
    name: string;
    description: string;
    allow_auto_assign: boolean;
    account_id: number;
    is_member: boolean;
  }

  interface TeamAgent {
    id: number;
    uid: string;
    name: string;
    available_name: string;
    display_name: string;
    email: string;
    account_id: number;
    role: "agent" | "administrator";
    confirmed: boolean;
    availability_status: "available" | "busy" | "offline";
    auto_offline: boolean;
    custom_attributes: Record<string, any>;
  }

  interface ListWebhooks {
    accountId: number;
  }

  interface AddWebhook {
    accountId: number;
    url: string;
    subscriptions: (
      | "conversation_created"
      | "conversation_status_changed"
      | "conversation_updated"
      | "contact_created"
      | "contact_updated"
      | "message_created"
      | "message_updated"
      | "webwidget_triggered"
    )[];
  }

  interface UpdateWebhook {
    accountId: number;
    webhook_id: number;
    url: string;
    subscriptions: (
      | "conversation_created"
      | "conversation_status_changed"
      | "conversation_updated"
      | "contact_created"
      | "contact_updated"
      | "message_created"
      | "message_updated"
      | "webwidget_triggered"
    )[];
  }

  interface DeleteWebhook {
    accountId: number;
    webhook_id: number;
  }

  interface Webhook {
    id: number;
    url: string;
    subscriptions: string[];
    account_id: number;
  }

  interface ListAutomationRules {
    accountId: number;
    page?: number;
  }

  interface AddAutomationRule {
    accountId: number;
    name: string;
    description: string;
    event_name:
      | "conversation_created"
      | "conversation_updated"
      | "message_created";
    active: boolean;
    actions: Record<string, any>[];
    conditions: Record<string, any>[];
  }

  interface GetAutomationRuleDetails {
    accountId: number;
    id: number;
  }

  interface UpdateAutomationRule {
    accountId: number;
    id: number;
    name: string;
    description: string;
    event_name:
      | "conversation_created"
      | "conversation_updated"
      | "message_created";
    active: boolean;
    actions: Record<string, any>[];
    conditions: Record<string, any>[];
  }

  interface DeleteAutomationRule {
    accountId: number;
    id: number;
  }

  interface AutomationRule {
    event_name:
      | "conversation_created"
      | "conversation_updated"
      | "message_created";
    name: string;
    description: string;
    active: boolean;
    actions: Record<string, any>[];
    conditions: Record<string, any>[];
    account_id: number;
  }
  interface AddPortal {
    accountId: number;
    archived: boolean;
    color: string;
    config: {
      allowed_locales: string[];
      default_locale: string;
    };
    custom_domain: string;
    header_text: string;
    homepage_link: string;
    name: string;
    slug: string;
    page_title: string;
  }

  interface ListPortals {
    accountId: number;
  }

  interface UpdatePortal {
    accountId: number;
    archived: boolean;
    color: string;
    config: {
      allowed_locales: string[];
      default_locale: string;
    };
    custom_domain: string;
    header_text: string;
    homepage_link: string;
    name: string;
    slug: string;
    page_title: string;
  }

  interface Portal {
    id: number;
    archived: boolean;
    color: string;
    config: Record<string, any>;
    custom_domain: string;
    header_text: string;
    homepage_link: string;
    name: string;
    slug: string;
    page_title: string;
    account_id: number;
    categories: Category[];
    articles: Article[];
  }

  interface Category {
    id: number;
    description: string;
    locale: string;
    name: string;
    slug: string;
    position: number;
    portal_id: number;
    account_id: number;
    associated_category_id: number;
    parent_category_id: number;
  }

  interface Article {
    id: number;
    content: string;
    meta: Record<string, any>;
    position: number;
    status: "draft" | "published" | "archived";
    title: string;
    slug: string;
    views: number;
    portal_id: number;
    account_id: number;
    author_id: number;
    category_id: number;
    folder_id: number;
    associated_article_id: number;
  }

  interface AddCategory {
    accountId: number;
    portalId: number;
    description: string;
    locale: string;
    name: string;
    slug: string;
    position: number;
    associated_category_id?: number;
    parent_category_id?: number;
  }

  interface AddArticle {
    accountId: number;
    portalId: number;
    content: string;
    meta: Record<string, any>;
    position: number;
    status: "draft" | "published" | "archived";
    title: string;
    slug: string;
    views: number;
    author_id: number;
    category_id: number;
    folder_id: number;
    associated_article_id?: number;
  }

  class ChatwootClient {
    private axiosInstance: AxiosInstance;
    private config: Config;
    private version: string;

    constructor(config: Config);

    private requestWithRetry<T>(
      requestFn: () => Promise<AxiosResponse<T>>,
      retries?: number
    ): Promise<ApiResponse<T>>;

    public createAccount({
      name,
    }: CreateAccount): Promise<ApiResponse<Account>>;

    public getAccount({ accountId }: GetAccount): Promise<ApiResponse<Account>>;

    public updateAccount({
      accountId,
      name,
    }: UpdateAccount): Promise<ApiResponse<Account>>;

    public deleteAccount({
      accountId,
    }: DeleteAccount): Promise<ApiResponse<void>>;

    public listAccountUsers({
      accountId,
    }: ListAccountUsers): Promise<ApiResponse<AccountUser[]>>;

    public createAccountUser({
      accountId,
      userId,
      role,
    }: CreateAccountUser): Promise<ApiResponse<AccountUser>>;

    public deleteAccountUser({
      accountId,
      userId,
    }: DeleteAccountUser): Promise<ApiResponse<void>>;

    public listAgentBots({}: ListAgentBots): Promise<ApiResponse<AgentBot[]>>;

    public createAgentBot({
      name,
      description,
      outgoing_url,
    }: CreateAgentBot): Promise<ApiResponse<AgentBot>>;

    public getAgentBotDetails({
      id,
    }: GetAgentBotDetails): Promise<ApiResponse<AgentBot>>;

    public updateAgentBot({
      id,
      name,
      description,
      outgoing_url,
    }: UpdateAgentBot): Promise<ApiResponse<AgentBot>>;

    public deleteAgentBot({ id }: DeleteAgentBot): Promise<ApiResponse<void>>;

    public createUser({
      name,
      email,
      password,
      customAttributes,
    }: CreateUser): Promise<ApiResponse<User>>;

    public getUserDetails({
      id,
    }: GetUserDetails): Promise<ApiResponse<UserDetails>>;

    public updateUser({
      id,
      name,
      email,
      password,
      customAttributes,
    }: UpdateUser): Promise<ApiResponse<User>>;

    public deleteUser({ id }: DeleteUser): Promise<ApiResponse<void>>;

    public getUserSSOLink({
      id,
    }: GetUserSSOLink): Promise<ApiResponse<UserSSOLink>>;

    public listAccountAgentBots({
      accountId,
    }: ListAccountAgentBots): Promise<ApiResponse<AccountAgentBot[]>>;

    public createAccountAgentBot({
      accountId,
      name,
      description,
      outgoing_url,
    }: CreateAccountAgentBot): Promise<ApiResponse<AccountAgentBot>>;

    public getAccountAgentBotDetails({
      accountId,
      id,
    }: GetAccountAgentBotDetails): Promise<ApiResponse<AccountAgentBot>>;

    public updateAccountAgentBot({
      accountId,
      id,
      name,
      description,
      outgoing_url,
    }: UpdateAccountAgentBot): Promise<ApiResponse<AccountAgentBot>>;

    public deleteAccountAgentBot({
      accountId,
      id,
    }: DeleteAccountAgentBot): Promise<ApiResponse<void>>;

    public listAgents({ accountId }: ListAgents): Promise<ApiResponse<Agent[]>>;

    public addAgent({
      accountId,
      name,
      email,
      role,
      availabilityStatus,
      autoOffline,
    }: AddAgent): Promise<ApiResponse<Agent>>;

    public updateAgent({
      accountId,
      id,
      role,
      availability,
      autoOffline,
    }: UpdateAgent): Promise<ApiResponse<Agent>>;

    public removeAgent({
      accountId,
      id,
    }: RemoveAgent): Promise<ApiResponse<void>>;

    public listCannedResponses({
      accountId,
    }: ListCannedResponses): Promise<ApiResponse<CannedResponse[]>>;

    public addCannedResponse({
      accountId,
      content,
      short_code,
    }: AddCannedResponse): Promise<ApiResponse<CannedResponse>>;

    public deleteCannedResponse({
      accountId,
      id,
    }: DeleteCannedResponse): Promise<ApiResponse<void>>;

    public listContacts({
      accountId,
    }: ListContacts): Promise<ApiResponse<ContactListItemPayload[]>>;

    public createContact({
      accountId,
      inboxId,
      name,
      email,
      phoneNumber,
      avatar,
      avatarUrl,
      identifier,
      customAttributes,
    }: CreateContact): Promise<ApiResponse<ContactPayload>>;

    public searchContacts({
      accountId,
      q,
      sort,
      page,
    }: SearchContacts): Promise<ApiResponse<SearchContactsResponse>>;

    public getContact({
      accountId,
      id,
    }: GetContact): Promise<ApiResponse<ContactPayload>>;

    public updateContact({
      accountId,
      id,
      name,
      email,
      phoneNumber,
      avatar,
      avatarUrl,
      identifier,
      customAttributes,
    }: UpdateContact): Promise<ApiResponse<ContactPayload>>;

    public deleteContact({
      accountId,
      id,
    }: DeleteContact): Promise<ApiResponse<void>>;

    public getContactConversations({
      accountId,
      id,
    }: GetContactConversations): Promise<ApiResponse<Conversation[]>>;

    public searchContacts({
      accountId,
      q,
      sort,
      page,
    }: SearchContacts): Promise<ApiResponse<SearchContactsResponse>>;

    public filterContacts({
      accountId,
      page,
      payload,
    }: FilterContacts): Promise<ApiResponse<ContactFilterResponse[]>>;

    public assignConversation({
      accountId,
      conversationId,
      assigneeId,
      teamId,
    }: AssignConversation): Promise<ApiResponse<Assignee>>;

    public listConversationLabels({
      accountId,
      conversationId,
    }: ListConversationLabels): Promise<ApiResponse<LabelsPayload>>;

    public addConversationLabels({
      accountId,
      conversationId,
      labels,
    }: AddConversationLabels): Promise<ApiResponse<LabelsPayload>>;

    public getConversationCounts({
      accountId,
      status,
      q,
      inboxId,
      teamId,
      labels,
    }: GetConversationCounts): Promise<ApiResponse<ConversationCounts>>;

    public listConversations({
      accountId,
      assigneeType,
      status,
      q,
      inboxId,
      teamId,
      labels,
      page,
    }: ListConversations): Promise<ApiResponse<ConversationListResponse>>;

    public createConversation({
      accountId,
      sourceId,
      inboxId,
      contactId,
      additionalAttributes,
      customAttributes,
      status,
      assigneeId,
      teamId,
      message,
    }: CreateConversation): Promise<ApiResponse<Conversation>>;

    public filterConversations({
      accountId,
      page,
      payload,
    }: FilterConversations): Promise<ApiResponse<ConversationFilterResponse>>;

    public getConversationDetails({
      accountId,
      conversationId,
    }: GetConversationDetails): Promise<ApiResponse<ConversationDetails>>;

    public toggleConversationStatus({
      accountId,
      conversationId,
      status,
    }: ToggleConversationStatus): Promise<ApiResponse<ToggleStatusResponse>>;

    public toggleConversationPriority({
      accountId,
      conversationId,
      priority,
    }: ToggleConversationPriority): Promise<ApiResponse<void>>;

    public listCustomAttributes({
      accountId,
      attributeModel,
    }: ListCustomAttributes): Promise<ApiResponse<CustomAttribute[]>>;

    public addCustomAttribute({
      accountId,
      attribute_display_name,
      attribute_display_type,
      attribute_description,
      attribute_key,
      attribute_values,
      attribute_model,
    }: AddCustomAttribute): Promise<ApiResponse<CustomAttribute>>;

    public getCustomAttributeDetails({
      accountId,
      id,
    }: GetCustomAttributeDetails): Promise<ApiResponse<CustomAttribute>>;

    public updateCustomAttribute({
      accountId,
      id,
      attribute_display_name,
      attribute_display_type,
      attribute_description,
      attribute_key,
      attribute_values,
      attribute_model,
    }: UpdateCustomAttribute): Promise<ApiResponse<CustomAttribute>>;

    public deleteCustomAttribute({
      accountId,
      id,
    }: DeleteCustomAttribute): Promise<ApiResponse<void>>;

    public listCustomFilters({
      accountId,
      filterType,
    }: ListCustomFilters): Promise<ApiResponse<CustomFilter[]>>;

    public addCustomFilter({
      accountId,
      name,
      type,
      query,
    }: AddCustomFilter): Promise<ApiResponse<CustomFilter>>;

    public getCustomFilterDetails({
      accountId,
      customFilterId,
    }: GetCustomFilterDetails): Promise<ApiResponse<CustomFilter>>;

    public updateCustomFilter({
      accountId,
      customFilterId,
      name,
      type,
      query,
    }: UpdateCustomFilter): Promise<ApiResponse<CustomFilter>>;

    public deleteCustomFilter({
      accountId,
      customFilterId,
    }: DeleteCustomFilter): Promise<ApiResponse<void>>;

    public listInboxes({
      accountId,
    }: ListInboxes): Promise<ApiResponse<Inbox[]>>;

    public getInboxDetails({
      accountId,
      id,
    }: GetInboxDetails): Promise<ApiResponse<Inbox>>;

    public createInbox({
      accountId,
      name,
      avatar,
      channel,
    }: CreateInbox): Promise<ApiResponse<Inbox>>;

    public updateInbox({
      accountId,
      id,
      name,
      enable_auto_assignment,
      avatar,
      channel,
    }: UpdateInbox): Promise<ApiResponse<Inbox>>;

    public listInboxAgents({
      accountId,
      inboxId,
    }: ListInboxAgents): Promise<ApiResponse<InboxAgent[]>>;

    public addInboxAgent({
      accountId,
      inboxId,
      user_ids,
    }: AddInboxAgent): Promise<ApiResponse<InboxAgent[]>>;

    public updateInboxAgents({
      accountId,
      inboxId,
      user_ids,
    }: UpdateInboxAgents): Promise<ApiResponse<InboxAgent[]>>;

    public removeInboxAgent({
      accountId,
      inboxId,
      user_ids,
    }: RemoveInboxAgent): Promise<ApiResponse<void>>;

    public listIntegrations({
      accountId,
    }: ListIntegrations): Promise<ApiResponse<Integration[]>>;

    public createIntegrationHook({
      accountId,
      app_id,
      inbox_id,
      settings,
    }: CreateIntegrationHook): Promise<ApiResponse<IntegrationHook>>;

    public updateIntegrationHook({
      accountId,
      hook_id,
      settings,
    }: UpdateIntegrationHook): Promise<ApiResponse<IntegrationHook>>;

    public deleteIntegrationHook({
      accountId,
      hook_id,
    }: DeleteIntegrationHook): Promise<ApiResponse<void>>;

    public getMessages({
      accountId,
      conversationId,
    }: GetMessages): Promise<ApiResponse<Message[]>>;

    public createMessage({
      accountId,
      conversationId,
      content,
      message_type,
      private,
      content_type,
      content_attributes,
      template_params,
    }: CreateMessage): Promise<ApiResponse<Message>>;

    public deleteMessage({
      accountId,
      conversationId,
      messageId,
    }: DeleteMessage): Promise<ApiResponse<void>>;

    public getAccountReports({
      accountId,
      metric,
      type,
      id,
      since,
      until,
    }: GetAccountReports): Promise<ApiResponse<Report[]>>;

    public getAccountReportsSummary({
      accountId,
      type,
      id,
      since,
      until,
    }: GetAccountReportsSummary): Promise<ApiResponse<ReportSummary>>;

    public getAccountConversationMetrics({
      accountId,
      type,
    }: GetAccountConversationMetrics): Promise<
      ApiResponse<ConversationMetrics>
    >;

    public getAgentConversationMetrics({
      accountId,
      type,
      user_id,
    }: GetAgentConversationMetrics): Promise<
      ApiResponse<AgentConversationMetrics>
    >;

    public listTeams({ accountId }: ListTeams): Promise<ApiResponse<Team[]>>;

    public createTeam({
      accountId,
      name,
      description,
      allow_auto_assign,
    }: CreateTeam): Promise<ApiResponse<Team>>;

    public getTeamDetails({
      accountId,
      teamId,
    }: GetTeamDetails): Promise<ApiResponse<Team>>;

    public updateTeam({
      accountId,
      teamId,
      name,
      description,
      allow_auto_assign,
    }: UpdateTeam): Promise<ApiResponse<Team>>;

    public deleteTeam({
      accountId,
      teamId,
    }: DeleteTeam): Promise<ApiResponse<void>>;

    public listTeamAgents({
      accountId,
      teamId,
    }: ListTeamAgents): Promise<ApiResponse<TeamAgent[]>>;

    public addTeamAgent({
      accountId,
      teamId,
      user_ids,
    }: AddTeamAgent): Promise<ApiResponse<TeamAgent[]>>;

    public updateTeamAgents({
      accountId,
      teamId,
      user_ids,
    }: UpdateTeamAgents): Promise<ApiResponse<TeamAgent[]>>;

    public removeTeamAgent({
      accountId,
      teamId,
      user_ids,
    }: RemoveTeamAgent): Promise<ApiResponse<void>>;

    public listWebhooks({
      accountId,
    }: ListWebhooks): Promise<ApiResponse<Webhook[]>>;

    public addWebhook({
      accountId,
      url,
      subscriptions,
    }: AddWebhook): Promise<ApiResponse<Webhook>>;

    public updateWebhook({
      accountId,
      webhook_id,
      url,
      subscriptions,
    }: UpdateWebhook): Promise<ApiResponse<Webhook>>;

    public deleteWebhook({
      accountId,
      webhook_id,
    }: DeleteWebhook): Promise<ApiResponse<void>>;

    public listAutomationRules({
      accountId,
      page,
    }: ListAutomationRules): Promise<ApiResponse<AutomationRule[]>>;

    public addAutomationRule({
      accountId,
      name,
      description,
      event_name,
      active,
      actions,
      conditions,
    }: AddAutomationRule): Promise<ApiResponse<AutomationRule>>;

    public getAutomationRuleDetails({
      accountId,
      id,
    }: GetAutomationRuleDetails): Promise<ApiResponse<AutomationRule>>;

    public updateAutomationRule({
      accountId,
      id,
      name,
      description,
      event_name,
      active,
      actions,
      conditions,
    }: UpdateAutomationRule): Promise<ApiResponse<AutomationRule>>;

    public deleteAutomationRule({
      accountId,
      id,
    }: DeleteAutomationRule): Promise<ApiResponse<void>>;

    public addPortal({
      accountId,
      archived,
      color,
      config,
      custom_domain,
      header_text,
      homepage_link,
      name,
      slug,
      page_title,
    }: AddPortal): Promise<ApiResponse<Portal>>;

    public listPortals({
      accountId,
    }: ListPortals): Promise<ApiResponse<Portal[]>>;

    public updatePortal({
      accountId,
      archived,
      color,
      config,
      custom_domain,
      header_text,
      homepage_link,
      name,
      slug,
      page_title,
    }: UpdatePortal): Promise<ApiResponse<Portal>>;

    public addCategory({
      accountId,
      portalId,
      description,
      locale,
      name,
      slug,
      position,
      associated_category_id,
      parent_category_id,
    }: AddCategory): Promise<ApiResponse<Category>>;

    public addArticle({
      accountId,
      portalId,
      content,
      meta,
      position,
      status,
      title,
      slug,
      views,
      author_id,
      category_id,
      folder_id,
      associated_article_id,
    }: AddArticle): Promise<ApiResponse<Article>>;
  }

  export default ChatwootClient;
}
