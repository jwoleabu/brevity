import { useEffect, useState } from "react";
import type { PublicPath } from "wxt/browser";

export function useTemplate(template: string) {
	const [templates, setTemplates] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const url = browser.runtime.getURL(
					`/mock/${template}/index.json` as PublicPath,
				);
				const res = await fetch(url);
				if (!res.ok)
					throw new Error(`Failed to load workspace index (${res.status})`);
				const names = (await res.json()) as string[];
				if (!cancelled) setTemplates(names);
			} catch (err) {
				if (!cancelled)
					setError(err instanceof Error ? err.message : String(err));
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [template]);

	return { templates, loading, error };
}
