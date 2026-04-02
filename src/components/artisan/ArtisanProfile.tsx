import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Camera, MapPin, Phone, Mail, Globe, Star, Award, Calendar, Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ArtisanProfileProps {
  artisan: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    location: string;
    craft: string;
    experience: number;
    rating: number;
  };
}

export function ArtisanProfile({ artisan }: ArtisanProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: artisan.name,
    email: artisan.email,
    phone: artisan.phone,
    location: artisan.location,
    craft: artisan.craft,
    bio: "Master craftsperson specializing in traditional handwoven textiles. Preserving ancient techniques passed down through generations while creating contemporary designs.",
    website: "www.artisan-portfolio.com",
    specializations: ["Handwoven Silk", "Traditional Patterns", "Natural Dyes", "Block Printing"],
    achievements: [
      "National Handicrafts Award 2022",
      "UNESCO Craft Excellence Recognition",
      "Featured in Vogue India",
      "Export Excellence Award"
    ]
  });

  const handleSave = () => {
    // Here you would typically save to backend
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setProfileData({
      name: artisan.name,
      email: artisan.email,
      phone: artisan.phone,
      location: artisan.location,
      craft: artisan.craft,
      bio: "Master craftsperson specializing in traditional handwoven textiles. Preserving ancient techniques passed down through generations while creating contemporary designs.",
      website: "www.artisan-portfolio.com",
      specializations: ["Handwoven Silk", "Traditional Patterns", "Natural Dyes", "Block Printing"],
      achievements: [
        "National Handicrafts Award 2022",
        "UNESCO Craft Excellence Recognition",
        "Featured in Vogue India",
        "Export Excellence Award"
      ]
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle>Profile Information</CardTitle>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                Verified Artisan
              </Badge>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
          <CardDescription>
            Manage your profile information and showcase your craft heritage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative group">
              <Avatar className="h-24 w-24">
                <AvatarImage src={artisan.avatar} alt={artisan.name} />
                <AvatarFallback className="bg-amber-100 text-amber-800 text-xl">
                  {artisan.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  ) : (
                    <p className="mt-1">{profileData.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="craft">Primary Craft</Label>
                  {isEditing ? (
                    <Input
                      id="craft"
                      value={profileData.craft}
                      onChange={(e) => setProfileData(prev => ({ ...prev, craft: e.target.value }))}
                    />
                  ) : (
                    <p className="mt-1">{profileData.craft}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profileData.location}</span>
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Globe className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profileData.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <Label htmlFor="bio">About Your Craft</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                rows={4}
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell your story, your craft heritage, and what makes your work unique..."
              />
            ) : (
              <p className="mt-1 text-gray-700 dark:text-gray-300">{profileData.bio}</p>
            )}
          </div>

          {/* Experience & Rating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                {artisan.experience}+
              </div>
              <p className="text-sm text-amber-600 dark:text-amber-400">Years Experience</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Star className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {artisan.rating.toFixed(1)}
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Award className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                {profileData.achievements.length}
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">Awards & Recognition</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specializations */}
      <Card>
        <CardHeader>
          <CardTitle>Craft Specializations</CardTitle>
          <CardDescription>Your areas of expertise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profileData.specializations.map((spec, index) => (
              <Badge key={index} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                {spec}
              </Badge>
            ))}
            {isEditing && (
              <Button variant="outline" size="sm" className="h-6">
                + Add Specialization
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Awards & Recognition</CardTitle>
          <CardDescription>Your achievements and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-lg">
                <Award className="h-5 w-5 text-amber-600" />
                <span>{achievement}</span>
              </div>
            ))}
            {isEditing && (
              <Button variant="outline" size="sm">
                + Add Achievement
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}