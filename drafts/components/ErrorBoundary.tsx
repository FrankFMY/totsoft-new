import { AlertCircle } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

/**
 * Error Boundary компонент для обработки ошибок рендеринга
 * Использует класс-компонент, так как функциональные компоненты
 * не могут быть Error Boundaries в React
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null
		};
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Логирование ошибки для мониторинга
		console.error('ErrorBoundary caught an error:', error, errorInfo);

		// Здесь можно добавить отправку ошибки в систему мониторинга
		// например, Sentry, LogRocket и т.д.
	}

	handleReset = (): void => {
		this.setState({
			hasError: false,
			error: null
		});
	};

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
					<div className="max-w-md w-full bg-dark-800 border border-red-500/30 rounded-2xl p-8 text-center">
						<div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
							<AlertCircle className="text-red-400 w-8 h-8" />
						</div>
						<h2 className="text-2xl font-bold text-white mb-4">Что-то пошло не так</h2>
						<p className="text-slate-400 mb-6">
							Произошла непредвиденная ошибка. Пожалуйста, обновите страницу или попробуйте позже.
						</p>
						{process.env.NODE_ENV === 'development' && this.state.error && (
							<details className="mb-6 text-left">
								<summary className="text-sm text-slate-500 cursor-pointer mb-2">
									Детали ошибки (только в режиме разработки)
								</summary>
								<pre className="text-xs text-red-400 bg-dark-900 p-4 rounded-lg overflow-auto">
									{this.state.error.toString()}
									{this.state.error.stack}
								</pre>
							</details>
						)}
						<div className="flex gap-4 justify-center">
							<button
								type="button"
								onClick={this.handleReset}
								className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors"
							>
								Попробовать снова
							</button>
							<button
								type="button"
								onClick={() => window.location.reload()}
								className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
							>
								Обновить страницу
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
