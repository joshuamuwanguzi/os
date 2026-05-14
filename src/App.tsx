import { useState, useEffect } from "react";
import { chapters, quickReferenceItems } from "./data/chapters";
import { questions } from "./data/questions";

type View = "dashboard" | "chapter" | "flashcards" | "quiz" | "practice" | "reference";

interface Progress {
  studiedChapters: number[];
  quizScores: { chapterId: number; score: number; total: number }[];
  flashcardProgress: { chapterId: number; completed: number; total: number }[];
}

function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem("os_progress");
    return saved
      ? JSON.parse(saved)
      : { studiedChapters: [], quizScores: [], flashcardProgress: [] };
  });

  useEffect(() => {
    localStorage.setItem("os_progress", JSON.stringify(progress));
  }, [progress]);

  const markChapterStudied = (id: number) => {
    setProgress((p) => ({
      ...p,
      studiedChapters: p.studiedChapters.includes(id)
        ? p.studiedChapters
        : [...p.studiedChapters, id],
    }));
  };

  const saveQuizScore = (chapterId: number, score: number, total: number) => {
    setProgress((p) => ({
      ...p,
      quizScores: [
        ...p.quizScores.filter((s) => s.chapterId !== chapterId),
        { chapterId, score, total },
      ],
    }));
  };

  const saveFlashcardProgress = (
    chapterId: number,
    completed: number,
    total: number
  ) => {
    setProgress((p) => ({
      ...p,
      flashcardProgress: [
        ...p.flashcardProgress.filter((f) => f.chapterId !== chapterId),
        { chapterId, completed, total },
      ],
    }));
  };

  const resetProgress = () => {
    setProgress({ studiedChapters: [], quizScores: [], flashcardProgress: [] });
  };

  const totalChapters = chapters.length;
  const studiedCount = progress.studiedChapters.length;
  const overallPercent = Math.round((studiedCount / totalChapters) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setView("dashboard")}
              className="flex items-center gap-2 font-bold text-xl text-indigo-700 hover:text-indigo-900 transition"
            >
              <span className="text-2xl">📘</span>
              <span className="hidden sm:inline">OS Exam Cram</span>
            </button>
            <nav className="flex gap-1 sm:gap-2">
              {(
                [
                  ["dashboard", "📊"],
                  ["reference", "📋"],
                  ["quiz", "❓"],
                  ["practice", "🎯"],
                ] as [View, string][]
              ).map(([v, icon]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    view === v
                      ? "bg-indigo-100 text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="sm:hidden">{icon}</span>
                  <span className="hidden sm:inline">
                    {v === "dashboard"
                      ? "Dashboard"
                      : v === "reference"
                      ? "Quick Ref"
                      : v === "quiz"
                      ? "Quiz"
                      : "Practice Exam"}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {view === "dashboard" && (
          <Dashboard
            chapters={chapters}
            progress={progress}
            onSelectChapter={(id) => {
              setSelectedChapter(id);
              setView("chapter");
            }}
            onStartFlashcards={(id) => {
              setSelectedChapter(id);
              setView("flashcards");
            }}
            onStartQuiz={(id) => {
              setSelectedChapter(id);
              setView("quiz");
            }}
            overallPercent={overallPercent}
            studiedCount={studiedCount}
            totalChapters={totalChapters}
            onReset={resetProgress}
          />
        )}
        {view === "chapter" && selectedChapter !== null && (
          <ChapterView
            chapter={chapters.find((c) => c.id === selectedChapter)!}
            onBack={() => {
              setView("dashboard");
              setSelectedChapter(null);
            }}
            onMarkStudied={() => markChapterStudied(selectedChapter)}
            isStudied={progress.studiedChapters.includes(selectedChapter)}
            onFlashcards={() => setView("flashcards")}
            onQuiz={() => setView("quiz")}
          />
        )}
        {view === "flashcards" && selectedChapter !== null && (
          <FlashcardView
            chapter={chapters.find((c) => c.id === selectedChapter)!}
            onBack={() => {
              setView("chapter");
            }}
            onComplete={(completed, total) =>
              saveFlashcardProgress(selectedChapter, completed, total)
            }
          />
        )}
        {view === "quiz" && (
          <QuizView
            questions={questions}
            selectedChapter={selectedChapter}
            onBack={() => {
              setSelectedChapter(null);
              setView("dashboard");
            }}
            onSaveScore={(chapterId, score, total) =>
              saveQuizScore(chapterId, score, total)
            }
            isPractice={false}
          />
        )}
        {view === "practice" && (
          <QuizView
            questions={questions}
            selectedChapter={null}
            onBack={() => setView("dashboard")}
            onSaveScore={(chapterId, score, total) =>
              saveQuizScore(chapterId, score, total)
            }
            isPractice={true}
          />
        )}
        {view === "reference" && <QuickReference onBack={() => setView("dashboard")} />}
      </main>
    </div>
  );
}

/* ============ DASHBOARD ============ */
function Dashboard({
  chapters,
  progress,
  onSelectChapter,
  onStartFlashcards,
  onStartQuiz,
  overallPercent,
  studiedCount,
  totalChapters,
  onReset,
}: {
  chapters: typeof import("./data/chapters").chapters;
  progress: Progress;
  onSelectChapter: (id: number) => void;
  onStartFlashcards: (id: number) => void;
  onStartQuiz: (id: number) => void;
  overallPercent: number;
  studiedCount: number;
  totalChapters: number;
  onReset: () => void;
}) {
  const getQuizScore = (id: number) =>
    progress.quizScores.find((s) => s.chapterId === id);

  const getFlashcardProgress = (id: number) =>
    progress.flashcardProgress.find((f) => f.chapterId === id);

  return (
    <div className="space-y-6">
      {/* Hero + Progress */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🎓</span>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Operating System Fundamentals
          </h1>
        </div>
        <p className="text-indigo-100 mb-4">
          Based on course material by Dr. Umar Khokhar & Dr. Binh Tran | GGC
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="bg-white/20 rounded-xl px-4 py-3 backdrop-blur-sm flex-1 min-w-[200px]">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span className="font-bold">{studiedCount}/{totalChapters} chapters</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <p className="text-right text-xs mt-1 text-indigo-100">
              {overallPercent}% complete
            </p>
          </div>
          <button
            onClick={onReset}
            className="text-xs px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
            title="Reset progress"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Chapter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((ch) => {
          const qScore = getQuizScore(ch.id);
          const fProg = getFlashcardProgress(ch.id);
          const isStudied = progress.studiedChapters.includes(ch.id);
          return (
            <div
              key={ch.id}
              className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                isStudied ? "border-l-4 border-l-green-500" : "border-slate-200"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
                    Ch {ch.id}
                  </span>
                  {isStudied && (
                    <span className="text-green-500 text-sm">✅</span>
                  )}
                </div>
                <h3
                  className="font-semibold text-slate-800 cursor-pointer hover:text-indigo-600 transition"
                  onClick={() => onSelectChapter(ch.id)}
                >
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {ch.sections.length} sections &bull; {ch.terms.length} terms
                </p>

                {/* Progress indicators */}
                <div className="flex gap-2 mt-3 text-xs">
                  {qScore && (
                    <span className="text-indigo-600">
                      Quiz: {qScore.score}/{qScore.total}
                    </span>
                  )}
                  {fProg && (
                    <span className="text-amber-600">
                      Cards: {fProg.completed}/{fProg.total}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onSelectChapter(ch.id)}
                    className="flex-1 px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium"
                  >
                    📖 Study
                  </button>
                  <button
                    onClick={() => onStartFlashcards(ch.id)}
                    className="px-3 py-1.5 text-xs bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition font-medium"
                  >
                    🃏
                  </button>
                  <button
                    onClick={() => onStartQuiz(ch.id)}
                    className="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition font-medium"
                  >
                    ✍️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ CHAPTER VIEW ============ */
function ChapterView({
  chapter,
  onBack,
  onMarkStudied,
  isStudied,
  onFlashcards,
  onQuiz,
}: {
  chapter: (typeof chapters)[0];
  onBack: () => void;
  onMarkStudied: () => void;
  isStudied: boolean;
  onFlashcards: () => void;
  onQuiz: () => void;
}) {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition font-medium"
        >
          <span>←</span> Back to Dashboard
        </button>
        <div className="flex gap-2">
          <button
            onClick={onFlashcards}
            className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition font-medium text-sm"
          >
            🃏 Flashcards
          </button>
          <button
            onClick={onQuiz}
            className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition font-medium text-sm"
          >
            ✍️ Chapter Quiz
          </button>
          <button
            onClick={onMarkStudied}
            className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
              isStudied
                ? "bg-green-100 text-green-700"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }`}
          >
            {isStudied ? "✅ Studied" : "Mark as Studied"}
          </button>
        </div>
      </div>

      {/* Chapter Title */}
      <div>
        <span className="text-sm font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
          Chapter {chapter.id}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
          {chapter.title}
        </h2>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {chapter.sections.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveSection(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              activeSection === i
                ? "bg-indigo-100 text-indigo-700"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {chapter.sections[activeSection].title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {chapter.sections[activeSection].content}
        </p>
        {chapter.sections[activeSection].bullets && (
          <ul className="mt-4 space-y-2">
            {chapter.sections[activeSection].bullets!.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-700">
                <span className="text-indigo-500 mt-0.5 flex-shrink-0">•</span>
                <span className="text-sm sm:text-base">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Key Terms */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          📝 Key Terms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {chapter.terms.map((t, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-lg p-3 hover:bg-indigo-50 transition"
            >
              <span className="font-semibold text-indigo-700 text-sm">
                {t.term}
              </span>
              <p className="text-xs text-slate-600 mt-1">{t.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 items-center text-sm text-slate-500 pb-4">
        <span>Section {activeSection + 1} of {chapter.sections.length}</span>
        <span className="text-slate-300">|</span>
        <button
          onClick={() =>
            setActiveSection(
              activeSection < chapter.sections.length - 1
                ? activeSection + 1
                : 0
            )
          }
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Next Section →
        </button>
      </div>
    </div>
  );
}

/* ============ FLASHCARD VIEW ============ */
function FlashcardView({
  chapter,
  onBack,
  onComplete,
}: {
  chapter: (typeof chapters)[0];
  onBack: () => void;
  onComplete: (completed: number, total: number) => void;
}) {
  const allTerms = chapter.terms;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const current = allTerms[currentIndex];
  const isCurrentDone = completed.includes(currentIndex);

  const handleFlip = () => setFlipped(!flipped);

  const handleNext = () => {
    if (currentIndex < allTerms.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const markComplete = () => {
    if (!completed.includes(currentIndex)) {
      const newCompleted = [...completed, currentIndex];
      setCompleted(newCompleted);
      onComplete(newCompleted.length, allTerms.length);
    }
  };

  const shuffleCards = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setCompleted([]);
    onComplete(0, allTerms.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition font-medium"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            {completed.length}/{allTerms.length} mastered
          </span>
          <button
            onClick={shuffleCards}
            className="px-3 py-1.5 text-sm bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition"
          >
            🔄 Restart
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-800">
        🃏 Flashcards — {chapter.title}
      </h2>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-indigo-500 rounded-full h-2 transition-all duration-300"
          style={{
            width: `${(completed.length / allTerms.length) * 100}%`,
          }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex flex-col items-center">
        <div
          onClick={handleFlip}
          className="w-full max-w-lg min-h-[250px] cursor-pointer perspective-1000"
        >
          <div
            className={`relative w-full min-h-[250px] transition-transform duration-500 transform-style-3d ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div
              className={`absolute inset-0 bg-white rounded-2xl border-2 shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center backface-hidden ${
                flipped ? "hidden" : ""
              }`}
            >
              <div className="text-4xl mb-4">❓</div>
              <p className="text-xl sm:text-2xl font-semibold text-slate-800 text-center">
                {current.term}
              </p>
              <p className="text-sm text-slate-400 mt-4">Tap to reveal definition</p>
              <span className="text-xs text-slate-400 mt-2">
                {currentIndex + 1} of {allTerms.length}
              </span>
            </div>
            {/* Back */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border-2 border-indigo-200 shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center ${
                !flipped ? "hidden" : ""
              }`}
            >
              <div className="text-4xl mb-4">💡</div>
              <p className="text-lg sm:text-xl font-medium text-slate-800 text-center leading-relaxed">
                {current.definition}
              </p>
              <p className="text-xs text-slate-400 mt-4">Tap to see term</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          <button
            onClick={markComplete}
            className={`px-5 py-2.5 rounded-lg transition font-medium ${
              isCurrentDone
                ? "bg-green-100 text-green-700"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }`}
          >
            {isCurrentDone ? "✅ Mastered" : "Mark Known"}
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === allTerms.length - 1}
            className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      {/* All terms list */}
      <details className="bg-white rounded-xl border border-slate-200 p-4">
        <summary className="font-medium text-slate-700 cursor-pointer">
          📋 View All Terms ({allTerms.length})
        </summary>
        <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
          {allTerms.map((t, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg text-sm ${
                completed.includes(i)
                  ? "bg-green-50 text-green-700"
                  : "bg-slate-50 text-slate-600"
              }`}
            >
              <span className="font-semibold">{t.term}</span>: {t.definition}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

/* ============ QUIZ VIEW ============ */
function QuizView({
  questions: allQuestions,
  selectedChapter,
  onBack,
  onSaveScore,
  isPractice,
}: {
  questions: typeof import("./data/questions").questions;
  selectedChapter: number | null;
  onBack: () => void;
  onSaveScore: (chapterId: number, score: number, total: number) => void;
  isPractice: boolean;
}) {
  const filteredQuestions = isPractice
    ? allQuestions
    : allQuestions.filter((q) => q.chapterId === selectedChapter);

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {}
  );
  const [showResults, setShowResults] = useState(false);

  const questionData = filteredQuestions[currentQ];

  const handleSelect = (optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQ]: optionIdx }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    const total = filteredQuestions.length;
    const correct = filteredQuestions.filter(
      (q, i) => selectedAnswers[i] === q.correctAnswer
    ).length;

    if (isPractice) {
      onSaveScore(0, correct, total);
    } else if (selectedChapter) {
      onSaveScore(selectedChapter, correct, total);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No questions available.</p>
        <button onClick={onBack} className="mt-4 text-indigo-600 font-medium">
          ← Back
        </button>
      </div>
    );
  }

  if (showResults) {
    const correct = filteredQuestions.filter(
      (q, i) => selectedAnswers[i] === q.correctAnswer
    ).length;
    const total = filteredQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 70;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition font-medium"
          >
            ← Back
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition font-medium text-sm"
          >
            🔄 Retry
          </button>
        </div>

        <div
          className={`text-center p-8 rounded-2xl ${
            passed
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
              : "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
          }`}
        >
          <div className="text-6xl mb-4">{passed ? "🎉" : "💪"}</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {passed
              ? "Great job!"
              : "Keep studying, you'll get it!"}
          </h2>
          <p className="text-lg text-slate-600 mb-1">
            You scored {correct}/{total}
          </p>
          <p className="text-3xl font-bold text-indigo-600">{percentage}%</p>
          <p className="text-sm text-slate-500 mt-2">
            {isPractice
              ? "Practice Exam"
              : `Chapter ${selectedChapter} Quiz`}
          </p>
        </div>

        {/* Review incorrect answers */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-700">📝 Review Answers</h3>
          {filteredQuestions.map((q, i) => {
            const selected = selectedAnswers[i];
            const isCorrect = selected === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl border p-4 ${
                  isCorrect ? "border-green-200" : "border-red-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span>{isCorrect ? "✅" : "❌"}</span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 text-sm">
                      {q.question}
                    </p>
                    <div className="mt-2 space-y-1">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className={`text-xs px-3 py-1.5 rounded-lg ${
                            oi === q.correctAnswer
                              ? "bg-green-100 text-green-700 font-medium"
                              : oi === selected && oi !== q.correctAnswer
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-50 text-slate-600"
                          }`}
                        >
                          {String.fromCharCode(65 + oi)}. {opt}
                          {oi === q.correctAnswer && " ✓"}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      💡 {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition font-medium"
        >
          ← Back
        </button>
        <span className="text-sm text-slate-500">
          {isPractice ? "Practice Exam" : `Chapter ${selectedChapter} Quiz`}
          {" — "}
          {Object.keys(selectedAnswers).length}/{filteredQuestions.length} answered
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-indigo-500 rounded-full h-2 transition-all duration-300"
          style={{
            width: `${
              ((currentQ + 1) / filteredQuestions.length) * 100
            }%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
            Question {currentQ + 1} of {filteredQuestions.length}
          </span>
          {!isPractice && (
            <span className="text-xs text-slate-400">
              Ch {questionData.chapterId}
            </span>
          )}
        </div>
        <p className="text-lg font-medium text-slate-800 mb-6">
          {questionData.question}
        </p>
        <div className="space-y-3">
          {questionData.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                selectedAnswers[currentQ] === i
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50"
              }`}
            >
              <span className="font-semibold mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={() =>
              setCurrentQ(
                Math.min(filteredQuestions.length - 1, currentQ + 1)
              )
            }
            disabled={currentQ === filteredQuestions.length - 1}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={
            Object.keys(selectedAnswers).length < filteredQuestions.length
          }
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition font-medium shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          📊 Submit Answers
        </button>
      </div>

      {Object.keys(selectedAnswers).length < filteredQuestions.length && (
        <p className="text-xs text-amber-600 text-center">
          Answer all questions ({filteredQuestions.length - Object.keys(selectedAnswers).length} remaining) to submit
        </p>
      )}

      {/* Question navigator dots */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {filteredQuestions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`w-7 h-7 rounded-full text-xs font-medium transition ${
              currentQ === i
                ? "bg-indigo-600 text-white"
                : selectedAnswers[i] !== undefined
                ? "bg-indigo-100 text-indigo-600"
                : "bg-slate-100 text-slate-400 hover:bg-slate-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ QUICK REFERENCE ============ */
function QuickReference({ onBack }: { onBack: () => void }) {
  const [filterChapter, setFilterChapter] = useState<number | null>(null);

  const items = filterChapter
    ? quickReferenceItems.filter((item) => item.chapter === filterChapter)
    : quickReferenceItems;

  const getChapterTitle = (id: number) =>
    chapters.find((c) => c.id === id)?.title || `Chapter ${id}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition font-medium"
        >
          ← Back
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          📋 Quick Reference — Key Formulas & Definitions
        </h2>
      </div>

      {/* Filter by chapter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterChapter(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            filterChapter === null
              ? "bg-indigo-100 text-indigo-700"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All
        </button>
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setFilterChapter(ch.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterChapter === ch.id
                ? "bg-indigo-100 text-indigo-700"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Ch {ch.id}
          </button>
        ))}
      </div>

      {/* Quick reference items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                Ch {item.chapter}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 text-sm mb-1">
              {item.formula}
            </h3>
            <p className="text-indigo-700 font-mono text-sm bg-indigo-50/50 p-2 rounded-lg">
              {item.description}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              {getChapterTitle(item.chapter)}
            </p>
          </div>
        ))}
      </div>

      {/* Print-friendly version */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-800 mb-2">⏰ Cram Sheet — Must Know!</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">Deadlock Conditions</p>
            <p className="text-amber-800">Mutual Exclusion + Hold & Wait + Non-Preemption + Circular Wait</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">Physical Address</p>
            <p className="text-amber-800">PA = Logical Address + Relocation Register</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">Process after n fork()</p>
            <p className="text-amber-800">Total = 2ⁿ | Children = 2ⁿ - 1</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">Round Robin Max Wait</p>
            <p className="text-amber-800">(n - 1) × time_quantum</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">IaaS / PaaS / SaaS</p>
            <p className="text-amber-800">Host / Build / Consume</p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">File Permissions</p>
            <p className="text-amber-800">R=4, W=2, X=1 | Full = 7 (chmod 777)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
