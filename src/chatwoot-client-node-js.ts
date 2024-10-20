import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  Config,
  Account,
  CreateAccount,
  GetAccount,
  UpdateAccount,
  DeleteAccount,
  AccountUser,
  ListAccountUsers,
  CreateAccountUser,
  DeleteAccountUser,
  CreateAgentBot,
  GetAgentBotDetails,
  UpdateAgentBot,
  DeleteAgentBot,
  AgentBot,
  CreateUser,
  GetUserDetails,
  UserDetails,
  UpdateUser,
  DeleteUser,
  GetUserSSOLink,
  UserSSOLink,
  User,
  ListAccountAgentBots,
  CreateAccountAgentBot,
  GetAccountAgentBotDetails,
  UpdateAccountAgentBot,
  DeleteAccountAgentBot,
  AccountAgentBot,
  ListAgents,
  AddAgent,
  UpdateAgent,
  RemoveAgent,
  Agent,
  ListCannedResponses,
  AddCannedResponse,
  DeleteCannedResponse,
  CannedResponse,
  ListContacts,
  ContactPayload,
  CreateContact,
  GetContact,
  UpdateContact,
  DeleteContact,
  GetContactConversations,
  SearchContacts,
  ContactListItemPayload,
  FilterContacts,
  ContactFilterResponse,
  AssignConversation,
  Assignee,
  ListConversationLabels,
  AddConversationLabels,
  LabelsPayload,
  GetConversationCounts,
  ConversationCounts,
  ListConversations,
  ConversationListResponse,
  CreateConversation,
  Conversation,
  FilterConversations,
  ConversationFilterResponse,
  GetConversationDetails,
  ToggleConversationStatus,
  ToggleConversationPriority,
  ConversationDetails,
  ToggleStatusResponse,
  ListCustomAttributes,
  AddCustomAttribute,
  GetCustomAttributeDetails,
  UpdateCustomAttribute,
  DeleteCustomAttribute,
  CustomAttribute,
  ListCustomFilters,
  AddCustomFilter,
  GetCustomFilterDetails,
  UpdateCustomFilter,
  DeleteCustomFilter,
  CustomFilter,
  ListInboxes,
  GetInboxDetails,
  CreateInbox,
  UpdateInbox,
  Inbox,
  ListInboxAgents,
  AddInboxAgent,
  UpdateInboxAgents,
  RemoveInboxAgent,
  InboxAgent,
  ListIntegrations,
  CreateIntegrationHook,
  UpdateIntegrationHook,
  DeleteIntegrationHook,
  Integration,
  IntegrationHook,
  GetMessages,
  CreateMessage,
  DeleteMessage,
  Message,
  GetAccountReports,
  GetAccountReportsSummary,
  GetAccountConversationMetrics,
  GetAgentConversationMetrics,
  Report,
  ReportSummary,
  ConversationMetrics,
  AgentConversationMetrics,
  ListTeams,
  CreateTeam,
  GetTeamDetails,
  UpdateTeam,
  DeleteTeam,
  ListTeamAgents,
  AddTeamAgent,
  UpdateTeamAgents,
  RemoveTeamAgent,
  Team,
  TeamAgent,
  ListWebhooks,
  AddWebhook,
  UpdateWebhook,
  DeleteWebhook,
  Webhook,
  ListAutomationRules,
  AddAutomationRule,
  GetAutomationRuleDetails,
  UpdateAutomationRule,
  DeleteAutomationRule,
  AutomationRule,
  AddPortal,
  ListPortals,
  UpdatePortal,
  Portal,
  Category,
  Article,
  AddCategory,
  AddArticle,
  SearchContactsResponse,
} from "./types";

interface ApiResponse<T> {
  success: boolean;
  error?: string;
  errorCode?: number;
  errors?: Array<{ field: string; message: string; code: string }>;
  data?: T;
}

class ChatwootClient {
  private axiosInstance: AxiosInstance;
  private config: Config;
  private version: string = "1";

