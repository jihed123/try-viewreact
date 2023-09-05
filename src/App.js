import "./App.css";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Mirador from "./Miradorclass";

function App() {
	const [uuid, setUUID] = useState("");
	const [iiifurl, setiiifurl] = useState("");
	const [manifestlink, setManifestLink] = useState(
		"https://wellcomelibrary.org/iiif/b18035723/manifest"
	);
	const [miradorConfig, setMiradorConfig] = useState({
		id: "mirador", // Unique ID for the Mirador instance
		windows: [
			{
				manifestId: manifestlink, // IIIF Manifest URL
				canvasIndex: 0,
				thumbnailNavigationPosition: "far-right",
				view: "single",
				sidePanelWidth: 200,
			},
		],
		workspace: {
			type: "mosaic",
			displayLayout: false,
		},
	});

	const fetchData = () => {
		Axios.get(
			`https://sv4ez2xiwe.execute-api.ca-central-1.amazonaws.com/dev/asset?app=dev&type=IO&uuid=${uuid}`
		).then((res) => {
			// setiiifurl(res.data);
			setMiradorConfig(res.data["API-Response"]["IIIF-Manifest-URL"]);
		});
	};

	// useEffect(() => {
	// 	console.log("setlink");
	// 	const miradorlink1 = "https://www.e-rara.ch/i3f/v20/6069569/manifest";
	// 	setManifestLink(miradorlink1);
	// }, []);

	// let manifestlink = iiifurl
	// 	? iiifurl["API-Response"]["IIIF-Manifest-URL"]
	// 	: "";

	// manifestlink =
	// 	// "https://dt4z9myfouedo.cloudfront.net/c2aa4f10-1f4d-4bcd-93f0-9e0e5a90cd5e/manifest.json";
	// 	"https://wellcomelibrary.org/iiif/b18035723/manifest";
	// manifestlink = manifestlink;
	const [miradorKey, setMiradorKey] = useState(0);

	// Function to update the key when the configuration changes
	const updateMiradorKey = () => {
		setMiradorKey((prevKey) => prevKey + 1);
	};
	useEffect(() => {
		function MiradorViewer() {
			let newMiradorConfig = {
				id: "mirador", // Unique ID for the Mirador instance
				windows: [
					{
						manifestId: manifestlink, // IIIF Manifest URL
						canvasIndex: 0,
						thumbnailNavigationPosition: "far-right",
						view: "single",
						sidePanelWidth: 200,
					},
				],
				workspace: {
					type: "mosaic",
					displayLayout: false,
				},
			};
			console.log("setMiradorConfig");
			console.log(newMiradorConfig);
			setMiradorConfig(newMiradorConfig);
			updateMiradorKey();
		}
		MiradorViewer();
	}, [manifestlink]);

	return (
		<div className="App">
			<h1>PyPreservica API Test App</h1>
			<input
				placeholder="Enter UUID"
				onChange={(event) => {
					setUUID(event.target.value);
				}}
			/>

			<button onClick={fetchData}>Get Data</button>
			<div>
				<h3>Manifest Link: {manifestlink}</h3>
			</div>
			<button
				onClick={() => {
					setManifestLink("https://www.e-rara.ch/i3f/v20/6069569/manifest");
				}}>
				set link
			</button>
			<div className="Miraclass">
				<Mirador
					key={miradorKey}
					config={miradorConfig}
					plugins={[]}
				/>
			</div>
		</div>
	);
}

export default App;
