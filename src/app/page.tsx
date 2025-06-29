"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Zap,
  Brain,
  BarChart3,
  Settings,
  ArrowRight,
  Sparkles,
  Database,
  Cpu,
  Target,
} from "lucide-react";

import Link from "next/link";

// MagicUI Components
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Particles } from "@/components/magicui/particles";
import { WordRotate } from "@/components/magicui/word-rotate";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Meteors } from "@/components/magicui/meteors";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { useRef } from "react";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Intelligence",
      description:
        "Advanced machine learning algorithms optimize resource allocation with unprecedented accuracy.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Real-time Analytics",
      description:
        "Monitor and analyze resource utilization patterns with live dashboard insights.",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Smart Configuration",
      description:
        "Automated configuration management that adapts to your changing business needs.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision Targeting",
      description:
        "Allocate resources exactly where they're needed most for maximum efficiency.",
    },
  ];

  const stats = [
    { label: "Efficiency Increase", value: 95, suffix: "%" },
    { label: "Cost Reduction", value: 40, suffix: "%" },
    { label: "Processing Speed", value: 10, suffix: "x" },
    { label: "Accuracy Rate", value: 99, suffix: "%" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Particles Background for Dark Mode */}
      {theme === "dark" && (
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
      )}

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between p-6 border-b border-border/40">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Zap className="h-8 w-8 text-primary" />
            {theme === "dark" && (
              <BorderBeam size={40} duration={12} delay={9} />
            )}
          </div>
          <SparklesText
            className="text-xl font-bold"
            sparklesCount={theme === "dark" ? 10 : 0}
          >
            Data Alchemist
          </SparklesText>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="relative"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative z-40 container mx-auto px-6 py-20 text-center">
        {theme === "dark" && <Meteors number={20} />}

        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="mb-4 relative">
            {theme === "dark" && (
              <BorderBeam size={100} duration={12} delay={9} />
            )}
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <Sparkles className="mr-1 size-3 transition-transform duration-300 ease-in-out group-hover:scale-105" />
              <span>✨ Introducing AI-Powered Resource Allocation</span>
            </AnimatedShinyText>
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Transform Your{" "}
              <WordRotate
                className="text-primary"
                words={["Resources", "Operations", "Efficiency", "Business"]}
              />
              <br />
              with AI Magic
            </h1>

            <AnimatedGradientText>
              <span className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto block">
                The ultimate AI-powered configurator that revolutionizes how you
                allocate and manage resources across your organization.
              </span>
            </AnimatedGradientText>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {/* Primary CTA Button - Consistent across themes */}
            <Button 
              size="lg" 
              className="px-8 relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/auth/signup" className="flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
                {theme === "dark" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl" />
                )}
              </Link>
            </Button>

            {/* Secondary Button - Consistent across themes */}
            <Button
              variant="outline"
              size="lg"
              className="px-8 relative overflow-hidden border-2 border-primary/30 hover:border-primary/60 bg-background/50 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/auth/signin" className="flex items-center">
                {theme === "dark" ? "Login" : "Login"}
                {theme === "dark" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Animated Beam Visualization */}
        <div className="relative mt-20 max-w-4xl mx-auto" ref={containerRef}>
          <div className="grid grid-cols-5 gap-8 items-center">
            <div ref={div1Ref} className="flex justify-center">
              <Card className="p-4 relative">
                {theme === "dark" && <BorderBeam size={100} duration={12} />}
                <Database className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm mt-2 text-center">Data Sources</p>
              </Card>
            </div>

            <div ref={div2Ref} className="flex justify-center">
              <Card className="p-4 relative">
                {theme === "dark" && <BorderBeam size={100} duration={12} />}
                <Brain className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm mt-2 text-center">AI Engine</p>
              </Card>
            </div>

            <div ref={div3Ref} className="flex justify-center">
              <Card className="p-6 bg-primary/10 relative">
                {theme === "dark" && <BorderBeam size={120} duration={12} />}
                <Cpu className="h-10 w-10 text-primary mx-auto" />
                <p className="text-sm mt-2 text-center font-semibold">
                  Data Alchemist
                </p>
              </Card>
            </div>

            <div ref={div4Ref} className="flex justify-center">
              <Card className="p-4 relative">
                {theme === "dark" && <BorderBeam size={100} duration={12} />}
                <BarChart3 className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm mt-2 text-center">Analytics</p>
              </Card>
            </div>

            <div ref={div5Ref} className="flex justify-center">
              <Card className="p-4 relative">
                {theme === "dark" && <BorderBeam size={100} duration={12} />}
                <Target className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm mt-2 text-center">Optimization</p>
              </Card>
            </div>
          </div>

          {/* Animated Beams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div3Ref}
            curvature={-20}
            endYOffset={-10}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div3Ref}
            curvature={20}
            endYOffset={10}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            curvature={-20}
            endYOffset={-10}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div5Ref}
            curvature={20}
            endYOffset={10}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-40 py-20 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <NumberTicker value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-40 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for{" "}
              <SparklesText
                className="text-primary"
                sparklesCount={theme === "dark" ? 8 : 0}
              >
                Smart Allocation
              </SparklesText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-powered platform transforms resource
              management with cutting-edge technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow relative group"
              >
                {theme === "dark" && (
                  <BorderBeam
                    size={200}
                    duration={12}
                    delay={index * 3}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
                <CardContent className="p-0">
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-40 border-t border-border/40 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-semibold">Data Alchemist</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Data Alchemist. All rights reserved. Designed by Virender
              Prasad 💖
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}