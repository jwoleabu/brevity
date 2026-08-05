import { db } from "@/lib/db";

async function init() {
	const params = new URLSearchParams(location.search);
	const id = params.get("id");
	if (!id) {
		document.body.textContent = "No file specified.";
		return;
	}

	const record = await db.uploads.get(id);
	if (!record) {
		document.body.textContent = "File not found.";
		return;
	}

	const url = URL.createObjectURL(record.blob);

	const iframe = document.createElement("iframe");
	iframe.src = url;
	iframe.style.cssText =
		"position:fixed; inset:0; width:100%; height:100%; border:none;";
	document.body.appendChild(iframe);

	window.addEventListener("pagehide", () => URL.revokeObjectURL(url));
}

init();
