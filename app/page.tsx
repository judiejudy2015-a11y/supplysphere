"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { useGSAPAnimations, addHoverAnimations } from "@/lib/animations";
import {
  Shield,
  Zap,
  Globe,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Blocks,
  Scan,
  Users,
  TrendingUp,
} from "lucide-react";

export default function LandingPage() {
  const { isAuthenticated } = useAuthRedirect();
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAPAnimations();

  useEffect(() => {
    addHoverAnimations();
  }, []);

  if (isAuthenticated) {
    return null; // Will redirect via useAuthRedirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="navbar border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Blocks className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                SupplySphere
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="btn-hover">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="btn-hover">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-20 sm:py-32 mt-16"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 hero-animate" variant="outline">
              <Zap className="mr-1 h-3 w-3" />
              Blockchain-Powered Traceability
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground hero-animate sm:text-6xl">
              Supply Chain
              <span className="text-primary"> Transparency</span>
              <br />
              You Can Trust
            </h1>
            <p className="mb-8 text-lg text-muted-foreground hero-animate sm:text-xl">
              Because what you eat & take should always be trusted. Track every
              step of your supply chain with blockchain-verified authenticity
              and real-time visibility.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center hero-animate">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto btn-hover">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent btn-hover"
                >
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="floating-bg absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="floating-bg absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/10 blur-2xl" />
          <div className="floating-bg absolute right-1/4 bottom-1/4 h-[300px] w-[300px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent/10 blur-xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground hero-animate sm:text-4xl">
              Complete Supply Chain Visibility
            </h2>
            <p className="mt-4 text-lg text-muted-foreground hero-animate">
              From farm to table, factory to shelf - track every step with
              blockchain precision
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Blockchain Security",
                description:
                  "Immutable records ensure data integrity and prevent tampering",
              },
              {
                icon: Scan,
                title: "QR Code Tracking",
                description:
                  "Instant product verification with simple QR code scanning",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description:
                  "Monitor performance metrics and identify bottlenecks instantly",
              },
              {
                icon: Users,
                title: "Multi-role Access",
                description:
                  "Tailored dashboards for suppliers, vendors, analysts, and admins",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="feature-card card-hover border-border/50 hover:border-primary/20 transition-colors"
              >
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="problem-solution-section py-20 sm:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Problem */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 problem-solution-item">
                The Problem
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 problem-solution-item">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Lack of transparency:
                    </strong>{" "}
                    Consumers can't verify product authenticity or origin
                  </p>
                </div>
                <div className="flex items-start gap-3 problem-solution-item">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Supply chain complexity:
                    </strong>{" "}
                    Multiple stakeholders with fragmented data
                  </p>
                </div>
                <div className="flex items-start gap-3 problem-solution-item">
                  <div className="h-2 w-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Fraud and counterfeiting:
                    </strong>{" "}
                    Billions lost annually to fake products
                  </p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 problem-solution-item">
                Our Solution
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 problem-solution-item">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Blockchain verification:
                    </strong>{" "}
                    Immutable proof of authenticity and origin
                  </p>
                </div>
                <div className="flex items-start gap-3 problem-solution-item">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Unified platform:
                    </strong>{" "}
                    All stakeholders connected in one ecosystem
                  </p>
                </div>
                <div className="flex items-start gap-3 problem-solution-item">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">
                      Real-time tracking:
                    </strong>{" "}
                    End-to-end visibility from source to consumer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
              { number: "50M+", label: "Products Tracked", icon: Scan },
              { number: "10K+", label: "Active Users", icon: Users },
              { number: "150+", label: "Countries Served", icon: Globe },
            ].map((stat, index) => (
              <div key={index} className="text-center feature-card">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground stat-number">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center hero-animate">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of companies already using SupplySphere to build
              trust and transparency
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto btn-hover">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent btn-hover"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Blocks className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">
                SupplySphere
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 SupplySphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
