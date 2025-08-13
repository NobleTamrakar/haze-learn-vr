import { useStore } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Clock, Target, TrendingUp, Headset, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import topics from "@/data/topics.json";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, progress, currentTopic, isVRMode, toggleVRMode } = useStore();
  
  if (!user || !user.onboardingCompleted) {
    navigate("/onboarding");
    return null;
  }

  const completedTopics = progress.filter(p => p.completedSteps.length >= 5).length;
  const totalStudyTime = progress.reduce((acc, p) => acc + (p.timeSpent || 0), 0);
  const averageAccuracy = progress.reduce((acc, p) => acc + (p.accuracy || 0), 0) / (progress.length || 1);

  const subjectData = topics.reduce((acc, topic) => {
    const topicProgress = progress.find(p => p.topicId === topic.id);
    const existingSubject = acc.find(s => s.subject === topic.subject);
    
    if (existingSubject) {
      existingSubject.completed += topicProgress?.completedSteps.length >= 5 ? 1 : 0;
      existingSubject.total += 1;
    } else {
      acc.push({
        subject: topic.subject,
        completed: topicProgress?.completedSteps.length >= 5 ? 1 : 0,
        total: 1
      });
    }
    return acc;
  }, [] as Array<{ subject: string; completed: number; total: number }>);

  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 3.2 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.0 }
  ];

  const pieData = subjectData.map(s => ({
    name: s.subject,
    value: s.completed,
    total: s.total
  }));

  const COLORS = ['#7C659C', '#A191C1', '#8D78AF', '#675582'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card-bg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">NEET AI VR Tutor</h1>
                <p className="text-sm text-muted-foreground">Dashboard Overview</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleVRMode}
                className={isVRMode ? "bg-primary text-primary-foreground" : ""}
              >
                <Headset className="h-4 w-4 mr-2" />
                {isVRMode ? "Exit VR" : "VR Mode"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Welcome back, {user.name}!</h2>
            <p className="text-muted-foreground">Here's your learning progress and performance insights.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-bg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Topics Completed</p>
                    <p className="text-2xl font-bold">{completedTopics}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-bg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Clock className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Study Time</p>
                    <p className="text-2xl font-bold">{Math.round(totalStudyTime)}h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-bg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
                    <p className="text-2xl font-bold">{Math.round(averageAccuracy)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-bg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Streak</p>
                    <p className="text-2xl font-bold">7 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-bg">
              <CardHeader>
                <CardTitle>Weekly Study Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#7C659C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-bg">
              <CardHeader>
                <CardTitle>Subject Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, total }) => `${name}: ${value}/${total}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Current Topic & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-bg">
              <CardHeader>
                <CardTitle>Current Topic</CardTitle>
              </CardHeader>
              <CardContent>
                {currentTopic ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{topics.find(t => t.id === currentTopic)?.name}</h3>
                      <Badge variant="outline">{topics.find(t => t.id === currentTopic)?.difficulty}</Badge>
                    </div>
                    <Progress 
                      value={((progress.find(p => p.topicId === currentTopic)?.completedSteps.length || 0) / 5) * 100} 
                      className="h-2" 
                    />
                    <Button onClick={() => navigate("/learn")} className="w-full hero-gradient">
                      Continue Learning
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">No active topic. Complete onboarding to get started.</p>
                    <Button onClick={() => navigate("/onboarding")} variant="outline">
                      Start Onboarding
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="card-bg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/vr/preview")}
                >
                  <Headset className="h-4 w-4 mr-2" />
                  Open VR Experience
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/learn")}
                  disabled={!currentTopic}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Resume Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;