import { CopilotKit } from "@copilotkit/react-core";

export function CopilotProvider({ children }: { children: React.ReactNode }) {

  return (
    <CopilotKit
      publicApiKey={process.env.NEXT_PUBLIC_COPILOT_PUBLIC_API_KEY}
    >
      {children}
    </CopilotKit>
  );
}
