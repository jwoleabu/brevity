type Template = "workspaces" | "users";

interface Props {
	value: string;
	template: Template;
	onChange: (name: string) => void;
}

export function TemplateSelect({ value, template, onChange }: Props) {
	const { templates, loading, error } = useTemplate(template);

	useEffect(() => {
		if (!value && templates.length > 0) {
			onChange(templates[0]);
		}
	}, [templates, value, onChange]);

	if (loading) {
		return (
			<select disabled>
				<option>Loading…</option>
			</select>
		);
	}

	if (error) {
		return <span style={{ color: "red" }}>Error: {error}</span>;
	}

	return (
		<select
			className="h-10"
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			<option value="" disabled>
				Select a template
			</option>
			{templates.map((name) => (
				<option key={name} value={name}>
					{name}
				</option>
			))}
		</select>
	);
}
