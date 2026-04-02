import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Switch } from '../../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { User, Camera, Save, Mail, Phone, MapPin, Star, Settings } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ArtisanSettingsProps {
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

export function ArtisanSettings({ artisan }: ArtisanSettingsProps) {
  const [profileData, setProfileData] = useState({
    name: artisan.name,
    email: artisan.email,
    phone: artisan.phone,
    location: artisan.location,
    craft: artisan.craft,
    experience: artisan.experience.toString(),
    bio: 'Master artisan specializing in traditional crafts with over 15 years of experience.',
    story: 'I learned the art of traditional crafting from my grandfather...',
    specialities: ['Handweaving', 'Natural Dyes', 'Traditional Patterns'],
    languages: ['Hindi', 'English', 'Regional Language'],
    workshopAddress: '123 Artisan Street, Old City, Varanasi',
    businessHours: '9:00 AM - 6:00 PM',
    customOrdersEnabled: true,
    internationalShipping: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    messages: true,
    reviews: true,
    promotions: false,
    weeklyReports: true
  });

  const saveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const saveNotifications = () => {
    toast.success('Notification settings updated!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and business information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={artisan.avatar} alt={artisan.name} />
                  <AvatarFallback className="bg-amber-600 text-white text-xl">
                    {artisan.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG. Max 2MB
                  </p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="craft">Primary Craft</Label>
                  <Select value={profileData.craft} onValueChange={(value) => setProfileData(prev => ({ ...prev, craft: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Textiles">Textiles & Weaving</SelectItem>
                      <SelectItem value="Pottery">Pottery & Ceramics</SelectItem>
                      <SelectItem value="Jewelry">Jewelry Making</SelectItem>
                      <SelectItem value="Woodwork">Woodwork</SelectItem>
                      <SelectItem value="Metalwork">Metalwork</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, State"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Brief description about yourself"
                  className="h-24"
                />
              </div>

              <Button onClick={saveProfile} className="w-full bg-amber-600 hover:bg-amber-700">
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Business Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Business Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="workshop">Workshop Address</Label>
                <Textarea
                  id="workshop"
                  value={profileData.workshopAddress}
                  onChange={(e) => setProfileData(prev => ({ ...prev, workshopAddress: e.target.value }))}
                  className="h-20"
                />
              </div>

              <div>
                <Label htmlFor="hours">Business Hours</Label>
                <Input
                  id="hours"
                  value={profileData.businessHours}
                  onChange={(e) => setProfileData(prev => ({ ...prev, businessHours: e.target.value }))}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Accept Custom Orders</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to request custom products</p>
                  </div>
                  <Switch
                    checked={profileData.customOrdersEnabled}
                    onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, customOrdersEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>International Shipping</Label>
                    <p className="text-sm text-muted-foreground">Ship products internationally</p>
                  </div>
                  <Switch
                    checked={profileData.internationalShipping}
                    onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, internationalShipping: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Artisan Story */}
          <Card>
            <CardHeader>
              <CardTitle>Your Artisan Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="story">Craft Heritage & Journey</Label>
                <Textarea
                  id="story"
                  value={profileData.story}
                  onChange={(e) => setProfileData(prev => ({ ...prev, story: e.target.value }))}
                  placeholder="Share your journey, techniques, and cultural heritage..."
                  className="h-32"
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={profileData.experience}
                  onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'newOrders', label: 'New Orders', description: 'Get notified when you receive new orders' },
                { key: 'messages', label: 'Customer Messages', description: 'Notifications for customer inquiries' },
                { key: 'reviews', label: 'New Reviews', description: 'Get notified about new product reviews' },
                { key: 'promotions', label: 'Promotional Updates', description: 'Marketing tips and promotional opportunities' },
                { key: 'weeklyReports', label: 'Weekly Reports', description: 'Weekly performance and analytics reports' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between">
                  <div>
                    <Label>{setting.label}</Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch
                    checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, [setting.key]: checked }))
                    }
                  />
                </div>
              ))}

              <Button onClick={saveNotifications} className="w-full" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Member Since</span>
                  <span className="font-medium">January 2023</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{artisan.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Profile Views</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Rate</span>
                  <span className="font-medium">98%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}