import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import * as z4 from "zod/v4";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createTestProfile } from "@/lib/db";
import { MessageType } from "@/lib/message";
import type { Profile } from "@/lib/workspace";

const formSchema = z4.object({
	firstName: z4.string().trim().nonempty("Field is required."),
	lastName: z4.string().trim().nonempty("Field is required."),
	email: z4.email("Invalid email address."),
	number: z4.e164("Invalid phone number."),
});

export function BugReportForm() {
	const form = useForm<z4.infer<typeof formSchema>>({
		resolver: standardSchemaResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			number: "",
		},
	});

	async function onSubmit(data: z4.infer<typeof formSchema>) {
		const profile: Profile = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.number,
		};
		await createTestProfile(profile);
		await browser.runtime.sendMessage({
			type: MessageType.PROFILE_UPDATED,
		});
		console.log("sending profile updated");
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Create User</CardTitle>
				<CardDescription>Tell us about you, chap</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="firstName"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										First Name
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Jon"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="lastName"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Last Name
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="Snow"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder="ice@mail.com"
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name="number"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="form-rhf-demo-title">
										Phone Number
									</FieldLabel>
									<Input
										{...field}
										id="form-rhf-demo-title"
										aria-invalid={fieldState.invalid}
										placeholder=""
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type="submit" form="form-rhf-demo">
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
