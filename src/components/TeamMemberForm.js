import React, { useState } from "react";
import { User, Github, Linkedin, Globe, Upload, Check, X } from "lucide-react";

const TeamMemberForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    teamName: "",
    roleTag: "",
    githubProfile: "",
    linkedinProfile: "",
    personalWebsite: "",
    profilePicture: null,
    profilePicturePreview: null,
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const predefinedTeams = [
    "Frontend Team",
    "Backend Team",
    "Mobile Team",
    "DevOps Team",
    "Design Team",
    "Data Team",
  ];

  const predefinedRoles = [
    "Developer",
    "Senior Developer",
    "Lead Developer",
    "Designer",
    "UI/UX Designer",
    "Product Manager",
    "DevOps Engineer",
    "Data Scientist",
  ];

  const generateUserId = () => {
    return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
          profilePicturePreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.teamName ||
      !formData.roleTag ||
      !formData.githubProfile ||
      !formData.linkedinProfile
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMember = {
      id: generateUserId(),
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    // Log the JSON data (simulate API POST)
    console.log(
      "Submitting team member data:",
      JSON.stringify(newMember, null, 2)
    );

    // Add to team members list
    setTeamMembers((prev) => [...prev, newMember]);

    // Reset form
    setFormData({
      fullName: "",
      teamName: "",
      roleTag: "",
      githubProfile: "",
      linkedinProfile: "",
      personalWebsite: "",
      profilePicture: null,
      profilePicturePreview: null,
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const MemberCard = ({ member }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {member.profilePicturePreview ? (
            <img
              src={member.profilePicturePreview}
              alt={member.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {member.fullName}
            </h3>
            <span className="text-xs text-gray-500 font-mono">{member.id}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {member.teamName}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {member.roleTag}
            </span>
          </div>

          <div className="flex space-x-3">
            {member.githubProfile && (
              <a
                href={
                  member.githubProfile.startsWith("http")
                    ? member.githubProfile
                    : `https://${member.githubProfile}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {member.linkedinProfile && (
              <a
                href={
                  member.linkedinProfile.startsWith("http")
                    ? member.linkedinProfile
                    : `https://${member.linkedinProfile}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {member.personalWebsite && (
              <a
                href={
                  member.personalWebsite.startsWith("http")
                    ? member.personalWebsite
                    : `https://${member.personalWebsite}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Team Member
          </h1>
          <p className="text-gray-600">
            Submit new coding club team member information
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800">
              Team member added successfully!
            </span>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {formData.profilePicturePreview ? (
                  <img
                    src={formData.profilePicturePreview}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-100">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">Upload profile picture</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>

              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  required
                  list="teams"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Select or enter team name"
                />
                <datalist id="teams">
                  {predefinedTeams.map((team) => (
                    <option key={team} value={team} />
                  ))}
                </datalist>
              </div>

              {/* Role Tag */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <input
                  type="text"
                  name="roleTag"
                  value={formData.roleTag}
                  onChange={handleInputChange}
                  required
                  list="roles"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Select or enter role"
                />
                <datalist id="roles">
                  {predefinedRoles.map((role) => (
                    <option key={role} value={role} />
                  ))}
                </datalist>
              </div>

              {/* GitHub Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Profile *
                </label>
                <input
                  type="url"
                  name="githubProfile"
                  value={formData.githubProfile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username"
                />
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile *
                </label>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              {/* Personal Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Website
                </label>
                <input
                  type="url"
                  name="personalWebsite"
                  value={formData.personalWebsite}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com (optional)"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Adding Member..." : "Add Team Member"}
              </button>
            </div>
          </div>
        </div>

        {/* Team Members Display */}
        {teamMembers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Team Members ({teamMembers.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export the submit function for backend integration
export const submitTeamMember = async (memberData) => {
  try {
    // This function can be replaced with actual API call
    const response = await fetch("/api/team-members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit team member");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting team member:", error);
    throw error;
  }
};

export default TeamMemberForm;
