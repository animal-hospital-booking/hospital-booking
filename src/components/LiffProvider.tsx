"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LiffContextType = {
  lineUserId: string | null;
  displayName: string | null;
  isInLine: boolean;
  isReady: boolean;
};

const LiffContext = createContext<LiffContextType>({
  lineUserId: null,
  displayName: null,
  isInLine: false,
  isReady: false,
});

export function useLiff() {
  return useContext(LiffContext);
}

export default function LiffProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LiffContextType>({
    lineUserId: null,
    displayName: null,
    isInLine: false,
    isReady: false,
  });

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if (!liffId) {
      setState((prev) => ({ ...prev, isReady: true }));
      return;
    }

    import("@line/liff").then(async (liffModule) => {
      const liff = liffModule.default;
      try {
        await liff.init({ liffId });
        const isInLine = liff.isInClient();

        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setState({
            lineUserId: profile.userId,
            displayName: profile.displayName,
            isInLine,
            isReady: true,
          });
        } else {
          setState({ lineUserId: null, displayName: null, isInLine, isReady: true });
        }
      } catch (e) {
        console.error("LIFF init failed:", e);
        setState({ lineUserId: null, displayName: null, isInLine: false, isReady: true });
      }
    });
  }, []);

  return <LiffContext.Provider value={state}>{children}</LiffContext.Provider>;
}
