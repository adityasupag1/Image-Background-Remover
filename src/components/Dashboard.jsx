import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User, Download, Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Add this line
import ComparePreview from "./ComparePreview";
import logo from "../assets/logo.svg";
import Footer from "./Footer"


const Dashboard = () => {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const [savedImages, setSavedImages] = useState([]);

	useEffect(() => {
		// Load saved images from localStorage (in production, this would be from Firestore)
		const saved = localStorage.getItem(
			`savedImages_${currentUser?.uid}`
		);
		if (saved) {
			setSavedImages(JSON.parse(saved));
		}
	}, [currentUser]);

	const handleLogout = async () => {
		try {
			navigate("/", { replace: true });

			// Small delay to ensure navigation completes before logout
			setTimeout(async () => {
				await logout();
			}, 100);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const saveImage = (originalImage, processedImage) => {
		const newImage = {
			id: Date.now(),
			original: originalImage,
			processed: processedImage,
			timestamp: new Date().toISOString(),
		};

		const updatedImages = [...savedImages, newImage];
		setSavedImages(updatedImages);
		localStorage.setItem(
			`savedImages_${currentUser?.uid}`,
			JSON.stringify(updatedImages)
		);
	};

	const deleteImage = (id) => {
		const updatedImages = savedImages.filter(
			(img) => img.id !== id
		);
		setSavedImages(updatedImages);
		localStorage.setItem(
			`savedImages_${currentUser?.uid}`,
			JSON.stringify(updatedImages)
		);
	};

	const downloadImage = (imageUrl, filename) => {
		const link = document.createElement("a");
		link.href = imageUrl;
		link.download = filename || "background-removed.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const displayName = currentUser?.displayName || "User";
	const [firstName, lastName] = displayName.split(" ");

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-x-4">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center gap-3">
							{/* <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-lg"></div> */}
							<img
								src={logo}
								alt="logo"
							/>
						</div>

						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 max-sm:hidden">
								<User className="w-5 h-5 text-gray-600" />
								<span className="text-gray-700">
									{
										firstName
									}{" "}
									{
										lastName
									}
								</span>
							</div>
							<button
								onClick={
									handleLogout
								}
								className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<LogOut className="w-4 h-4" />
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>
      
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Upload Section */}
				<div className="mb-12">
					<ComparePreview
						onImageSaved={saveImage}
					/>
				</div>

				{/* Saved Images Section */}
				{savedImages.length > 0 && (
					<div className="bg-white rounded-xl shadow-lg p-6">
						<h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
							<Upload className="w-6 h-6 text-violet-600" />
							Your Saved Images (
							{savedImages.length})
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{savedImages.map(
								(image) => (
									<div
										key={
											image.id
										}
										className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
									>
										<div className="grid grid-cols-2 gap-2 mb-4">
											<div>
												<p className="text-xs text-gray-500 mb-1">
													Original
												</p>
												<img
													src={
														image.original
													}
													alt="Original"
													className="w-full h-24 object-cover rounded border"
												/>
											</div>
											<div>
												<p className="text-xs text-gray-500 mb-1">
													Processed
												</p>
												<div
													className="w-full h-24 rounded border"
													style={{
														backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='%23f3f4f6' fill-opacity='1' fill-rule='evenodd'%3e%3cpath d='m0 0h10v10h-10z'/%3e%3c/g%3e%3c/svg%3e")`,
														backgroundSize:
															"20px 20px",
													}}
												>
													<img
														src={
															image.processed
														}
														alt="Processed"
														className="w-full h-full object-contain"
													/>
												</div>
											</div>
										</div>

										<div className="flex justify-between items-center">
											<p className="text-xs text-gray-500">
												{new Date(
													image.timestamp
												).toLocaleDateString()}
											</p>
											<div className="flex gap-2">
												<button
													onClick={() =>
														downloadImage(
															image.processed,
															`background-removed-${image.id}.png`
														)
													}
													className="p-2 text-violet-600 hover:bg-violet-100 rounded-lg transition-colors"
													title="Download"
												>
													<Download className="w-4 h-4" />
												</button>
												<button
													onClick={() =>
														deleteImage(
															image.id
														)
													}
													className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
													title="Delete"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>
		  <Footer/>
		</div>
	);
};

export default Dashboard;
