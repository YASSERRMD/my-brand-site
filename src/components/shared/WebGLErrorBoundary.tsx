"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("[WebGL] Scene failed to render:", error.message);
  }

  render() {
    if (this.state.hasError) {
      // Silent fallback — the CSS background still works
      return null;
    }
    return this.props.children;
  }
}
