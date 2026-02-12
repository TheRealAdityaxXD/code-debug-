import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bug, Zap, Terminal, ChevronRight, Code2, Trophy, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Code2, title: "Real C Code", desc: "Debug actual C programs with real compiler errors" },
  { icon: Brain, title: "3 Difficulty Levels", desc: "From syntax fixes to memory management bugs" },
  { icon: Trophy, title: "Score & Compete", desc: "Earn points based on speed and accuracy" },
  { icon: Zap, title: "Instant Feedback", desc: "See errors, hints, and expected output live" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2">
            <Bug className="w-6 h-6 text-primary" />
            <span className="font-mono font-bold text-lg text-foreground">
              C<span className="text-primary">Debug</span>
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => navigate("/select")}
          >
            Start <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        {/* Grid bg */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(200 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(200 100% 50%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-neon-cyan/5 blur-[100px]" />

        <motion.div
          className="relative z-10 text-center max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">Master C Debugging</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Find the </span>
            <span className="text-primary text-glow">Bug</span>
            <span className="text-foreground">,</span>
            <br />
            <span className="text-foreground">Fix the </span>
            <span className="text-accent text-glow-green">Code</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Sharpen your C programming skills by debugging real code.
            From missing semicolons to memory leaks — level up one bug at a time.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-neon)] px-8 text-base font-semibold"
              onClick={() => navigate("/select")}
            >
              <Bug className="w-5 h-5 mr-2" />
              Start Debugging
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary px-8 text-base"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating code snippet */}
        <motion.div
          className="absolute bottom-12 right-8 hidden lg:block code-bg rounded-lg p-4 border border-border/50 opacity-40 text-sm"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <pre className="text-muted-foreground">
            <span className="text-primary">printf</span>
            <span className="text-foreground">(</span>
            <span className="text-accent">"Hello"</span>
            <span className="text-destructive"> // ← missing ;</span>
          </pre>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why <span className="text-primary">CDebug</span>?
            </h2>
            <div className="neon-line w-24 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <f.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-primary" />
            <span className="font-mono">CDebug</span>
          </div>
          <span>Built for developers who love C</span>
        </div>
      </footer>
    </div>
  );
}
