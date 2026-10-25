/* ===========================================================
   roots.js — the word-root data that powers the flashcards,
   the quiz game, and the reference table.

   ➜ TO ADD YOUR BROCHURE TERMS: just add objects to this list.
     Each entry needs:
       root     — the prefix/suffix/combining form (e.g. "cardi/o")
       meaning  — what it means (e.g. "heart")
       origin   — "Greek" or "Latin"
       type     — "prefix", "suffix", or "root"
       example  — a real medical term that uses it (optional but nice)
   =========================================================== */

const ROOTS = [
  // ---- Body systems / organs ----
  { root: "cardi/o",  meaning: "heart",            origin: "Greek", type: "root",   example: "cardiology" },
  { root: "hepat/o",  meaning: "liver",            origin: "Greek", type: "root",   example: "hepatitis" },
  { root: "nephr/o",  meaning: "kidney",           origin: "Greek", type: "root",   example: "nephrology" },
  { root: "ren/o",    meaning: "kidney",           origin: "Latin", type: "root",   example: "renal" },
  { root: "pneum/o",  meaning: "lung / air",       origin: "Greek", type: "root",   example: "pneumonia" },
  { root: "pulmon/o", meaning: "lung",             origin: "Latin", type: "root",   example: "pulmonary" },
  { root: "gastr/o",  meaning: "stomach",          origin: "Greek", type: "root",   example: "gastritis" },
  { root: "neur/o",   meaning: "nerve",            origin: "Greek", type: "root",   example: "neurology" },
  { root: "oste/o",   meaning: "bone",             origin: "Greek", type: "root",   example: "osteoporosis" },
  { root: "my/o",     meaning: "muscle",           origin: "Greek", type: "root",   example: "myalgia" },
  { root: "derm/o",   meaning: "skin",             origin: "Greek", type: "root",   example: "dermatology" },
  { root: "hem/o",    meaning: "blood",            origin: "Greek", type: "root",   example: "hemorrhage" },
  { root: "angi/o",   meaning: "vessel",           origin: "Greek", type: "root",   example: "angioplasty" },
  { root: "encephal/o", meaning: "brain",          origin: "Greek", type: "root",   example: "encephalitis" },
  { root: "ophthalm/o", meaning: "eye",            origin: "Greek", type: "root",   example: "ophthalmology" },
  { root: "ot/o",     meaning: "ear",              origin: "Greek", type: "root",   example: "otitis" },
  { root: "lymph/o",  meaning: "lymph",            origin: "Latin", type: "root",   example: "lymphadenopathy" },
  { root: "aden/o",   meaning: "gland",            origin: "Greek", type: "root",   example: "adenoma" },

  // ---- Prefixes (where / how much / when) ----
  { root: "tachy-",   meaning: "fast / rapid",     origin: "Greek", type: "prefix", example: "tachycardia" },
  { root: "brady-",   meaning: "slow",             origin: "Greek", type: "prefix", example: "bradycardia" },
  { root: "hyper-",   meaning: "over / above / excessive", origin: "Greek", type: "prefix", example: "hypertension" },
  { root: "hypo-",    meaning: "under / below / deficient", origin: "Greek", type: "prefix", example: "hypoglycemia" },
  { root: "a- / an-", meaning: "without / absence of", origin: "Greek", type: "prefix", example: "anemia" },
  { root: "dys-",     meaning: "difficult / painful / abnormal", origin: "Greek", type: "prefix", example: "dyspnea" },
  { root: "peri-",    meaning: "around",           origin: "Greek", type: "prefix", example: "pericardium" },
  { root: "endo-",    meaning: "within / inner",   origin: "Greek", type: "prefix", example: "endoscopy" },
  { root: "epi-",     meaning: "upon / above",     origin: "Greek", type: "prefix", example: "epidermis" },
  { root: "sub-",     meaning: "under / below",    origin: "Latin", type: "prefix", example: "subcutaneous" },
  { root: "inter-",   meaning: "between",          origin: "Latin", type: "prefix", example: "intercostal" },
  { root: "intra-",   meaning: "within",           origin: "Latin", type: "prefix", example: "intravenous" },
  { root: "poly-",    meaning: "many / much",      origin: "Greek", type: "prefix", example: "polyuria" },
  { root: "anti-",    meaning: "against",          origin: "Greek", type: "prefix", example: "antibiotic" },

  // ---- Suffixes (condition / procedure) ----
  { root: "-itis",    meaning: "inflammation",     origin: "Greek", type: "suffix", example: "arthritis" },
  { root: "-ology",   meaning: "study of",         origin: "Greek", type: "suffix", example: "cardiology" },
  { root: "-pathy",   meaning: "disease",          origin: "Greek", type: "suffix", example: "neuropathy" },
  { root: "-ectomy",  meaning: "surgical removal", origin: "Greek", type: "suffix", example: "appendectomy" },
  { root: "-otomy",   meaning: "cutting into / incision", origin: "Greek", type: "suffix", example: "tracheotomy" },
  { root: "-ostomy",  meaning: "creating an opening", origin: "Greek", type: "suffix", example: "colostomy" },
  { root: "-plasty",  meaning: "surgical repair",  origin: "Greek", type: "suffix", example: "rhinoplasty" },
  { root: "-scopy",   meaning: "visual examination", origin: "Greek", type: "suffix", example: "endoscopy" },
  { root: "-algia",   meaning: "pain",             origin: "Greek", type: "suffix", example: "neuralgia" },
  { root: "-emia",    meaning: "blood condition",  origin: "Greek", type: "suffix", example: "leukemia" },
  { root: "-megaly",  meaning: "enlargement",      origin: "Greek", type: "suffix", example: "cardiomegaly" },
  { root: "-osis",    meaning: "abnormal condition", origin: "Greek", type: "suffix", example: "necrosis" },
  { root: "-penia",   meaning: "deficiency / lack", origin: "Greek", type: "suffix", example: "osteopenia" },
  { root: "-rrhea",   meaning: "flow / discharge", origin: "Greek", type: "suffix", example: "diarrhea" },
];

/* Make the data available to the page scripts */
window.ROOTS = ROOTS;
