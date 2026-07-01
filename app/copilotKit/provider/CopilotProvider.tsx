import { CopilotKit } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

export function CopilotProvider({ children }: { children: React.ReactNode }) {

  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      useSingleEndpoint
      onError={({ type, error, context }) => {
        console.error("[copilotkit]", type, error, context);
      }}
      showDevConsole={process.env.NODE_ENV !== "production"}
    >
      {children}
    </CopilotKit>
  );
}
