import { createBrowserRouter } from "react-router";
import { LoginScreen } from "./screens/LoginScreen";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardScreen } from "./screens/DashboardScreen";
import { KnowledgeUploadScreen } from "./screens/KnowledgeUploadScreen";
import { EmailReviewScreen } from "./screens/EmailReviewScreen";
import { KnowledgeBaseScreen } from "./screens/KnowledgeBaseScreen";
import { QueryAssistantScreen } from "./screens/QueryAssistantScreen";
import { QueryHistoryScreen } from "./screens/QueryHistoryScreen";
import { AnalyticsScreen } from "./screens/AnalyticsScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { KnowledgeDetailScreen } from "./screens/KnowledgeDetailScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardScreen },
      { path: "upload", Component: KnowledgeUploadScreen },
      { path: "email-review", Component: EmailReviewScreen },
      { path: "knowledge-base", Component: KnowledgeBaseScreen },
      { path: "knowledge-base/:id", Component: KnowledgeDetailScreen },
      { path: "query-assistant", Component: QueryAssistantScreen },
      { path: "query-history", Component: QueryHistoryScreen },
      { path: "analytics", Component: AnalyticsScreen },
      { path: "settings", Component: SettingsScreen },
    ],
  },
]);
