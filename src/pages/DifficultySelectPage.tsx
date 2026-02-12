import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bug, ArrowLeft, Zap, Flame, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQuestionsByDifficulty } from "@/data/questions";

const levels = [
  {
    key: "easy" as const,
    label: "Easy",
    icon: Zap,
    color: "text-accent",
    borderColor: "hover:border-accent/40",
    bgGlow: "bg-accent/5",
    desc: "Syntax errors, missing headers, and simple fixes. Perfect for beginners.",
  },
  {
    key: "medium" as const,
    label: "Medium",
    icon: Flame,
    color: "text-neon-orange",
    borderColor: "hover:border-neon-orange/40",
    bgGlow: "bg-neon-orange/5",
    desc: "Pointer bugs, memory leaks, and logic errors. Test your intermediate skills.",
  },
  {
    key: "hard" as const,
    label: "Hard",
    icon: Skull,
    color: "text-destructive",
    borderColor: "hover:border-destructive/40",
    bgGlow: "bg-destructive/5",
    desc: "Buffer overflows, dangling pointers, and subtle UB. Only for the brave.",
  },
];

export default function DifficultySelectPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Choose Your <span className="text-primary text-glow">Level</span>
          </h1>
          <p className="text-muted-foreground">Select a difficulty to start debugging C programs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level, i) => {
            const count = getQuestionsByDifficulty(level.key).length;
            return (
              <motion.div
                key={level.key}
                className={`relative group rounded-xl bg-card border border-border ${level.borderColor} transition-all duration-300 overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div className={`absolute inset-0 ${level.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative p-8 flex flex-col items-center text-center">
                  <level.icon className={`w-12 h-12 ${level.color} mb-4`} />
                  <h2 className={`text-2xl font-bold ${level.color} mb-2`}>{level.label}</h2>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{level.desc}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
                    <Bug className="w-4 h-4" />
                    <span>{count} questions</span>
                  </div>
                  <Button
                    className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => navigate(`/debug/${level.key}`)}
                  >
                    Start
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
