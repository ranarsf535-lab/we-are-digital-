import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white gap-4 px-6">
          <h1 className="text-4xl font-bold text-purple-400">Oops!</h1>
          <p className="text-gray-400">Something went wrong. Please refresh the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-medium transition"
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
