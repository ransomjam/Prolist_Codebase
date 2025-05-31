import { User, Shield, Star, Heart, Settings, Bell, CreditCard, LogOut } from "lucide-react";
import Button from "../components/Button";

export default function Profile() {
  const userStats = [
    { label: "Favorite Markets", value: "3", icon: Heart },
    { label: "Reviews Written", value: "12", icon: Star },
    { label: "Active Bids", value: "2", icon: Shield },
    { label: "Properties Saved", value: "5", icon: Heart }
  ];

  const recentActivity = [
    { type: "review", text: "Reviewed Main Market Bamenda", date: "2 days ago", rating: 5 },
    { type: "bid", text: "Placed bid on Traditional Art Collection", date: "3 days ago", amount: "₦125,000" },
    { type: "save", text: "Saved 3BR House - Ntarikon", date: "1 week ago" },
    { type: "review", text: "Reviewed Nkwen Craft Market", date: "2 weeks ago", rating: 4 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">User Profile</h1>
        <p className="text-gray-600 text-lg">Manage your account and preferences</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-neonBlue to-primary rounded-full flex items-center justify-center">
            <User className="text-white" size={40} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-primary">John Doe</h2>
              <div className="flex items-center gap-2">
                <Shield className="text-emerald" size={20} />
                <span className="bg-emerald text-white text-sm px-3 py-1 rounded-full">Verified</span>
              </div>
            </div>
            <p className="text-gray-600 mb-3">Member since January 2024</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="text-neonYellow fill-current" size={16} />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">Trust Score</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-emerald">12</span>
                <span className="text-gray-500">Reviews</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="mr-2" size={16} />
              Edit Profile
            </Button>
            <Button variant="primary" size="sm">
              <Shield className="mr-2" size={16} />
              Verify Account
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Account Statistics</h3>
            <div className="space-y-4">
              {userStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="text-neonBlue" size={20} />
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-primary">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Bell className="text-neonBlue" size={20} />
                <span className="text-gray-700">Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <CreditCard className="text-emerald" size={20} />
                <span className="text-gray-700">Payment Methods</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="text-gray-600" size={20} />
                <span className="text-gray-700">Account Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600">
                <LogOut className="text-red-600" size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'review' ? 'bg-neonYellow bg-opacity-20' :
                    activity.type === 'bid' ? 'bg-emerald bg-opacity-20' :
                    'bg-neonBlue bg-opacity-20'
                  }`}>
                    {activity.type === 'review' && <Star className="text-neonYellow" size={16} />}
                    {activity.type === 'bid' && <Shield className="text-emerald" size={16} />}
                    {activity.type === 'save' && <Heart className="text-neonBlue" size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{activity.text}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500">{activity.date}</span>
                      {activity.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: activity.rating }).map((_, i) => (
                            <Star key={i} className="text-neonYellow fill-current" size={12} />
                          ))}
                        </div>
                      )}
                      {activity.amount && (
                        <span className="text-sm font-semibold text-emerald">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">
                View All Activity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
