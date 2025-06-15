"use client";

import type React from "react";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Lightbulb, Hash, MessageSquare, Zap } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { generateIdea } from "@/lib/api";

interface ContentIdea {
  reelIdea: string;
  caption: string;
  hashtags: string[];
  hook: string;
}

const niches = [
  "fitness",
  "fashion",
  "finance",
  "food",
  "travel",
  "technology",
  "lifestyle",
  "beauty",
  "business",
  "education",
];

export default function IdeaAssistantPage() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contentIdea, setContentIdea] = useState<ContentIdea | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { token } = useAuth();

  const generateContentIdea = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic || !niche) {
      toast({
        title: "Missing information",
        description: "Please fill in both topic and niche",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError("");
    setContentIdea(null);

    try {
      if (!token) {
        throw new Error("Authentication token is missing");
      }
      const data = await generateIdea({ topic, niche }, token);
      
      if (data.reelIdea) {
        setContentIdea(data);
        toast({
          title: "Content idea generated!",
          description: "Your AI-powered content suggestion is ready",
        });
      } else {
        throw new Error(data.error || "Failed to generate content idea");
      }
    } catch (err : unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      toast({
        title: "Generation failed",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Idea Assistant
          </h1>
          <p className="text-gray-600">
            Generate AI-powered content ideas for your social media
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <span>Generate Content Idea</span>
              </CardTitle>
              <CardDescription>
                Enter your topic and niche to get personalized content
                suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={generateContentIdea} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Morning workout routine, Budget meal prep, etc."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niche">Niche</Label>
                  <Select value={niche} onValueChange={setNiche} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {niches.map((n) => (
                        <SelectItem key={n} value={n}>
                          {n.charAt(0).toUpperCase() + n.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Generating..." : "Generate Content Idea"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {isLoading && (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                    <p className="text-gray-600">
                      Generating your content idea...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="border-red-200">
                <CardContent className="py-6">
                  <div className="text-center text-red-600">
                    <p>{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {contentIdea && (
              <div className="space-y-4">
                {/* Reel Idea */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Zap className="h-5 w-5 text-purple-500" />
                      <span>Reel Idea</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {contentIdea.reelIdea}
                    </p>
                  </CardContent>
                </Card>

                {/* Hook */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      <span>Hook/First Line</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 font-medium">
                      {contentIdea.hook}
                    </p>
                  </CardContent>
                </Card>

                {/* Caption */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                      <span>Caption</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                      {contentIdea.caption}
                    </pre>
                  </CardContent>
                </Card>

                {/* Hashtags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Hash className="h-5 w-5 text-pink-500" />
                      <span>Hashtags</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {contentIdea.hashtags.map((hashtag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {hashtag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
