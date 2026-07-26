import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportLovableError } from "@/lib/lovable-error-reporting";

type Props = { children: ReactNode; label?: string };
type State = { error: Error | null };

/** Keeps a failure inside one editor panel from blanking the whole admin page. */
export class EditorErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportLovableError(error, { component: this.props.label ?? "EditorErrorBoundary", info: info.componentStack });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="space-y-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
          <AlertTriangle className="h-4 w-4" /> Không tải được khu vực này
        </p>
        <p className="text-xs text-muted-foreground">{this.state.error.message}</p>
        <Button size="sm" variant="outline" onClick={() => this.setState({ error: null })}>
          Thử lại
        </Button>
      </div>
    );
  }
}
