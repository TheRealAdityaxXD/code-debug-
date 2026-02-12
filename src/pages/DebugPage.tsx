import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Play, Send, Lightbulb, Clock, ChevronRight, Trophy, RotateCcw, CheckCircle2, XCircle, AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQuestionsByDifficulty, DebugQuestion } from "@/data/questions";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

type Status = "editing" | "running" | "correct" | "wrong";

export default function DebugPage() {
  const { difficulty } = useParams<{ difficulty: string }>();
  const navigate = useNavigate();
  const diff = (difficulty || "easy") as "easy" | "medium" | "hard";
  const questions = getQuestionsByDifficulty(diff);

  const [qIndex, setQIndex] = useState(0);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<Status>("editing");
  const [output, setOutput] = useState("");
  const [scores, setScores] = useState<number[]>([]);

  const q: DebugQuestion | undefined = questions[qIndex];

  const initQuestion = useCallback(() => {
    if (!q) return;
    setCode(q.buggyCode);
    setTimeLeft(q.timeLimit);
    setHintsUsed(0);
    setShowHint(false);
    setStatus("editing");
    setOutput("");
  }, [q]);

  useEffect(() => { initQuestion(); }, [initQuestion]);

  // Timer
  useEffect(() => {
    if (status !== "editing" || !q) return;
    if (timeLeft <= 0) {
      setStatus("wrong");
      setOutput("⏱ Time's up!");
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status, timeLeft, q]);

  if (!q) {
    // Results
    const total = scores.reduce((a, b) => a + b, 0);
    const max = questions.length * (diff === "easy" ? 100 : diff === "medium" ? 200 : 300);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div className="text-center max-w-md" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Challenge Complete!</h1>
          <p className="text-muted-foreground mb-6 capitalize">{diff} Difficulty</p>
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="text-5xl font-mono font-bold text-primary mb-2">{total}</div>
            <div className="text-muted-foreground text-sm">out of {max} points</div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate("/select")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Levels
            </Button>
            <Button className="bg-primary text-primary-foreground" onClick={() => { setQIndex(0); setScores([]); }}>
              <RotateCcw className="w-4 h-4 mr-2" /> Retry
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleRun = () => {
    setStatus("running");
    setOutput("");
    setTimeout(() => {
      // Normalize for comparison
      const normalize = (s: string) => s.replace(/\\n/g, "\n").replace(/\s+/g, " ").trim();
      const userNorm = normalize(code);
      const correctNorm = normalize(q.correctCode);

      if (userNorm === correctNorm) {
        setOutput(`✓ Output: ${q.expectedOutput}`);
        setStatus("correct");
      } else {
        setOutput(`✗ Compilation Error:\n${q.errorDescription}\n\nYour code still has bugs. Try again!`);
        setStatus("wrong");
      }
    }, 800);
  };

  const handleSubmit = () => {
    if (status === "correct") {
      const timeBonus = Math.floor((timeLeft / q.timeLimit) * 50);
      const hintPenalty = hintsUsed * 15;
      const score = Math.max(0, q.points + timeBonus - hintPenalty);
      setScores([...scores, score]);
      setQIndex(qIndex + 1);
    }
  };

  const handleHint = () => {
    if (hintsUsed < q.hints.length) {
      setHintsUsed(hintsUsed + 1);
      setShowHint(true);
    }
  };

  const timerColor = timeLeft < 30 ? "text-destructive" : timeLeft < 60 ? "text-neon-orange" : "text-accent";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border glass sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => navigate("/select")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground font-mono">
              Q{qIndex + 1}/{questions.length}
            </span>
            <div className={`flex items-center gap-1 font-mono text-sm ${timerColor}`}>
              <Clock className="w-4 h-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <Button size="sm" variant="outline" className="border-primary/30 text-primary" onClick={handleHint} disabled={hintsUsed >= q.hints.length}>
            <Lightbulb className="w-4 h-4 mr-1" />
            Hint ({hintsUsed}/{q.hints.length})
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 grid lg:grid-cols-2 gap-6 max-w-7xl">
        {/* Left: Problem + Code */}
        <div className="flex flex-col gap-4">
          <motion.div className="bg-card border border-border rounded-xl p-5" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground text-lg">{q.title}</h2>
              <span className={`ml-auto text-xs font-mono px-2 py-0.5 rounded-full border ${
                diff === "easy" ? "border-accent/30 text-accent" : diff === "medium" ? "border-neon-orange/30 text-neon-orange" : "border-destructive/30 text-destructive"
              }`}>
                {diff}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">{q.description}</p>
            <div className="mt-3 text-xs font-mono text-destructive bg-destructive/10 rounded-md p-2">
              {q.errorDescription}
            </div>
          </motion.div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && hintsUsed > 0 && (
              <motion.div
                className="bg-primary/5 border border-primary/20 rounded-xl p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {q.hints.slice(0, hintsUsed).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1 last:mb-0">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{h}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col rounded-xl border border-border overflow-hidden bg-card">
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-neon-orange/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">solution.c</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => { setCode(e.target.value); setStatus("editing"); }}
              className="flex-1 min-h-[300px] p-4 bg-transparent text-foreground font-mono text-sm leading-relaxed resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Right: Actions + Output */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80"
              onClick={handleRun}
              disabled={status === "running"}
            >
              <Play className="w-4 h-4 mr-2" />
              {status === "running" ? "Compiling..." : "Run Code"}
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-neon)] disabled:opacity-40"
              onClick={handleSubmit}
              disabled={status !== "correct"}
            >
              <Send className="w-4 h-4 mr-2" />
              {status === "correct" ? "Next Question" : "Submit"}
              {status === "correct" && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>

          {/* Output */}
          <motion.div
            className={`flex-1 rounded-xl border p-5 font-mono text-sm whitespace-pre-wrap min-h-[200px] ${
              status === "correct"
                ? "border-accent/30 bg-accent/5"
                : status === "wrong"
                ? "border-destructive/30 bg-destructive/5"
                : "border-border bg-card"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
              {status === "correct" ? (
                <><CheckCircle2 className="w-4 h-4 text-accent" /> Compilation Successful</>
              ) : status === "wrong" ? (
                <><XCircle className="w-4 h-4 text-destructive" /> Error</>
              ) : (
                <>Terminal Output</>
              )}
            </div>
            <div className={status === "correct" ? "text-accent" : status === "wrong" ? "text-destructive" : "text-muted-foreground"}>
              {output || "Click 'Run Code' to compile and test your solution..."}
            </div>
          </motion.div>

          {/* Score info */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Scoring</h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-primary font-mono text-lg font-bold">{q.points}</div>
                <div className="text-muted-foreground">Base pts</div>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-accent font-mono text-lg font-bold">+{Math.floor((timeLeft / q.timeLimit) * 50)}</div>
                <div className="text-muted-foreground">Time bonus</div>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <div className="text-destructive font-mono text-lg font-bold">-{hintsUsed * 15}</div>
                <div className="text-muted-foreground">Hint penalty</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