  constructor(config: Config) {
    if (!config.host) {
      throw new Error("Host is required");
    }
    if (!config.userToken || !config.platformToken) {
      throw new Error("userToken or platformToken is required");
    }
    if (config.version) {
      this.version = config.version;
    }
    this.config = config;
    const options: any = {
      baseURL: config.host,
      headers: {},
    };
    this.axiosInstance = axios.create(options);
  }

  private async requestWithRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    retries = 3
  ): Promise<ApiResponse<T>> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await requestFn();
        return { success: true, data: response.data };
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 401) {
            return { success: false, error: "Unauthorized", errorCode: status };
          } else if (status === 404) {
            return { success: false, error: "Not Found", errorCode: status };
          } else if (status === 403) {
            return {
              success: false,
              error: "Access Denied",
              errorCode: status,
            };
          } else if (status === 400) {
            return {
              success: false,
              error: data.description,
              errorCode: status,
              errors: data.errors,
            };
          }
        }
        if (attempt === retries) {
          return {
            success: false,
            error: error.message,
            errorCode: error.response?.status,
          };
        }
      }
    }
    return { success: false, error: "Max retries reached" };
  }

  /*
   * Platform - Accounts
   */

  public async createAccount({
    name,
  }: CreateAccount): Promise<ApiResponse<Account>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/platform/api/v${this.version}/accounts`,
        {
          name,
        },
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async getAccount({
    accountId,
  }: GetAccount): Promise<ApiResponse<Account>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/platform/api/v${this.version}/accounts/${accountId}`,
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async updateAccount({
    accountId,
    name,
  }: UpdateAccount): Promise<ApiResponse<Account>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/platform/api/v${this.version}/accounts/${accountId}`,
        { name },
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async deleteAccount({
    accountId,
  }: DeleteAccount): Promise<ApiResponse<void>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/platform/api/v${this.version}/accounts/${accountId}`,
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  /*
   * Platform - Account Users
   */

  public async listAccountUsers({
    accountId,
  }: ListAccountUsers): Promise<ApiResponse<AccountUser[]>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/platform/api/v${this.version}/accounts/${accountId}/account_users`,
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async createAccountUser({
    accountId,
    userId,
    role,
  }: CreateAccountUser): Promise<ApiResponse<AccountUser>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!userId) {
      return { success: false, error: "userId is required" };
    }
    if (!role) {
      return { success: false, error: "role is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/platform/api/v${this.version}/accounts/${accountId}/account_users`,
        { user_id: userId, role },
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async deleteAccountUser({
    accountId,
    userId,
  }: DeleteAccountUser): Promise<ApiResponse<void>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!userId) {
      return { success: false, error: "userId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/platform/api/v${this.version}/accounts/${accountId}/account_users`,
        {
          data: { user_id: userId },
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  /*
   * Platform - Agent Bots
   */

  public async listAgentBots(): Promise<ApiResponse<AgentBot[]>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(`/platform/api/v${this.version}/agent_bots`, {
        headers: {
          api_access_token: this.config.platformToken,
        },
      })
    );
  }

  public async createAgentBot({
    name,
    description,
    outgoingUrl,
  }: CreateAgentBot): Promise<ApiResponse<AgentBot>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/platform/api/v${this.version}/agent_bots`,
        {
          name,
          description,
          outgoing_url: outgoingUrl,
        },
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async getAgentBotDetails({
    id,
  }: GetAgentBotDetails): Promise<ApiResponse<AgentBot>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/platform/api/v${this.version}/agent_bots/${id}`,
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async updateAgentBot({
    id,
    name,
    description,
    outgoingUrl,
  }: UpdateAgentBot): Promise<ApiResponse<AgentBot>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/platform/api/v${this.version}/agent_bots/${id}`,
        {
          name,
          description,
          outgoing_url: outgoingUrl,
        },
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async deleteAgentBot({
    id,
  }: DeleteAgentBot): Promise<ApiResponse<void>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/platform/api/v${this.version}/agent_bots/${id}`,
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  /*
   * Platform - Users
   */

  public async createUser({
    name,
    email,
    password,
    customAttributes,
  }: CreateUser): Promise<ApiResponse<User>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/platform/api/v${this.version}/users`,
        {
          name,
          email,
          password,
          custom_attributes: customAttributes,
        },
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async getUserDetails({
    id,
  }: GetUserDetails): Promise<ApiResponse<UserDetails>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(`/platform/api/v${this.version}/users/${id}`, {
        headers: {
          api_access_token: this.config.platformToken,
        },
      })
    );
  }

  public async updateUser({
    id,
    name,
    email,
    password,
    customAttributes,
  }: UpdateUser): Promise<ApiResponse<User>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/platform/api/v${this.version}/users/${id}`,
        {
          name,
          email,
          password,
          custom_attributes: customAttributes,
        },
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  public async deleteUser({ id }: DeleteUser): Promise<ApiResponse<void>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(`/platform/api/v${this.version}/users/${id}`, {
        headers: {
          api_access_token: this.config.platformToken,
        },
      })
    );
  }

  public async getUserSSOLink({
    id,
  }: GetUserSSOLink): Promise<ApiResponse<UserSSOLink>> {
    if (!this.config.platformToken) {
      return { success: false, error: "platformToken is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/platform/api/v${this.version}/users/${id}/login`,
        {
          headers: {
            api_access_token: this.config.platformToken,
          },
        }
      )
    );
  }

  /*
   * Application - Account Agent Bots
   */

  public async listAccountAgentBots({
    accountId,
  }: ListAccountAgentBots): Promise<ApiResponse<AccountAgentBot[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/agent_bots`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async createAccountAgentBot({
    accountId,
    name,
    description,
    outgoingUrl,
  }: CreateAccountAgentBot): Promise<ApiResponse<AccountAgentBot>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/agent_bots`,
        {
          name,
          description,
          outgoing_url: outgoingUrl,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getAccountAgentBotDetails({
    accountId,
    id,
  }: GetAccountAgentBotDetails): Promise<ApiResponse<AccountAgentBot>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/agent_bots/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateAccountAgentBot({
    accountId,
    id,
    name,
    description,
    outgoingUrl,
  }: UpdateAccountAgentBot): Promise<ApiResponse<AccountAgentBot>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/agent_bots/${id}`,
        {
          name,
          description,
          outgoing_url: outgoingUrl,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteAccountAgentBot({
    accountId,
    id,
  }: DeleteAccountAgentBot): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/agent_bots/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Agents
   */

  public async listAgents({
    accountId,
  }: ListAgents): Promise<ApiResponse<Agent[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/agents`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addAgent({
    accountId,
    name,
    email,
    role,
    availabilityStatus,
    autoOffline,
  }: AddAgent): Promise<ApiResponse<Agent>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!name) {
      return { success: false, error: "name is required" };
    }
    if (!email) {
      return { success: false, error: "email is required" };
    }
    if (!role) {
      return { success: false, error: "role is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/agents`,
        {
          name,
          email,
          role,
          availability_status: availabilityStatus,
          auto_offline: autoOffline,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateAgent({
    accountId,
    id,
    role,
    availability,
    autoOffline,
  }: UpdateAgent): Promise<ApiResponse<Agent>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    if (!role) {
      return { success: false, error: "role is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/agents/${id}`,
        {
          role,
          availability,
          auto_offline: autoOffline,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async removeAgent({
    accountId,
    id,
  }: RemoveAgent): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/agents/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Canned Responses
   */

  public async listCannedResponses({
    accountId,
  }: ListCannedResponses): Promise<ApiResponse<CannedResponse[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/canned_responses`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addCannedResponse({
    accountId,
    content,
    shortCode,
  }: AddCannedResponse): Promise<ApiResponse<CannedResponse>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/canned_responses`,
        {
          content,
          short_code: shortCode,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteCannedResponse({
    accountId,
    id,
  }: DeleteCannedResponse): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/canned_responses/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Contacts
   */

  public async listContacts({
    accountId,
    sort,
    page,
  }: ListContacts): Promise<ApiResponse<ContactListItemPayload[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/contacts`,
        {
          params: { sort, page },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async createContact({
    accountId,
    inboxId,
    name,
    email,
    phoneNumber,
    avatar,
    avatarUrl,
    identifier,
    customAttributes,
  }: CreateContact): Promise<ApiResponse<ContactPayload>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!inboxId) {
      return { success: false, error: "inboxId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/contacts`,
        {
          inbox_id: inboxId,
          name,
          email,
          phone_number: phoneNumber,
          avatar,
          avatar_url: avatarUrl,
          identifier,
          custom_attributes: customAttributes,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getContact({
    accountId,
    id,
  }: GetContact): Promise<ApiResponse<ContactPayload>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/contacts/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateContact({
    accountId,
    id,
    name,
    email,
    phoneNumber,
    avatar,
    avatarUrl,
    identifier,
    customAttributes,
  }: UpdateContact): Promise<ApiResponse<ContactPayload>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.put(
        `/api/v${this.version}/accounts/${accountId}/contacts/${id}`,
        {
          name,
          email,
          phone_number: phoneNumber,
          avatar,
          avatar_url: avatarUrl,
          identifier,
          custom_attributes: customAttributes,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteContact({
    accountId,
    id,
  }: DeleteContact): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/contacts/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getContactConversations({
    accountId,
    id,
  }: GetContactConversations): Promise<ApiResponse<Conversation[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/contacts/${id}/conversations`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async searchContacts({
    accountId,
    q,
    sort,
    page,
  }: SearchContacts): Promise<ApiResponse<SearchContactsResponse>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!q) {
      return { success: false, error: "search query (q) is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/contacts/search`,
        {
          params: { q, sort, page },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async filterContacts({
    accountId,
    page,
    payload,
  }: FilterContacts): Promise<ApiResponse<ContactFilterResponse[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/contacts/filter`,
        { payload },
        {
          params: { page },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Conversation Assignments
   */

  public async assignConversation({
    accountId,
    conversationId,
    assigneeId,
    teamId,
  }: AssignConversation): Promise<ApiResponse<Assignee>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    if (!assigneeId && !teamId) {
      return {
        success: false,
        error: "Either assigneeId or teamId is required",
      };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/assignments`,
        {
          assignee_id: assigneeId,
          team_id: teamId,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async listConversationLabels({
    accountId,
    conversationId,
  }: ListConversationLabels): Promise<ApiResponse<LabelsPayload>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/labels`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addConversationLabels({
    accountId,
    conversationId,
    labels,
  }: AddConversationLabels): Promise<ApiResponse<LabelsPayload>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/labels`,
        {
          labels,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getConversationCounts({
    accountId,
    status,
    q,
    inboxId,
    teamId,
    labels,
  }: GetConversationCounts): Promise<ApiResponse<ConversationCounts>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/conversations/meta`,
        {
          params: { status, q, inbox_id: inboxId, team_id: teamId, labels },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async listConversations({
    accountId,
    assigneeType,
    status,
    q,
    inboxId,
    teamId,
    labels,
    page,
  }: ListConversations): Promise<ApiResponse<ConversationListResponse>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/conversations`,
        {
          params: {
            assignee_type: assigneeType,
            status,
            q,
            inbox_id: inboxId,
            team_id: teamId,
            labels,
            page,
          },

          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Create New Conversation
   */

  public async createConversation({
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
  }: CreateConversation): Promise<ApiResponse<Conversation>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!sourceId) {
      return { success: false, error: "sourceId is required" };
    }
    if (!inboxId) {
      return { success: false, error: "inboxId is required" };
    }
    if (!message || !message.content) {
      return { success: false, error: "message content is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/conversations`,
        {
          source_id: sourceId,
          inbox_id: inboxId,
          contact_id: contactId,
          additional_attributes: additionalAttributes,
          custom_attributes: customAttributes,
          status,
          assignee_id: assigneeId,
          team_id: teamId,
          message,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Conversations Filter
   */

  public async filterConversations({
    accountId,
    page,
    payload,
  }: FilterConversations): Promise<ApiResponse<ConversationFilterResponse>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/conversations/filter`,
        {
          payload,
        },
        {
          params: { page },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Conversation Details
   */

  public async getConversationDetails({
    accountId,
    conversationId,
  }: GetConversationDetails): Promise<ApiResponse<ConversationDetails>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Toggle Conversation Status
   */

  public async toggleConversationStatus({
    accountId,
    conversationId,
    status,
  }: ToggleConversationStatus): Promise<ApiResponse<ToggleStatusResponse>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    if (!status) {
      return { success: false, error: "status is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/toggle_status`,
        {
          status,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Toggle Conversation Priority
   */

  public async toggleConversationPriority({
    accountId,
    conversationId,
    priority,
  }: ToggleConversationPriority): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    if (!priority) {
      return { success: false, error: "priority is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/toggle_priority`,
        {
          priority,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Custom Attributes
   */

  public async listCustomAttributes({
    accountId,
    attributeModel,
  }: ListCustomAttributes): Promise<ApiResponse<CustomAttribute[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!attributeModel) {
      return { success: false, error: "attributeModel is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/custom_attribute_definitions`,
        {
          params: { attribute_model: attributeModel },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addCustomAttribute({
    accountId,
    attributeDisplayName,
    attributeDisplayType,
    attributeDescription,
    attributeKey,
    attributeValues,
    attributeModel,
  }: AddCustomAttribute): Promise<ApiResponse<CustomAttribute>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/custom_attribute_definitions`,
        {
          attribute_display_name: attributeDisplayName,
          attribute_display_type: attributeDisplayType,
          attribute_description: attributeDescription,
          attribute_key: attributeKey,
          attribute_values: attributeValues,
          attribute_model: attributeModel,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getCustomAttributeDetails({
    accountId,
    id,
  }: GetCustomAttributeDetails): Promise<ApiResponse<CustomAttribute>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/custom_attribute_definitions/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateCustomAttribute({
    accountId,
    id,
    attributeDisplayName,
    attributeDisplayType,
    attributeDescription,
    attributeKey,
    attributeValues,
    attributeModel,
  }: UpdateCustomAttribute): Promise<ApiResponse<CustomAttribute>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/custom_attribute_definitions/${id}`,
        {
          attribute_display_name: attributeDisplayName,
          attribute_display_type: attributeDisplayType,
          attribute_description: attributeDescription,
          attribute_key: attributeKey,
          attribute_values: attributeValues,
          attribute_model: attributeModel,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteCustomAttribute({
    accountId,
    id,
  }: DeleteCustomAttribute): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/custom_attribute_definitions/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Custom Filters
   */

  public async listCustomFilters({
    accountId,
    filterType,
  }: ListCustomFilters): Promise<ApiResponse<CustomFilter[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/custom_filters`,
        {
          params: { filter_type: filterType },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addCustomFilter({
    accountId,
    filterType,
    name,
    type,
    query,
  }: AddCustomFilter): Promise<ApiResponse<CustomFilter>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/custom_filters`,
        {
          name,
          type,
          query,
        },
        {
          params: { filter_type: filterType },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getCustomFilterDetails({
    accountId,
    customFilterId,
  }: GetCustomFilterDetails): Promise<ApiResponse<CustomFilter>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!customFilterId) {
      return { success: false, error: "customFilterId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/custom_filters/${customFilterId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateCustomFilter({
    accountId,
    customFilterId,
    name,
    type,
    query,
  }: UpdateCustomFilter): Promise<ApiResponse<CustomFilter>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!customFilterId) {
      return { success: false, error: "customFilterId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/custom_filters/${customFilterId}`,
        {
          name,
          type,
          query,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteCustomFilter({
    accountId,
    customFilterId,
  }: DeleteCustomFilter): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!customFilterId) {
      return { success: false, error: "customFilterId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/custom_filters/${customFilterId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Inboxes
   */

  public async listInboxes({
    accountId,
  }: ListInboxes): Promise<ApiResponse<Inbox[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/inboxes`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getInboxDetails({
    accountId,
    id,
  }: GetInboxDetails): Promise<ApiResponse<Inbox>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/inboxes/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async createInbox({
    accountId,
    name,
    avatar,
    channel,
  }: CreateInbox): Promise<ApiResponse<Inbox>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/inboxes`,
        {
          name,
          avatar,
          channel,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateInbox({
    accountId,
    id,
    name,
    enableAutoAssignment,
    avatar,
    channel,
  }: UpdateInbox): Promise<ApiResponse<Inbox>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    if (!enableAutoAssignment) {
      return { success: false, error: "enableAutoAssignment is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/inboxes/${id}`,
        {
          name,
          enable_auto_assignment: enableAutoAssignment,
          avatar,
          channel,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async listInboxAgents({
    accountId,
    inboxId,
  }: ListInboxAgents): Promise<ApiResponse<InboxAgent[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!inboxId) {
      return { success: false, error: "inboxId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/inbox_members/${inboxId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addInboxAgent({
    accountId,
    inboxId,
    userIds,
  }: AddInboxAgent): Promise<ApiResponse<InboxAgent[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!inboxId) {
      return { success: false, error: "inboxId is required" };
    }
    if (!userIds) {
      return { success: false, error: "userIds is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/inbox_members`,
        {
          inbox_id: inboxId,
          user_ids: userIds,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateInboxAgents({
    accountId,
    inboxId,
    userIds,
  }: UpdateInboxAgents): Promise<ApiResponse<InboxAgent[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!inboxId) {
      return { success: false, error: "inboxId is required" };
    }
    if (!userIds) {
      return { success: false, error: "userIds is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/inbox_members`,
        {
          inbox_id: inboxId,
          user_ids: userIds,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async removeInboxAgent({
    accountId,
    inboxId,
    userIds,
  }: RemoveInboxAgent): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!inboxId) {
      return { success: false, error: "inboxId is required" };
    }
    if (!userIds) {
      return { success: false, error: "userIds is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/inbox_members`,
        {
          data: {
            inbox_id: inboxId,
            user_ids: userIds,
          },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Integrations
   */

  public async listIntegrations({
    accountId,
  }: ListIntegrations): Promise<ApiResponse<Integration[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/integrations/apps`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async createIntegrationHook({
    accountId,
    appId,
    inboxId,
    settings,
  }: CreateIntegrationHook): Promise<ApiResponse<IntegrationHook>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/integrations/hooks`,
        {
          app_id: appId,
          inbox_id: inboxId,
          settings,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateIntegrationHook({
    accountId,
    hookId,
    settings,
  }: UpdateIntegrationHook): Promise<ApiResponse<IntegrationHook>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!hookId) {
      return { success: false, error: "hookId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/integrations/hooks/${hookId}`,
        {
          settings,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteIntegrationHook({
    accountId,
    hookId,
  }: DeleteIntegrationHook): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!hookId) {
      return { success: false, error: "hookId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/integrations/hooks/${hookId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Messages
   */

  public async getMessages({
    accountId,
    conversationId,
  }: GetMessages): Promise<ApiResponse<Message[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/messages`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async createMessage({
    accountId,
    conversationId,
    content,
    messageType,
    private: isPrivate,
    contentType,
    contentAttributes,
    templateParams,
  }: CreateMessage): Promise<ApiResponse<Message>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    if (!content) {
      return { success: false, error: "content is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/messages`,
        {
          content,
          message_type: messageType,
          private: isPrivate,
          content_type: contentType,
          content_attributes: contentAttributes,
          template_params: templateParams,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteMessage({
    accountId,
    conversationId,
    messageId,
  }: DeleteMessage): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!conversationId) {
      return { success: false, error: "conversationId is required" };
    }
    if (!messageId) {
      return { success: false, error: "messageId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/conversations/${conversationId}/messages/${messageId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Reports
   */

  public async getAccountReports({
    accountId,
    metric,
    type,
    id,
    since,
    until,
  }: GetAccountReports): Promise<ApiResponse<Report[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!metric) {
      return { success: false, error: "metric is required" };
    }
    if (!type) {
      return { success: false, error: "type is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(`/api/v2/accounts/${accountId}/reports`, {
        params: { metric, type, id, since, until },
        headers: {
          api_access_token: this.config.userToken,
        },
      })
    );
  }

  public async getAccountReportsSummary({
    accountId,
    type,
    id,
    since,
    until,
  }: GetAccountReportsSummary): Promise<ApiResponse<ReportSummary>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!type) {
      return { success: false, error: "type is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(`/api/v2/accounts/${accountId}/reports/summary`, {
        params: { type, id, since, until },
        headers: {
          api_access_token: this.config.userToken,
        },
      })
    );
  }

  public async getAccountConversationMetrics({
    accountId,
    type,
  }: GetAccountConversationMetrics): Promise<ApiResponse<ConversationMetrics>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!type) {
      return { success: false, error: "type is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v2/accounts/${accountId}/reports/conversations`,
        {
          params: { type },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getAgentConversationMetrics({
    accountId,
    type,
    userId,
  }: GetAgentConversationMetrics): Promise<
    ApiResponse<AgentConversationMetrics[]>
  > {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!type) {
      return { success: false, error: "type is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v2/accounts/${accountId}/reports/conversations`,
        {
          params: { type, user_id: userId },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Teams
   */

  public async listTeams({
    accountId,
  }: ListTeams): Promise<ApiResponse<Team[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/teams`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async createTeam({
    accountId,
    name,
    description,
    allowAutoAssign,
  }: CreateTeam): Promise<ApiResponse<Team>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/teams`,
        {
          name,
          description,
          allow_auto_assign: allowAutoAssign,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getTeamDetails({
    accountId,
    teamId,
  }: GetTeamDetails): Promise<ApiResponse<Team>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!teamId) {
      return { success: false, error: "teamId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/teams/${teamId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateTeam({
    accountId,
    teamId,
    name,
    description,
    allowAutoAssign,
  }: UpdateTeam): Promise<ApiResponse<Team>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!teamId) {
      return { success: false, error: "teamId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/teams/${teamId}`,
        {
          name,
          description,
          allow_auto_assign: allowAutoAssign,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteTeam({
    accountId,
    teamId,
  }: DeleteTeam): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!teamId) {
      return { success: false, error: "teamId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/teams/${teamId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async listTeamAgents({
    accountId,
    teamId,
  }: ListTeamAgents): Promise<ApiResponse<TeamAgent[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!teamId) {
      return { success: false, error: "teamId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/teams/${teamId}/team_members`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addTeamAgent({
    accountId,
    teamId,
    userIds,
  }: AddTeamAgent): Promise<ApiResponse<TeamAgent[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!teamId) {
      return { success: false, error: "teamId is required" };
    }
    if (!userIds) {
      return { success: false, error: "userIds is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/teams/${teamId}/team_members`,
        {
          user_ids: userIds,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateTeamAgents({
    accountId,
    teamId,
    userIds,
  }: UpdateTeamAgents): Promise<ApiResponse<TeamAgent[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!teamId) {
      return { success: false, error: "teamId is required" };
    }
    if (!userIds) {
      return { success: false, error: "userIds is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/teams/${teamId}/team_members`,
        {
          user_ids: userIds,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async removeTeamAgent({
    accountId,
    teamId,
    userIds,
  }: RemoveTeamAgent): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!teamId) {
      return { success: false, error: "teamId is required" };
    }
    if (!userIds) {
      return { success: false, error: "userIds is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/teams/${teamId}/team_members`,
        {
          data: {
            user_ids: userIds,
          },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Webhooks
   */

  public async listWebhooks({
    accountId,
  }: ListWebhooks): Promise<ApiResponse<Webhook[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/webhooks`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addWebhook({
    accountId,
    url,
    subscriptions,
  }: AddWebhook): Promise<ApiResponse<Webhook>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/webhooks`,
        {
          url,
          subscriptions,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateWebhook({
    accountId,
    webhookId,
    url,
    subscriptions,
  }: UpdateWebhook): Promise<ApiResponse<Webhook>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!webhookId) {
      return { success: false, error: "webhookId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/webhooks/${webhookId}`,
        {
          url,
          subscriptions,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteWebhook({
    accountId,
    webhookId,
  }: DeleteWebhook): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!webhookId) {
      return { success: false, error: "webhookId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/webhooks/${webhookId}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Automation Rules
   */

  public async listAutomationRules({
    accountId,
    page,
  }: ListAutomationRules): Promise<ApiResponse<AutomationRule[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/automation_rules`,
        {
          params: { page },
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addAutomationRule({
    accountId,
    name,
    description,
    eventName,
    active,
    actions,
    conditions,
  }: AddAutomationRule): Promise<ApiResponse<AutomationRule>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/automation_rules`,
        {
          name,
          description,
          event_name: eventName,
          active,
          actions,
          conditions,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async getAutomationRuleDetails({
    accountId,
    id,
  }: GetAutomationRuleDetails): Promise<ApiResponse<AutomationRule>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/automation_rules/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updateAutomationRule({
    accountId,
    id,
    name,
    description,
    eventName,
    active,
    actions,
    conditions,
  }: UpdateAutomationRule): Promise<ApiResponse<AutomationRule>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/automation_rules/${id}`,
        {
          name,
          description,
          event_name: eventName,
          active,
          actions,
          conditions,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async deleteAutomationRule({
    accountId,
    id,
  }: DeleteAutomationRule): Promise<ApiResponse<void>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!id) {
      return { success: false, error: "id is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.delete(
        `/api/v${this.version}/accounts/${accountId}/automation_rules/${id}`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  /*
   * Application - Help Center
   */

  public async addPortal({
    accountId,
    archived,
    color,
    config,
    customDomain,
    headerText,
    homepageLink,
    name,
    slug,
    pageTitle,
  }: AddPortal): Promise<ApiResponse<Portal>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/portals`,
        {
          archived,
          color,
          config,
          custom_domain: customDomain,
          header_text: headerText,
          homepage_link: homepageLink,
          name,
          slug,
          page_title: pageTitle,
          account_id: accountId,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async listPortals({
    accountId,
  }: ListPortals): Promise<ApiResponse<Portal[]>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.get(
        `/api/v${this.version}/accounts/${accountId}/portals`,
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async updatePortal({
    accountId,
    archived,
    color,
    config,
    customDomain,
    headerText,
    homepageLink,
    name,
    slug,
    pageTitle,
  }: UpdatePortal): Promise<ApiResponse<Portal>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.patch(
        `/api/v${this.version}/accounts/${accountId}/portals`,
        {
          archived,
          color,
          config,
          custom_domain: customDomain,
          header_text: headerText,
          homepage_link: homepageLink,
          name,
          slug,
          page_title: pageTitle,
          account_id: accountId,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addCategory({
    accountId,
    portalId,
    description,
    locale,
    name,
    slug,
    position,
    associatedCategoryId,
    parentCategoryId,
  }: AddCategory): Promise<ApiResponse<Category>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!portalId) {
      return { success: false, error: "portalId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/portals/${portalId}/categories`,
        {
          description,
          locale,
          name,
          slug,
          position,
          associated_category_id: associatedCategoryId,
          parent_category_id: parentCategoryId,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }

  public async addArticle({
    accountId,
    portalId,
    content,
    meta,
    position,
    status,
    title,
    slug,
    views,
    authorId,
    categoryId,
    folderId,
    associatedArticleId,
  }: AddArticle): Promise<ApiResponse<Article>> {
    if (!this.config.userToken) {
      return { success: false, error: "userToken is required" };
    }
    if (!accountId) {
      return { success: false, error: "accountId is required" };
    }
    if (!portalId) {
      return { success: false, error: "portalId is required" };
    }
    return this.requestWithRetry(() =>
      this.axiosInstance.post(
        `/api/v${this.version}/accounts/${accountId}/portals/${portalId}/articles`,
        {
          content,
          meta,
          position,
          status,
          title,
          slug,
          views,
          author_id: authorId,
          category_id: categoryId,
          folder_id: folderId,
          associated_article_id: associatedArticleId,
        },
        {
          headers: {
            api_access_token: this.config.userToken,
          },
        }
      )
    );
  }
}

export default ChatwootClient;
