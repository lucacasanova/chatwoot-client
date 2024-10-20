export interface Config {
  host: string;
  userToken?: string;
  platformToken?: string;
  version?: string;
}

export interface Account {
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

export interface CreateAccount {
  name?: string;
}

export interface GetAccount {
  accountId: number;
}

export interface UpdateAccount {
  accountId: number;
  name?: string;
}

export interface DeleteAccount {
  accountId: number;
}

export interface AccountUser {
  account_id: number;
  user_id: number;
  role: "administrator" | "agent";
}

export interface ListAccountUsers {
  accountId: number;
}

export interface CreateAccountUser {
  accountId: number;
  userId: number;
  role: "administrator" | "agent";
}

export interface DeleteAccountUser {
  accountId: number;
  userId: number;
}

export interface ListAgentBots {}

export interface CreateAgentBot {
  name?: string;
  description?: string;
  outgoingUrl?: string;
}

export interface GetAgentBotDetails {
  id: number;
}

export interface UpdateAgentBot {
  id: number;
  name?: string;
  description?: string;
  outgoingUrl?: string;
}

export interface DeleteAgentBot {
  id: number;
}

export interface AgentBot {
  id: number;
  name: string;
  description: string;
  account_id: number;
  outgoing_url: string;
}

export interface CreateUser {
  name?: string;
  email?: string;
  password?: string;
  customAttributes?: Record<string, any>;
}

export interface GetUserDetails {
  id: number;
}

export interface UserDetails {
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

export interface UpdateUser {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  customAttributes?: Record<string, any>;
}

export interface DeleteUser {
  id: number;
}

export interface GetUserSSOLink {
  id: number;
}

export interface UserSSOLink {
  url: string;
}

export interface User {
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

export interface ListAccountAgentBots {
  accountId: number;
}

export interface CreateAccountAgentBot {
  accountId: number;
  name?: string;
  description?: string;
  outgoingUrl?: string;
}

export interface GetAccountAgentBotDetails {
  accountId: number;
  id: number;
}

export interface UpdateAccountAgentBot {
  accountId: number;
  id: number;
  name?: string;
  description?: string;
  outgoingUrl?: string;
}

export interface DeleteAccountAgentBot {
  accountId: number;
  id: number;
}

export interface AccountAgentBot {
  id: number;
  name: string;
  description: string;
  account_id: number;
  outgoing_url: string;
}

export interface ListAgents {
  accountId: number;
}

export interface AddAgent {
  accountId: number;
  name: string;
  email: string;
  role: "agent" | "administrator";
  availabilityStatus?: "available" | "busy" | "offline";
  autoOffline?: boolean;
}

export interface UpdateAgent {
  accountId: number;
  id: number;
  role: "agent" | "administrator";
  availability?: "available" | "busy" | "offline";
  autoOffline?: boolean;
}

export interface RemoveAgent {
  accountId: number;
  id: number;
}

export interface Agent {
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

export interface ListCannedResponses {
  accountId: number;
}

export interface AddCannedResponse {
  accountId: number;
  content?: string;
  shortCode?: string;
}

export interface DeleteCannedResponse {
  accountId: number;
  id: number;
}

export interface CannedResponse {
  id: number;
  content: string;
  short_code: string;
  account_id: number;
}

export interface ListContacts {
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

export interface ContactPayload {
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
export interface SearchContacts {
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

export interface ContactListItem {
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

export interface SearchContactsResponse {
  payload: ContactListItem[];
}

export interface CreateContact {
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

export interface GetContact {
  accountId: number;
  id: number;
}

export interface UpdateContact {
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

export interface DeleteContact {
  accountId: number;
  id: number;
}

export interface Contact {
  id: number;
  email: string;
  name: string;
  phone_number: string;
  thumbnail: string;
  additional_attributes: Record<string, any>;
  custom_attributes: Record<string, any>;
  contact_inboxes: Array<Record<string, any>>;
}

export interface GetContactConversations {
  accountId: number;
  id: number;
}

export interface Conversation {
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

export interface SearchContacts {
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

export interface ContactListItemPayload {
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

export interface FilterContacts {
  accountId: number;
  page?: number;
  payload?: Array<{
    attribute_key?: string;
    filter_operator?:
      | "equal_to"
      | "not_equal_to"
      | "contains"
      | "does_not_contain";
    values?: string[];
    query_operator?: "AND" | "OR";
  }>;
}

export interface ContactFilterResponse {
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

export interface AssignConversation {
  accountId: number;
  conversationId: number;
  assigneeId?: number;
  teamId?: number;
}

export interface Assignee {
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

export interface ListConversationLabels {
  accountId: number;
  conversationId: number;
}

export interface AddConversationLabels {
  accountId: number;
  conversationId: number;
  labels?: string[];
}

export interface LabelsPayload {
  payload: string[];
}

export interface GetConversationCounts {
  accountId: number;
  status?: "open" | "resolved" | "pending" | "snoozed";
  q?: string;
  inboxId?: number;
  teamId?: number;
  labels?: string[];
}

export interface ConversationCounts {
  meta: {
    mine_count: number;
    unassigned_count: number;
    assigned_count: number;
    all_count: number;
  };
}

export interface ListConversations {
  accountId: number;
  assigneeType?: "me" | "unassigned" | "all" | "assigned";
  status?: "open" | "resolved" | "pending" | "snoozed";
  q?: string;
  inboxId?: number;
  teamId?: number;
  labels?: string[];
  page?: number;
}

export interface ConversationMeta {
  mine_count: number;
  unassigned_count: number;
  assigned_count: number;
  all_count: number;
}

export interface ConversationData {
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

export interface ConversationListResponse {
  data: {
    meta: ConversationMeta;
    payload: ConversationData[];
  };
}

export interface CreateConversation {
  accountId: number;
  sourceId: string;
  inboxId: string;
  contactId?: string;
  additionalAttributes?: Record<string, any>;
  customAttributes?: Record<string, any>;
  status?: "open" | "resolved" | "pending";
  assigneeId?: string;
  teamId?: string;
  message?: {
    content: string;
    template_params?: {
      name?: string;
      category?: string;
      language?: string;
      processed_params?: Record<string, any>;
    };
  };
}

export interface Conversation {
  id: number;
  account_id: number;
  inbox_id: number;
}

export interface FilterConversations {
  accountId: number;
  page?: number;
  payload?: Array<{
    attribute_key?: string;
    filter_operator?:
      | "equal_to"
      | "not_equal_to"
      | "contains"
      | "does_not_contain";
    values?: string[];
    query_operator?: "AND" | "OR";
  }>;
}

export interface ConversationMeta {
  mine_count: number;
  unassigned_count: number;
  assigned_count: number;
  all_count: number;
}

export interface ConversationData {
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

export interface ConversationFilterResponse {
  data: {
    meta: ConversationMeta;
    payload: ConversationData[];
  };
}

export interface GetConversationDetails {
  accountId: number;
  conversationId: number;
}

export interface ToggleConversationStatus {
  accountId: number;
  conversationId: number;
  status: "open" | "resolved" | "pending";
}

export interface ToggleConversationPriority {
  accountId: number;
  conversationId: number;
  priority: "urgent" | "high" | "medium" | "low" | "none";
}

export interface ConversationDetails {
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

export interface ToggleStatusResponse {
  meta: Record<string, any>;
  payload: {
    success: boolean;
    current_status: "open" | "resolved";
    conversation_id: number;
  };
}

export interface ListCustomAttributes {
  accountId: number;
  attributeModel: "0" | "1";
}

export interface AddCustomAttribute {
  accountId: number;
  attributeDisplayName?: string;
  attributeDisplayType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  attributeDescription?: string;
  attributeKey?: string;
  attributeValues?: string[];
  attributeModel?: 0 | 1;
}

export interface GetCustomAttributeDetails {
  accountId: number;
  id: number;
}

export interface UpdateCustomAttribute {
  accountId: number;
  id: number;
  attributeDisplayName?: string;
  attributeDisplayType?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  attributeDescription?: string;
  attributeKey?: string;
  attributeValues?: string[];
  attributeModel?: 0 | 1;
}

export interface DeleteCustomAttribute {
  accountId: number;
  id: number;
}

export interface CustomAttribute {
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

export interface ListCustomFilters {
  accountId: number;
  filterType?: "conversation" | "contact" | "report";
}

export interface AddCustomFilter {
  accountId: number;
  filterType?: string;
  name?: string;
  type?: "conversation" | "contact" | "report";
  query?: Record<string, any>;
}

export interface GetCustomFilterDetails {
  accountId: number;
  customFilterId: number;
}

export interface UpdateCustomFilter {
  accountId: number;
  customFilterId: number;
  name?: string;
  type?: "conversation" | "contact" | "report";
  query?: Record<string, any>;
}

export interface DeleteCustomFilter {
  accountId: number;
  customFilterId: number;
}

export interface CustomFilter {
  id: number;
  name: string;
  type: "conversation" | "contact" | "report";
  query: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ListInboxes {
  accountId: number;
}

export interface GetInboxDetails {
  accountId: number;
  id: number;
}

export interface CreateInbox {
  accountId: number;
  name?: string;
  avatar?: string;
  channel?: {
    type?: "web_widget";
    website_url?: string;
    welcome_title?: string;
    welcome_tagline?: string;
    agent_away_message?: string;
    widget_color?: string;
  };
}

export interface UpdateInbox {
  accountId: number;
  id: number;
  name?: string;
  enableAutoAssignment: boolean;
  avatar?: string;
  channel?: {
    website_url?: string;
    welcome_title?: string;
    welcome_tagline?: string;
    agent_away_message?: string;
    widget_color?: string;
  };
}

export interface Inbox {
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

export interface ListInboxAgents {
  accountId: number;
  inboxId: number;
}

export interface AddInboxAgent {
  accountId: number;
  inboxId: string;
  userIds: number[];
}

export interface UpdateInboxAgents {
  accountId: number;
  inboxId: string;
  userIds: number[];
}

export interface RemoveInboxAgent {
  accountId: number;
  inboxId: string;
  userIds: number[];
}

export interface InboxAgent {
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

export interface ListIntegrations {
  accountId: number;
}

export interface CreateIntegrationHook {
  accountId: number;
  appId?: string;
  inboxId?: string;
  settings?: Record<string, any>;
}

export interface UpdateIntegrationHook {
  accountId: number;
  hookId: number;
  settings?: Record<string, any>;
}

export interface DeleteIntegrationHook {
  accountId: number;
  hookId: number;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  hook_type: string;
  enabled: boolean;
  allow_multiple_hooks: boolean;
  hooks: Record<string, any>[];
}

export interface IntegrationHook {
  id: string;
  appId: string;
  inbox_id?: string;
  account_id: string;
  status: boolean;
  hook_type: boolean;
  settings: Record<string, any>;
}

export interface GetMessages {
  accountId: number;
  conversationId: number;
}

export interface CreateMessage {
  accountId: number;
  conversationId: number;
  content: string;
  messageType?: "outgoing" | "incoming";
  private?: boolean;
  contentType?: "input_email" | "cards" | "input_select" | "form" | "article";
  contentAttributes?: Record<string, any>;
  templateParams?: {
    name?: string;
    category?: string;
    language?: string;
    processed_params?: Record<string, any>;
  };
}

export interface DeleteMessage {
  accountId: number;
  conversationId: number;
  messageId: number;
}

export interface Message {
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

export interface GetAccountReports {
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

export interface GetAccountReportsSummary {
  accountId: number;
  type: "account" | "agent" | "inbox" | "label" | "team";
  id?: string;
  since?: string;
  until?: string;
}

export interface GetAccountConversationMetrics {
  accountId: number;
  type: "account";
}

export interface GetAgentConversationMetrics {
  accountId: number;
  type: "agent";
  userId?: string;
}

export interface Report {
  value: string;
  timestamp: number;
}

export interface ReportSummary {
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

export interface ConversationMetrics {
  open: number;
  unattended: number;
  unassigned: number;
}

export interface AgentConversationMetrics {
  id: number;
  name: string;
  email: string;
  thumbnail: string;
  availability: string;
  metric: Record<string, any>;
}

export interface ListTeams {
  accountId: number;
}

export interface CreateTeam {
  accountId: number;
  name?: string;
  description?: string;
  allowAutoAssign?: boolean;
}

export interface GetTeamDetails {
  accountId: number;
  teamId: number;
}

export interface UpdateTeam {
  accountId: number;
  teamId: number;
  name?: string;
  description?: string;
  allowAutoAssign?: boolean;
}

export interface DeleteTeam {
  accountId: number;
  teamId: number;
}

export interface ListTeamAgents {
  accountId: number;
  teamId: number;
}

export interface AddTeamAgent {
  accountId: number;
  teamId: number;
  userIds: number[];
}

export interface UpdateTeamAgents {
  accountId: number;
  teamId: number;
  userIds: number[];
}

export interface RemoveTeamAgent {
  accountId: number;
  teamId: number;
  userIds: number[];
}

export interface Team {
  id: number;
  name: string;
  description: string;
  allowAutoAssign: boolean;
  accountId: number;
  isMember: boolean;
}

export interface TeamAgent {
  id: number;
  uid: string;
  name: string;
  availableName: string;
  displayName: string;
  email: string;
  accountId: number;
  role: "agent" | "administrator";
  confirmed: boolean;
  availabilityStatus: "available" | "busy" | "offline";
  autoffline: boolean;
  customAttributes: Record<string, any>;
}

export interface ListWebhooks {
  accountId: number;
}

export interface AddWebhook {
  accountId: number;
  url?: string;
  subscriptions?: (
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

export interface UpdateWebhook {
  accountId: number;
  webhookId: number;
  url?: string;
  subscriptions?: (
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

export interface DeleteWebhook {
  accountId: number;
  webhookId: number;
}

export interface Webhook {
  id: number;
  url: string;
  subscriptions: string[];
  account_id: number;
}

export interface ListAutomationRules {
  accountId: number;
  page?: number;
}

export interface AddAutomationRule {
  accountId: number;
  name?: string;
  description?: string;
  eventName?:
    | "conversation_created"
    | "conversation_updated"
    | "message_created";
  active?: boolean;
  actions?: Record<string, any>[];
  conditions?: Record<string, any>[];
}

export interface GetAutomationRuleDetails {
  accountId: number;
  id: number;
}

export interface UpdateAutomationRule {
  accountId: number;
  id: number;
  name?: string;
  description?: string;
  eventName?:
    | "conversation_created"
    | "conversation_updated"
    | "message_created";
  active?: boolean;
  actions?: Record<string, any>[];
  conditions?: Record<string, any>[];
}

export interface DeleteAutomationRule {
  accountId: number;
  id: number;
}

export interface AutomationRule {
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
export interface AddPortal {
  accountId: number;
  archived?: boolean;
  color?: string;
  config?: {
    allowed_locales?: string[];
    default_locale?: string;
  };
  customDomain?: string;
  headerText?: string;
  homepageLink?: string;
  name?: string;
  slug?: string;
  pageTitle?: string;
}

export interface ListPortals {
  accountId: number;
}

export interface UpdatePortal {
  accountId: number;
  archived?: boolean;
  color?: string;
  config?: {
    allowed_locales?: string[];
    default_locale?: string;
  };
  customDomain?: string;
  headerText?: string;
  homepageLink?: string;
  name?: string;
  slug?: string;
  pageTitle?: string;
}

export interface Portal {
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

export interface Category {
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

export interface Article {
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

export interface AddCategory {
  accountId: number;
  portalId: number;
  description?: string;
  locale?: string;
  name?: string;
  slug?: string;
  position?: number;
  associatedCategoryId?: number;
  parentCategoryId?: number;
}

export interface AddArticle {
  accountId: number;
  portalId: number;
  content?: string;
  meta?: Record<string, any>;
  position?: number;
  status?: "draft" | "published" | "archived";
  title?: string;
  slug?: string;
  views?: number;
  authorId?: number;
  categoryId?: number;
  folderId?: number;
  associatedArticleId?: number;
}
