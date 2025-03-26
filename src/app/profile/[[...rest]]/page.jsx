"use client";

import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F9E9EC] to-[#F9E9EC]/80 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#577590] mb-8">Your Profile</h1>
                <div >
                    <UserProfile
                        routing="hash"
                        appearance={{
                            elements: {
                                rootBox: "mx-auto",
                                navbar: "hidden",
                                headerTitle: "text-2xl font-bold text-[#577590]",
                                headerSubtitle: "text-gray-500",
                                profileSection: "border-b border-gray-200 py-6",
                                profileSectionTitle: "font-semibold text-[#577590]",
                                formButtonPrimary: "bg-[#F2A541] hover:bg-[#F08A4B] text-white transition-colors",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;