import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Instagram } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  wide?: boolean;
}

interface TransformationItem {
  src: string;
  alt: string;
  title: string;
  detail: string;
  category: 'muscle' | 'fatloss' | 'ladies';
}

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  schedule: string;
  formGoal: string;
}

const SAIBRAKATTE_IMAGES: GalleryImage[] = [
  {
    src: '/assets/aistudio/sabirkatte_sign_5cb81964.png',
    alt: 'XFITNESS Saibrakatte Unisex Gym Signage',
    caption: 'XFITNESS Saibrakatte — Unisex Gym',
    wide: true,
  },
  {
    src: '/assets/aistudio/sab_gym1_741506b8.png',
    alt: 'XFITNESS Saibrakatte Gym Floor',
    caption: 'Cardio & Curved Treadmill Floor',
  },
  {
    src: '/assets/aistudio/sab_gym2_50dfa7b7.jpg',
    alt: 'XFITNESS Saibrakatte Training Session',
    caption: 'Saibrakatte Members & Team',
  },
  {
    src: '/assets/aistudio/sab_gym3_b6727fb4.jpg',
    alt: 'XFITNESS Saibrakatte Athletes',
    caption: 'Athletes at XFITNESS Saibrakatte',
  },
  {
    src: '/assets/aistudio/sab_ladies_c5b3548d.png',
    alt: 'XFITNESS Saibrakatte Ladies Training Zone',
    caption: 'Ladies Strength Training',
  },
];

const KOKKARNE_IMAGES: GalleryImage[] = [
  {
    src: '/assets/aistudio/kok_sign_3d243445.png',
    alt: 'XFITNESS Kokkarne Exterior Signage',
    caption: 'XFITNESS Kokkarne — Exterior',
  },
  {
    src: '/assets/aistudio/kok_new2_931c9a2e.png',
    alt: 'XFITNESS Kokkarne Full Equipment Floor',
    caption: 'Main Training Floor & Turf',
  },
  {
    src: '/assets/aistudio/kok_new1_e9234cff.png',
    alt: 'XFITNESS Kokkarne Reception Area',
    caption: 'Reception & Office',
  },
  {
    src: '/assets/aistudio/kok_new3_94acd52e.png',
    alt: 'XFITNESS Kokkarne Weights Area',
    caption: 'Dumbbell Rack & Free Weights',
  },
  {
    src: '/assets/aistudio/kok_new4_40ea5919.jpg',
    alt: 'XFITNESS Kokkarne Training Zone',
    caption: 'Benches & Strength Floor',
  },
  {
    src: '/assets/aistudio/kok_new5_900388a1.jpg',
    alt: 'XFITNESS Kokkarne Power Zone',
    caption: 'Power Cage & Squat Racks',
  },
];

const TRANSFORMATIONS: TransformationItem[] = [
  {
    src: '/assets/aistudio/new_transform1_c374d131.jpg',
    alt: 'XFITNESS Total Body Transformation 1',
    title: 'Lean Muscle Gain',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/new_transform2_6e853690.jpg',
    alt: 'XFITNESS Weight Loss Transformation 2',
    title: 'Fat Loss Program',
    detail: 'Before & After',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/new_transform3_c1e97a10.jpg',
    alt: 'XFITNESS Lean Muscle Transformation 3',
    title: 'Athletic Hypertrophy',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/new_transform4_87048a09.png',
    alt: 'XFITNESS Back Transformation 4',
    title: 'Back Width & Density',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/new_transform5_b123e03a.png',
    alt: 'XFITNESS Physique Transformation 5',
    title: 'Physique Recomp',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/new_transform6_ed15159d.png',
    alt: 'XFITNESS Total Body Transformation 6',
    title: 'Strength & Conditioning',
    detail: 'Before & After',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/new_transform7_1af1e69a.png',
    alt: 'XFITNESS 16kg Muscle Gain Ladies Transformation 7',
    title: 'Ladies +16kg Gain',
    detail: 'Before & After',
    category: 'ladies',
  },
  {
    src: '/assets/aistudio/new_transform8_b85c68bf.png',
    alt: 'XFITNESS Muscle Building Transformation 8',
    title: 'Mass & Proportions',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/new_transform9_3e5c25fd.png',
    alt: 'XFITNESS Body Transformation 9',
    title: 'Complete Fat Loss',
    detail: 'Before & After',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/image_769aa948.png',
    alt: 'XFITNESS Biceps & Core Transformation 10',
    title: 'Biceps & Core Definition',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/image_044b8d45.png',
    alt: 'XFITNESS Lifestyle Fat Loss Transformation 11',
    title: 'Lifestyle Fat Loss',
    detail: 'Before & After',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/image_5f208b06.png',
    alt: 'XFITNESS Youth Fat Loss Transformation 12',
    title: 'Youth Fat Loss',
    detail: 'Before & After',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/image_a35c18c5.png',
    alt: 'XFITNESS Lean Abs & Shoulders Transformation 13',
    title: 'Lean Abs & Shoulders',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/image_0e3724d0.png',
    alt: 'XFITNESS 20kg Muscle Gain Transformation 14',
    title: '+20kg Muscle Gain',
    detail: '20KG Gain',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/image_afa9c0c2.png',
    alt: 'XFITNESS Body Recomposition Transformation 15',
    title: 'Body Recomposition',
    detail: 'Before & After',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/image_b4b82071.png',
    alt: 'XFITNESS 21kg Muscle Gain Transformation 16',
    title: '+21kg Muscle Gain',
    detail: '21KG Gain',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/image_5d2850da.png',
    alt: 'XFITNESS Ladies 16kg Weight Loss Transformation 17',
    title: 'Ladies 16kg Weight Loss',
    detail: '16KG Loss',
    category: 'ladies',
  },
  {
    src: '/assets/aistudio/image_c5b32035.png',
    alt: 'XFITNESS Stage Conditioning Transformation 18',
    title: 'Stage Conditioning',
    detail: 'Before & After',
    category: 'muscle',
  },
  {
    src: '/assets/aistudio/image_339a3da8.png',
    alt: 'XFITNESS 13kg Weight Loss Transformation 19',
    title: '13kg Weight Loss',
    detail: '13KG Loss',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/image_5356ee3f.png',
    alt: 'XFITNESS Fat Loss & Toning Transformation 20',
    title: 'Fat Loss & Toning',
    detail: 'Before & After',
    category: 'fatloss',
  },
  {
    src: '/assets/aistudio/image_34bf0a0a.png',
    alt: 'XFITNESS Shredded Core & Obliques Transformation 21',
    title: 'Shredded Core & Obliques',
    detail: 'Before & After',
    category: 'muscle',
  },
];

const SERVICES: ServiceItem[] = [
  {
    num: '01. Strength & Hypertrophy',
    title: 'Strength Training',
    desc: 'Heavy squat racks, Olympic barbells, full dumbbell progression, Smith machines, and dual cable stations across both branches.',
    schedule: 'Both Branches · All Day',
    formGoal: 'Gym Membership',
  },
  {
    num: '02. Conditioning & Stamina',
    title: 'Cardio & Turf Zone',
    desc: 'Curved non-motorized treadmills, commercial spin bikes, battle ropes, and functional sled turf for high-output fat loss.',
    schedule: 'Both Branches · All Day',
    formGoal: 'Gym Membership',
  },
  {
    num: '03. Dedicated 1-on-1 Coaching',
    title: 'Personal Training',
    desc: 'Structured 1-on-1 sessions with form correction, progressive overload tracking, and weekly body composition check-ins.',
    schedule: 'Custom Slot · Morning / Evening',
    formGoal: 'Personal Training',
  },
  {
    num: '04. Body Recomposition',
    title: 'Weight Loss & Muscle Gain',
    desc: 'Targeted 12-week transformation protocols combining resistance training, metabolic conditioning, and calorie-matched nutrition.',
    schedule: '12-Week Structured Plan',
    formGoal: 'Weight Loss / Muscle Gain',
  },
  {
    num: '05. Clinical Nutrition',
    title: 'Diet Consultation',
    desc: 'Practical, home-cooked coastal Karnataka & Indian macro meal plans designed by Certified Clinical Nutritionist Abhishek Amin.',
    schedule: 'In-Gym & Online Consult',
    formGoal: 'Diet Consultation',
  },
  {
    num: '06. Stage Preparation',
    title: 'Bodybuilding Coaching',
    desc: 'Complete contest preparation—hypertrophy phase, peak week conditioning, and stage posing for district, state, and national athletes.',
    schedule: 'Coach Abhishek Amin',
    formGoal: 'Bodybuilding Coaching',
  },
];

const COACH_IMAGE = {
  src: '/assets/aistudio/coach_new_7fd4b132.jpg',
  alt: 'Coach Abhishek Amin at Bangalore Open Championship',
};

const LOGO_SRC = '/assets/aistudio/logo_bbaa6df4.jpg';

function parseHeightToCm(raw: string): { cm: number; label: string } | null {
  const cleaned = raw.trim().toLowerCase();
  if (!cleaned) return null;

  // Case 1: Decimal notation like "5.1" (5ft 1in), "5.10" (5ft 10in), "5.11" (5ft 11in), "6.12"
  const dotMatch = cleaned.match(/^(\d+)\.(\d+)\s*(ft|feet|in|inches|cm)?$/);
  if (dotMatch) {
    const first = parseInt(dotMatch[1], 10);
    const secondStr = dotMatch[2];
    const second = parseInt(secondStr, 10);
    const unit = dotMatch[3] || '';

    if (unit !== 'cm' && first >= 2 && first <= 8) {
      // e.g. 5.1 -> 5ft 1in, 5.11 -> 5ft 11in, 6.12 -> 6ft 12in (or decimal feet if > 12)
      let totalInches: number;
      if (second <= 12) {
        totalInches = first * 12 + second;
      } else {
        // Decimal feet like 5.75 ft
        totalInches = Math.round(parseFloat(`${first}.${secondStr}`) * 12);
      }
      const ft = Math.floor(totalInches / 12);
      const inch = totalInches % 12;
      const cm = Math.min(240, Math.max(100, +(totalInches * 2.54).toFixed(1)));
      return { cm, label: `${ft} ft ${inch} in (${Math.round(cm)} cm)` };
    }

    const asFloat = parseFloat(cleaned);
    if (!isNaN(asFloat) && asFloat > 0) {
      const cm = asFloat < 90 ? +(asFloat * 2.54).toFixed(1) : Math.min(250, Math.max(100, asFloat));
      const totalInches = Math.round(cm / 2.54);
      const ft = Math.floor(totalInches / 12);
      const inch = totalInches % 12;
      return { cm, label: `${ft} ft ${inch} in (${Math.round(cm)} cm)` };
    }
  }

  // Case 2: Feet & Inches text/symbols like "5 feet 1 inches", "5 ft 11 in", "5'1\"", "5 1"
  const numMatches = cleaned.match(/\d+/g);
  if (numMatches && numMatches.length >= 2) {
    const first = parseInt(numMatches[0], 10);
    const second = parseInt(numMatches[1], 10);
    if (first >= 2 && first <= 8) {
      const totalInches = first * 12 + second;
      const ft = Math.floor(totalInches / 12);
      const inch = totalInches % 12;
      const cm = Math.min(240, Math.max(100, +(totalInches * 2.54).toFixed(1)));
      return { cm, label: `${ft} ft ${inch} in (${Math.round(cm)} cm)` };
    }
  }

  // Case 3: Single number like "5" (5 feet), "68" (68 inches), or "172" (172 cm)
  if (numMatches && numMatches.length === 1) {
    const val = parseFloat(numMatches[0]);
    if (val >= 2 && val <= 8) {
      const totalInches = Math.round(val * 12);
      const ft = Math.floor(totalInches / 12);
      const inch = totalInches % 12;
      const cm = +(totalInches * 2.54).toFixed(1);
      return { cm, label: `${ft} ft ${inch} in (${Math.round(cm)} cm)` };
    }
    if (val >= 36 && val < 90) {
      // Inches (e.g. 68 inches)
      const ft = Math.floor(val / 12);
      const inch = Math.round(val % 12);
      const cm = +(val * 2.54).toFixed(1);
      return { cm, label: `${ft} ft ${inch} in (${Math.round(cm)} cm)` };
    }
    if (val >= 90 && val <= 260) {
      const totalInches = Math.round(val / 2.54);
      const ft = Math.floor(totalInches / 12);
      const inch = totalInches % 12;
      return { cm: val, label: `${ft} ft ${inch} in (${Math.round(val)} cm)` };
    }
  }

  return null;
}

function parsePositiveNumber(raw: string): number | null {
  const match = raw.trim().match(/\d+(\.\d+)?/);
  if (!match) return null;
  const val = parseFloat(match[0]);
  return isNaN(val) || val <= 0 ? null : val;
}

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [logoError, setLogoError] = useState(false);

  // Hero interactive branch showcase tab
  const [heroBranch, setHeroBranch] = useState<'sab' | 'kok'>('sab');

  // Transformation category filter
  const [transFilter, setTransFilter] = useState<'all' | 'muscle' | 'fatloss' | 'ladies'>('all');

  // Nutrition & Calorie Calculator state (blank by default so users can type freely without leading 0)
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [ageYears, setAgeYears] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [calcGoal, setCalcGoal] = useState<'fatloss' | 'muscle' | 'recomp'>('muscle');
  const [committedInputs, setCommittedInputs] = useState<{
    w: number;
    h: number;
    hLabel: string;
    a: number;
    gender: 'male' | 'female';
    goal: 'fatloss' | 'muscle' | 'recomp';
  } | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);

  // Lightbox state
  const [lbOpen, setLbOpen] = useState(false);
  const [lbGroup, setLbGroup] = useState<{ src: string; alt: string }[]>([]);
  const [lbIndex, setLbIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Contact form state
  const [uName, setUName] = useState('');
  const [uPhone, setUPhone] = useState('');
  const [uBranch, setUBranch] = useState('Branch 01 - Saibrakatte');
  const [uGoal, setUGoal] = useState('Gym Membership');
  const [uMsg, setUMsg] = useState('');

  const filteredTransformations = useMemo(() => {
    if (transFilter === 'all') return TRANSFORMATIONS;
    return TRANSFORMATIONS.filter((item) => item.category === transFilter);
  }, [transFilter]);

  // Calculate real BMI, BMR, TDEE, Daily Calories & Full Macro Split from committed inputs
  const nutritionStats = useMemo(() => {
    if (!committedInputs) return null;
    const w = committedInputs.w;
    const h = committedInputs.h;
    const a = committedInputs.a;

    const heightM = h / 100;
    const bmi = +(w / (heightM * heightM)).toFixed(1);
    const bmiCategory =
      bmi < 18.5
        ? 'Underweight'
        : bmi < 25
          ? 'Normal Weight'
          : bmi < 30
            ? 'Overweight'
            : 'Obese';

    // Mifflin-St Jeor BMR Equation
    const bmr =
      committedInputs.gender === 'male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = Math.round(bmr * 1.55); // Moderate gym training 4-5x/week

    let targetCalories = tdee;
    let proteinGrams = Math.round(w * 1.8);
    let fatRatio = 0.25;
    let goalTitle = 'Muscle Gain (+350 kcal Surplus)';
    let calDiffLabel = '+350 kcal Surplus';
    let proteinRateLabel = '1.8g / kg BW';

    if (committedInputs.goal === 'fatloss') {
      const minSafeCal = committedInputs.gender === 'male' ? 1350 : 1200;
      targetCalories = Math.max(minSafeCal, Math.round(tdee - 500));
      proteinGrams = Math.round(w * 2.2); // Higher protein in deficit to preserve lean muscle
      fatRatio = 0.22;
      goalTitle = 'Fat Loss (-500 kcal Deficit)';
      calDiffLabel = '-500 kcal Deficit';
      proteinRateLabel = '2.2g / kg BW';
    } else if (committedInputs.goal === 'muscle') {
      targetCalories = Math.round(tdee + 350);
      proteinGrams = Math.round(w * 1.8);
      fatRatio = 0.25;
      goalTitle = 'Muscle Gain (+350 kcal Surplus)';
      calDiffLabel = '+350 kcal Surplus';
      proteinRateLabel = '1.8g / kg BW';
    } else {
      // Body Recomposition: slight -150 kcal deficit with 2.0g/kg protein
      const minSafeCal = committedInputs.gender === 'male' ? 1400 : 1250;
      targetCalories = Math.max(minSafeCal, Math.round(tdee - 150));
      proteinGrams = Math.round(w * 2.0);
      fatRatio = 0.25;
      goalTitle = 'Body Recomp (-150 kcal Recomp)';
      calDiffLabel = '-150 kcal Recomp';
      proteinRateLabel = '2.0g / kg BW';
    }

    const fatGrams = Math.max(30, Math.round((targetCalories * fatRatio) / 9));
    const remainingCalForCarbs = targetCalories - proteinGrams * 4 - fatGrams * 9;
    const carbGrams = Math.max(40, Math.round(remainingCalForCarbs / 4));

    return {
      bmi,
      bmiCategory,
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
      goalTitle,
      calDiffLabel,
      proteinRateLabel,
    };
  }, [committedInputs]);

  // Scroll spy for active nav item
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + 130;
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      sections.forEach((sec) => {
        if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer or lightbox is open
  useEffect(() => {
    if (drawerOpen || lbOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen, lbOpen]);

  const openLightbox = (group: { src: string; alt: string }[], index: number) => {
    setLbGroup(group);
    setLbIndex(index);
    setLbOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLbOpen(false);
  }, []);

  const prevLightbox = useCallback(() => {
    setLbIndex((prev) => (lbGroup.length ? (prev - 1 + lbGroup.length) % lbGroup.length : 0));
  }, [lbGroup.length]);

  const nextLightbox = useCallback(() => {
    setLbIndex((prev) => (lbGroup.length ? (prev + 1) % lbGroup.length : 0));
  }, [lbGroup.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lbOpen) closeLightbox();
        if (drawerOpen) setDrawerOpen(false);
      }
      if (!lbOpen) return;
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lbOpen, drawerOpen, closeLightbox, prevLightbox, nextLightbox]);

  const selectProgramAndScroll = (goalName: string) => {
    setUGoal(goalName);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const selectBranchAndScroll = (branchName: string) => {
    setUBranch(branchName);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCalculateTargets = () => {
    const wParsed = parsePositiveNumber(weightKg);
    const parsedHeight = parseHeightToCm(heightCm);
    const aParsed = parsePositiveNumber(ageYears);

    if (!wParsed || !parsedHeight || !aParsed) {
      setCalcError('Please enter your Weight, Height, and Age to calculate your daily targets.');
      return;
    }

    const wClamped = Math.min(260, Math.max(20, wParsed));
    const aClamped = Math.min(95, Math.max(10, Math.round(aParsed)));

    setCalcError(null);
    setCommittedInputs({
      w: wClamped,
      h: parsedHeight.cm,
      hLabel: parsedHeight.label,
      a: aClamped,
      gender,
      goal: calcGoal,
    });
  };

  const handleGoalSelect = (newGoal: 'fatloss' | 'muscle' | 'recomp') => {
    setCalcGoal(newGoal);
    setCommittedInputs(null);
  };

  const handleGenderSelect = (newGender: 'male' | 'female') => {
    setGender(newGender);
    setCommittedInputs(null);
  };

  const applyCalculatorToEnquiry = () => {
    const activeGoal = committedInputs ? committedInputs.goal : calcGoal;
    const goalLabel =
      activeGoal === 'fatloss'
        ? 'Weight Loss / Muscle Gain'
        : activeGoal === 'muscle'
          ? 'Weight Loss / Muscle Gain'
          : 'Diet Consultation';
    setUGoal(goalLabel);
    if (nutritionStats && committedInputs) {
      setUMsg(
        `Goal: ${nutritionStats.goalTitle} | Stats: ${committedInputs.w}kg, ${committedInputs.hLabel}, Age ${committedInputs.a} (${committedInputs.gender}). BMI: ${nutritionStats.bmi} (${nutritionStats.bmiCategory}), Daily Target: ${nutritionStats.targetCalories} kcal | Protein: ${nutritionStats.proteinGrams}g, Carbs: ${nutritionStats.carbGrams}g, Fats: ${nutritionStats.fatGrams}g.`
      );
    }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const getWhatsAppUrl = () => {
    const name = uName.trim() || 'Member';
    const phone = uPhone.trim();
    const msg = uMsg.trim();
    const lines = [
      'Hello XFITNESS, I want to enquire about joining.',
      `*Name:* ${name}`,
      phone ? `*Phone:* ${phone}` : '',
      `*Branch:* ${uBranch}`,
      `*Program:* ${uGoal}`,
      msg ? `*Message:* ${msg}` : '',
    ].filter(Boolean);
    return `https://wa.me/918762980051?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <>
      {/* NAVBAR (3-ZONE TOP BAR CONTRACT) */}
      <header className="navbar" id="navbar">
        <div className="container nav-inner">
          <a href="#home" className="nav-brand">
            {!logoError ? (
              <img
                src={LOGO_SRC}
                alt="XFITNESS"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="nav-brand-text">
                <span className="accent">X</span>FITNESS
              </span>
            )}
          </a>

          <nav className="nav-links" id="navLinks">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>
              Home
            </a>
            <a href="#owner" className={activeSection === 'owner' ? 'active' : ''}>
              Head Coach
            </a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''}>
              Programs
            </a>
            <a
              href="#saibrakatte-gallery"
              className={activeSection === 'saibrakatte-gallery' ? 'active' : ''}
            >
              Branch 01
            </a>
            <a
              href="#kokkarne-gallery"
              className={activeSection === 'kokkarne-gallery' ? 'active' : ''}
            >
              Branch 02
            </a>
            <a
              href="#transformations"
              className={activeSection === 'transformations' ? 'active' : ''}
            >
              Results
            </a>
            <a href="#branches" className={activeSection === 'branches' ? 'active' : ''}>
              Locations
            </a>
          </nav>

          <div className="nav-cta">
            <a href="#contact" className="btn btn-primary">
              Join Now
            </a>
          </div>

          <div className="nav-mobile-actions">
            <a href="tel:+918762980051" className="nav-mobile-call">
              Call
            </a>
            <button
              className="menu-btn"
              id="menuBtn"
              aria-label="Open Navigation Menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      ></div>
      <aside
        className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div>
          <div className="drawer-top">
            {!logoError ? (
              <img src={LOGO_SRC} alt="XFITNESS" referrerPolicy="no-referrer" />
            ) : (
              <span className="nav-brand-text">
                <span className="accent">X</span>FITNESS
              </span>
            )}
            <button
              className="drawer-close"
              aria-label="Close Menu"
              onClick={() => setDrawerOpen(false)}
            >
              &#x2715;
            </button>
          </div>
          <nav className="drawer-links">
            <a href="#home" onClick={() => setDrawerOpen(false)}>
              Home <span>01</span>
            </a>
            <a href="#owner" onClick={() => setDrawerOpen(false)}>
              Coach Abhishek Amin <span>02</span>
            </a>
            <a href="#services" onClick={() => setDrawerOpen(false)}>
              Programs &amp; Services <span>03</span>
            </a>
            <a href="#saibrakatte-gallery" onClick={() => setDrawerOpen(false)}>
              Branch 01: Saibrakatte <span>04</span>
            </a>
            <a href="#kokkarne-gallery" onClick={() => setDrawerOpen(false)}>
              Branch 02: Kokkarne <span>05</span>
            </a>
            <a href="#transformations" onClick={() => setDrawerOpen(false)}>
              Real Transformations <span>06</span>
            </a>
            <a href="#calculator" onClick={() => setDrawerOpen(false)}>
              Macro &amp; BMI Calculator <span>07</span>
            </a>
            <a href="#branches" onClick={() => setDrawerOpen(false)}>
              Locations &amp; Maps <span>08</span>
            </a>
            <a href="#contact" onClick={() => setDrawerOpen(false)}>
              Contact &amp; Enquiry <span>09</span>
            </a>
          </nav>
        </div>
        <div className="drawer-bottom">
          <a href="tel:+918762980051" className="btn btn-outline">
            Call +91 87629 80051
          </a>
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => setDrawerOpen(false)}
          >
            Join XFITNESS Now
          </a>
        </div>
      </aside>

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              Udupi&apos;s Premier Unisex Gym &middot; Est. March 2019
            </div>
            <h1>
              FORGE YOUR
              <br />
              <span className="accent">ULTIMATE BODY.</span>
            </h1>
            <p className="hero-sub">
              Two full-scale unisex training facilities in Saibrakatte and Kokkarne. Equipped for
              serious strength training, fat loss, muscle building, and clinical nutrition under
              Coach Abhishek Amin.
            </p>
            <div className="hero-meta-line">
              <span>
                <strong>Branch 01:</strong> Saibrakatte
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>
                <strong>Branch 02:</strong> Kokkarne
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>
                <strong>Hours:</strong> 5:30 AM – 2:30 PM &amp; 3:30 PM – 10:30 PM
              </span>
            </div>
            <div className="hero-btns">
              <a href="#saibrakatte-gallery" className="btn btn-primary">
                Explore Our Branches
              </a>
              <a href="#transformations" className="btn btn-outline">
                See Transformations
              </a>
            </div>
          </div>

          {/* Interactive Facility Showcase */}
          <div className="hero-showcase">
            <div className="hs-tabs">
              <button
                type="button"
                className={`hs-tab ${heroBranch === 'sab' ? 'active' : ''}`}
                onClick={() => setHeroBranch('sab')}
              >
                01. Saibrakatte Branch
              </button>
              <button
                type="button"
                className={`hs-tab ${heroBranch === 'kok' ? 'active' : ''}`}
                onClick={() => setHeroBranch('kok')}
              >
                02. Kokkarne Branch
              </button>
            </div>

            {heroBranch === 'sab' ? (
              <>
                <div
                  className="hs-media"
                  onClick={() => openLightbox(SAIBRAKATTE_IMAGES, 1)}
                  title="Tap to view Saibrakatte gallery"
                >
                  <img
                    src="/assets/aistudio/sab_gym1_741506b8.png"
                    alt="XFITNESS Saibrakatte Gym Floor"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hs-overlay">
                    <div className="hs-branch-title">XFITNESS SAIBRAKATTE</div>
                    <div className="hs-branch-addr">
                      2nd Floor, Shobha Arcade, Supermarket Building Circle, Udupi
                    </div>
                  </div>
                </div>
                <div className="hs-footer">
                  <span>5:30 AM – 2:30 PM &amp; 3:30 PM – 10:30 PM</span>
                  <a href="#saibrakatte-gallery">View 5 Photos &rarr;</a>
                </div>
              </>
            ) : (
              <>
                <div
                  className="hs-media"
                  onClick={() => openLightbox(KOKKARNE_IMAGES, 1)}
                  title="Tap to view Kokkarne gallery"
                >
                  <img
                    src="/assets/aistudio/kok_new2_931c9a2e.png"
                    alt="XFITNESS Kokkarne Full Equipment Floor"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hs-overlay">
                    <div className="hs-branch-title">XFITNESS KOKKARNE</div>
                    <div className="hs-branch-addr">
                      Sri Laxmi Arcade, Main Road, Near Indian Petrol Pump, Kokkarne
                    </div>
                  </div>
                </div>
                <div className="hs-footer">
                  <span>Full Strength Floor &middot; Turf &amp; Squat Racks</span>
                  <a href="#kokkarne-gallery">View 6 Photos &rarr;</a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Full-Width 4-Column Architectural KPI Bar */}
        <div className="hero-kpi-bar">
          <div className="container hero-kpi-grid">
            <div className="kpi-cell">
              <div className="kpi-val">02</div>
              <div className="kpi-lbl">Unisex Branches</div>
            </div>
            <div className="kpi-cell">
              <div className="kpi-val">
                500<span>+</span>
              </div>
              <div className="kpi-lbl">Active Members</div>
            </div>
            <div className="kpi-cell">
              <div className="kpi-val">
                14<span>+</span>
              </div>
              <div className="kpi-lbl">Years Experience</div>
            </div>
            <div className="kpi-cell">
              <div className="kpi-val">
                100<span>%</span>
              </div>
              <div className="kpi-lbl">Result Driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* HEAD COACH / OWNER */}
      <section className="section" id="owner">
        <div className="container">
          <div className="coach-grid">
            {/* Desktop Portrait Column */}
            <div className="coach-visual-col">
              <div
                className="coach-frame"
                onClick={() => openLightbox([COACH_IMAGE], 0)}
                title="Tap to view full photo"
              >
                <img
                  src={COACH_IMAGE.src}
                  alt={COACH_IMAGE.alt}
                  className="coach-img"
                  referrerPolicy="no-referrer"
                />
                <div className="coach-caption">
                  <span>Bangalore Open Championship</span>
                  <strong>Gold Medalist</strong>
                </div>
              </div>
            </div>

            <div className="coach-content">
              {/* Desktop Header */}
              <div className="coach-desktop-header">
                <span className="eyebrow">Founder &amp; Head Coach</span>
                <h2 className="coach-name">
                  COACH <span className="accent">ABHISHEK AMIN</span>
                </h2>
                <p className="coach-sub">
                  Founder &middot; Certified Clinical Nutritionist &middot; Bodybuilding Coach
                </p>
              </div>

              {/* Mobile Compact Side-by-Side Header (Small Image + Title) */}
              <div className="coach-mobile-header">
                <div
                  className="coach-mobile-photo"
                  onClick={() => openLightbox([COACH_IMAGE], 0)}
                >
                  <img
                    src={COACH_IMAGE.src}
                    alt={COACH_IMAGE.alt}
                    referrerPolicy="no-referrer"
                  />
                  <div className="coach-mobile-cap">Gold Medalist</div>
                </div>
                <div>
                  <span className="eyebrow">Founder &amp; Head Coach</span>
                  <h2 className="coach-name">
                    COACH <span className="accent">ABHISHEK AMIN</span>
                  </h2>
                  <p className="coach-sub">
                    Founder &middot; Clinical Nutritionist &middot; Bodybuilding Coach
                  </p>
                </div>
              </div>

              <blockquote className="coach-quote">
                &ldquo;Nutrition Made Simple. Training Made Smart.&rdquo;
              </blockquote>

              <p className="coach-p">
                Abhishek Amin is the founder of <strong>XFITNESS</strong> — Udupi&apos;s most
                trusted unisex gym. With <strong>14+ years</strong> of hands-on experience in
                fitness coaching, competitive bodybuilding, and clinical nutrition, he established{' '}
                <strong>Branch 01 at Saibrakatte</strong> in March 2019 and expanded to{' '}
                <strong>Branch 02 at Kokkarne</strong>.
              </p>

              <p className="coach-p">
                A certified <strong>Nutritionist</strong> and contest preparation coach, his
                athletes have won medals at <strong>district, state, and national levels</strong> —
                including 1st Place Gold at the Bangalore Open Bodybuilding Championship.
              </p>

              <div className="coach-stats-bar">
                <div className="cs-box">
                  <div className="cs-num">14+</div>
                  <div className="cs-lbl">Years Exp.</div>
                </div>
                <div className="cs-box">
                  <div className="cs-num">500+</div>
                  <div className="cs-lbl">Athletes</div>
                </div>
                <div className="cs-box">
                  <div className="cs-num">02</div>
                  <div className="cs-lbl">Branches</div>
                </div>
                <div className="cs-box">
                  <div className="cs-num">40K+</div>
                  <div className="cs-lbl">Followers</div>
                </div>
              </div>

              <div className="coach-badges">
                <div className="c-badge">
                  <span>&bull;</span> 14+ Years Coaching Experience
                </div>
                <div className="c-badge">
                  <span>&bull;</span> Certified Clinical Nutritionist
                </div>
                <div className="c-badge">
                  <span>&bull;</span> Competitive Bodybuilding Coach
                </div>
                <div className="c-badge">
                  <span>&bull;</span> District, State &amp; National Athletes
                </div>
              </div>

              <div className="coach-actions">
                <a
                  href="https://www.instagram.com/abhishek__kannada/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Instagram size={16} className="shrink-0 text-[#e01a2b]" />
                  <span>@abhishek__kannada</span>
                </a>
                <button
                  type="button"
                  onClick={() => selectProgramAndScroll('Personal Training')}
                  className="btn btn-primary"
                >
                  Enquire Coaching
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES / PROGRAMS */}
      <section className="section" id="services">
        <div className="container">
          <div className="sec-header">
            <div>
              <span className="eyebrow">Training &amp; Nutrition</span>
              <h2 className="sec-title">
                WORLD-CLASS <span className="accent">PROGRAMS</span>
              </h2>
            </div>
            <p className="sec-desc">
              Structured strength, conditioning, and clinical nutrition programs across our
              Saibrakatte and Kokkarne branches.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((svc) => (
              <div key={svc.num} className="service-card">
                <div>
                  <div className="svc-index">{svc.num}</div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                </div>
                <div className="svc-meta">
                  <span>{svc.schedule}</span>
                  <button
                    type="button"
                    className="svc-btn"
                    onClick={() => selectProgramAndScroll(svc.formGoal)}
                  >
                    Enquire <span>&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCH 01 GALLERY: SAIBRAKATTE (FIRST) */}
      <section className="section" id="saibrakatte-gallery">
        <div className="container">
          <div className="sec-header">
            <div>
              <span className="eyebrow">Branch 01 &middot; Est. March 2019</span>
              <h2 className="sec-title">
                XFITNESS <span className="accent">SAIBRAKATTE</span>
              </h2>
            </div>
            <p className="sec-desc">
              2nd Floor, Shobha Arcade, Supermarket Building Circle, Saibrakatte, Udupi – 576210
            </p>
          </div>

          <div className="branch-info-strip">
            <div>
              <strong>Location:</strong> 2nd Floor, Shobha Arcade, Saibrakatte
            </div>
            <div>
              <strong>Timings:</strong> 5:30 AM – 2:30 PM &amp; 3:30 PM – 10:30 PM
            </div>
          </div>

          <div className="gal-grid-sab">
            {SAIBRAKATTE_IMAGES.map((item, idx) => (
              <div
                key={item.src}
                className={`g-item ${item.wide ? 'gal-sab-wide' : ''}`}
                onClick={() => openLightbox(SAIBRAKATTE_IMAGES, idx)}
              >
                <img src={item.src} alt={item.alt} loading="lazy" referrerPolicy="no-referrer" />
                <div className="g-caption">
                  {item.caption} <span>+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCH 02 GALLERY: KOKKARNE (SECOND) */}
      <section className="section" id="kokkarne-gallery">
        <div className="container">
          <div className="sec-header">
            <div>
              <span className="eyebrow">Branch 02 &middot; Full Equipment Facility</span>
              <h2 className="sec-title">
                XFITNESS <span className="accent">KOKKARNE</span>
              </h2>
            </div>
            <p className="sec-desc">
              Sri Laxmi Arcade, Main Road, Near Indian Petrol Pump, Kokkarne, Pejamangoor – 576234
            </p>
          </div>

          <div className="branch-info-strip">
            <div>
              <strong>Location:</strong> Sri Laxmi Arcade, Near Indian Petrol Pump, Kokkarne
            </div>
            <div>
              <strong>Facility:</strong> Full Strength Floor &middot; Sled Turf &middot; Heavy Squat
              Racks
            </div>
          </div>

          <div className="gal-grid-kok">
            {KOKKARNE_IMAGES.map((item, idx) => (
              <div
                key={item.src}
                className="g-item"
                onClick={() => openLightbox(KOKKARNE_IMAGES, idx)}
              >
                <img src={item.src} alt={item.alt} loading="lazy" referrerPolicy="no-referrer" />
                <div className="g-caption">
                  {item.caption} <span>+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section className="section" id="transformations">
        <div className="container">
          <div className="sec-header">
            <div>
              <span className="eyebrow">Documented Member Outcomes</span>
              <h2 className="sec-title">
                REAL <span className="accent">TRANSFORMATIONS</span>
              </h2>
            </div>
            <div className="filter-tabs" role="tablist" aria-label="Filter transformations">
              <button
                type="button"
                className={`filter-tab ${transFilter === 'all' ? 'active' : ''}`}
                onClick={() => setTransFilter('all')}
              >
                All ({TRANSFORMATIONS.length})
              </button>
              <button
                type="button"
                className={`filter-tab ${transFilter === 'muscle' ? 'active' : ''}`}
                onClick={() => setTransFilter('muscle')}
              >
                Muscle Gain
              </button>
              <button
                type="button"
                className={`filter-tab ${transFilter === 'fatloss' ? 'active' : ''}`}
                onClick={() => setTransFilter('fatloss')}
              >
                Fat Loss
              </button>
              <button
                type="button"
                className={`filter-tab ${transFilter === 'ladies' ? 'active' : ''}`}
                onClick={() => setTransFilter('ladies')}
              >
                Ladies Fitness
              </button>
            </div>
          </div>

          <div className="transform-grid">
            {filteredTransformations.map((item, idx) => (
              <div
                key={item.src}
                className="t-card"
                onClick={() => openLightbox(filteredTransformations, idx)}
              >
                <div className="t-img-box">
                  <img src={item.src} alt={item.alt} loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <div className="t-meta">
                  <span>{item.title}</span>
                  <span className="t-sub">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE NUTRITION & MACRO TARGET CALCULATOR */}
      <section className="section" id="calculator">
        <div className="container">
          <div className="sec-header">
            <div>
              <span className="eyebrow">Nutrition Made Simple</span>
              <h2 className="sec-title">
                DAILY MACRO &amp; <span className="accent">BMI CALCULATOR</span>
              </h2>
            </div>
            <p className="sec-desc">
              Estimate your BMI, daily calorie intake, and protein requirement based on your body
              metrics and training goal.
            </p>
          </div>

          <div className="calc-box">
            <div className="calc-inputs">
              <div className="calc-grid">
                <div className="field">
                  <label htmlFor="calcWeight">Weight (kg)</label>
                  <input
                    id="calcWeight"
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g. 68"
                    value={weightKg}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, '');
                      setWeightKg(val);
                      if (calcError) setCalcError(null);
                      if (committedInputs) setCommittedInputs(null);
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="calcHeight">Height (Ft.In / Ft)</label>
                  <input
                    id="calcHeight"
                    type="text"
                    placeholder="e.g. 5 feet 1 inches or 5.1"
                    value={heightCm}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, '');
                      setHeightCm(val);
                      if (calcError) setCalcError(null);
                      if (committedInputs) setCommittedInputs(null);
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="calcAge">Age (Years)</label>
                  <input
                    id="calcAge"
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 25"
                    value={ageYears}
                    onChange={(e) => {
                      const val = e.target.value.replace(/^0+(?=\d)/, '');
                      setAgeYears(val);
                      if (calcError) setCalcError(null);
                      if (committedInputs) setCommittedInputs(null);
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="calcGender">Gender</label>
                  <select
                    id="calcGender"
                    value={gender}
                    onChange={(e) => handleGenderSelect(e.target.value as 'male' | 'female')}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Primary Training Goal</label>
                <div className="calc-goal-tabs">
                  <button
                    type="button"
                    className={`filter-tab ${calcGoal === 'muscle' ? 'active' : ''}`}
                    onClick={() => handleGoalSelect('muscle')}
                  >
                    Muscle Gain
                  </button>
                  <button
                    type="button"
                    className={`filter-tab ${calcGoal === 'fatloss' ? 'active' : ''}`}
                    onClick={() => handleGoalSelect('fatloss')}
                  >
                    Fat Loss
                  </button>
                  <button
                    type="button"
                    className={`filter-tab ${calcGoal === 'recomp' ? 'active' : ''}`}
                    onClick={() => handleGoalSelect('recomp')}
                  >
                    Body Recomp
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCalculateTargets()}
                className="btn btn-primary calc-submit-btn"
              >
                Calculate Targets
              </button>

              {calcError && <div className="form-err mt-2.5">{calcError}</div>}
            </div>

            <div className="calc-results">
              <div>
                <div className="eyebrow">
                  {nutritionStats ? nutritionStats.goalTitle : 'Recommended Daily Targets'}
                </div>
                <p className="text-xs text-[#969696]">
                  {nutritionStats
                    ? `Calculated for ${committedInputs?.w}kg, ${committedInputs?.hLabel}, Age ${committedInputs?.a} (4–5 gym sessions/week):`
                    : 'Enter your Weight, Height (e.g. 5 feet 1 inches or 5.11), and Age, then press Calculate Targets:'}
                </p>

                <div className="calc-metrics">
                  <div className="calc-metric-card">
                    <div className="cm-num">{nutritionStats ? nutritionStats.bmi : '--'}</div>
                    <div className="cm-label">
                      BMI {nutritionStats ? `· ${nutritionStats.bmiCategory}` : ''}
                    </div>
                  </div>
                  <div className="calc-metric-card">
                    <div className="cm-num">
                      {nutritionStats ? nutritionStats.tdee : '--'}
                      <span>kcal</span>
                    </div>
                    <div className="cm-label">Maintenance TDEE</div>
                  </div>
                  <div className="calc-metric-card">
                    <div className="cm-num">
                      {nutritionStats ? nutritionStats.targetCalories : '--'}
                      <span>kcal</span>
                    </div>
                    <div className="cm-label">
                      {nutritionStats ? nutritionStats.calDiffLabel : 'Target Calories'}
                    </div>
                  </div>
                  <div className="calc-metric-card">
                    <div className="cm-num">
                      {nutritionStats ? nutritionStats.proteinGrams : '--'}
                      <span>g</span>
                    </div>
                    <div className="cm-label">
                      Protein {nutritionStats ? `(${nutritionStats.proteinRateLabel})` : ''}
                    </div>
                  </div>
                  <div className="calc-metric-card">
                    <div className="cm-num">
                      {nutritionStats ? nutritionStats.carbGrams : '--'}
                      <span>g</span>
                    </div>
                    <div className="cm-label">Daily Carbs</div>
                  </div>
                  <div className="calc-metric-card">
                    <div className="cm-num">
                      {nutritionStats ? nutritionStats.fatGrams : '--'}
                      <span>g</span>
                    </div>
                    <div className="cm-label">Daily Fats</div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={applyCalculatorToEnquiry}
                className="btn btn-outline calc-submit-btn"
              >
                Use These Targets &amp; Enquire Diet Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE STRIP */}
      <div className="schedule-band">
        <div className="container schedule-grid">
          <div className="sched-cell">
            <div className="sched-lbl">Morning Shift</div>
            <div className="sched-val">5:30 AM – 2:30 PM</div>
          </div>
          <div className="sched-cell">
            <div className="sched-lbl">Evening Shift</div>
            <div className="sched-val">3:30 PM – 10:30 PM</div>
          </div>
          <div className="sched-cell">
            <div className="sched-lbl">Direct Phone</div>
            <div className="sched-val">+91 87629 80051</div>
          </div>
          <div className="sched-cell">
            <div className="sched-lbl">Payments Accepted</div>
            <div className="sched-val">UPI, GPay &amp; Cash</div>
          </div>
        </div>
      </div>

      {/* BRANCHES & DIRECTIONS */}
      <section className="section" id="branches">
        <div className="container">
          <div className="sec-header">
            <div>
              <span className="eyebrow">Find Us</span>
              <h2 className="sec-title">
                OUR TWO <span className="accent">BRANCHES</span>
              </h2>
            </div>
            <p className="sec-desc">
              Choose the location closest to you and walk in today — no appointment needed.
            </p>
          </div>

          <div className="branches-grid">
            {/* Branch 01: Saibrakatte */}
            <div className="branch-card">
              <div className="branch-head">
                <h3>
                  XFITNESS <span className="accent">SAIBRAKATTE</span>
                </h3>
                <span className="branch-label">Branch 01</span>
              </div>
              <div className="branch-map">
                <iframe
                  title="Saibrakatte Branch Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d74.7554!3d13.3425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc9744bff6ab61%3A0xc8130da44c800f8b!2sXFITNESS%20SAIBRAKATTE!5e0!3m2!1sen!2sin!4v1683000000000"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="branch-body">
                <div className="b-row">
                  <span className="b-lbl">Address</span>
                  <span>
                    2nd Floor, Shobha Arcade, Supermarket Building Circle, Saibrakatte, Udupi –
                    576210
                  </span>
                </div>
                <div className="b-row">
                  <span className="b-lbl">Timings</span>
                  <span>5:30 AM – 2:30 PM &amp; 3:30 PM – 10:30 PM</span>
                </div>
                <div className="b-row">
                  <span className="b-lbl">Contact</span>
                  <span>+91 87629 80051 &middot; UPI &amp; Cash Accepted</span>
                </div>
              </div>
              <div className="branch-foot">
                <a
                  href="https://www.google.com/maps/dir//XFITNESS+SAIBRAKATTE,+Saibrakatte,+Udupi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline flex-1"
                >
                  Get Directions
                </a>
                <button
                  type="button"
                  onClick={() => selectBranchAndScroll('Branch 01 - Saibrakatte')}
                  className="btn btn-primary flex-1"
                >
                  Join Branch 01
                </button>
              </div>
            </div>

            {/* Branch 02: Kokkarne */}
            <div className="branch-card">
              <div className="branch-head">
                <h3>
                  XFITNESS <span className="accent">KOKKARNE</span>
                </h3>
                <span className="branch-label">Branch 02</span>
              </div>
              <div className="branch-map">
                <iframe
                  title="Kokkarne Branch Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d74.8431329!3d13.4583987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc999b3a7f8717%3A0xafa387eebc2f075f!2sXFITNESS%20KOKKARNE!5e0!3m2!1sen!2sin!4v1683000000001"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="branch-body">
                <div className="b-row">
                  <span className="b-lbl">Address</span>
                  <span>
                    Sri Laxmi Arcade, Main Road, Near Indian Petrol Pump, Kokkarne, Pejamangoor –
                    576234
                  </span>
                </div>
                <div className="b-row">
                  <span className="b-lbl">Timings</span>
                  <span>5:30 AM – 9:30 PM (Contact for full schedule)</span>
                </div>
                <div className="b-row">
                  <span className="b-lbl">Contact</span>
                  <span>+91 87629 80051 &middot; UPI &amp; Cash Accepted</span>
                </div>
              </div>
              <div className="branch-foot">
                <a
                  href="https://www.google.com/maps/dir//XFITNESS+KOKKARNE,+Kokkarne,+Pejamangoor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline flex-1"
                >
                  Get Directions
                </a>
                <button
                  type="button"
                  onClick={() => selectBranchAndScroll('Branch 02 - Kokkarne')}
                  className="btn btn-primary flex-1"
                >
                  Join Branch 02
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section" id="contact">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2 className="sec-title">
              CONTACT <span className="accent">XFITNESS</span>
            </h2>
            <p className="sec-desc mt-2.5">
              Walk in to either branch, call us directly, or send an enquiry below.
            </p>

            <div className="contact-cards">
              <div className="c-info-box">
                <div className="c-info-lbl">Branch 01 — Saibrakatte</div>
                <div className="c-info-val">2nd Floor, Shobha Arcade, Saibrakatte</div>
                <div className="c-info-sub">Supermarket Building Circle, Udupi – 576210</div>
              </div>

              <div className="c-info-box">
                <div className="c-info-lbl">Branch 02 — Kokkarne</div>
                <div className="c-info-val">Sri Laxmi Arcade, Near Indian Petrol Pump</div>
                <div className="c-info-sub">Main Road, Kokkarne, Pejamangoor – 576234</div>
              </div>

              <div className="c-info-box">
                <div className="c-info-lbl">Direct Phone &amp; WhatsApp</div>
                <div className="c-info-val">
                  <a href="tel:+918762980051">+91 87629 80051</a>
                </div>
                <div className="c-info-sub">Hours: 5:30 AM – 2:30 PM &amp; 3:30 PM – 10:30 PM</div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <h3>SEND AN ENQUIRY</h3>
            <p>Select your preferred branch and program — message us directly on WhatsApp.</p>

            <div className="form-row">
              <div className="field">
                <label htmlFor="uName">Your Name *</label>
                <input
                  type="text"
                  id="uName"
                  placeholder="Full Name"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="uPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="uPhone"
                  placeholder="10-digit Mobile Number"
                  value={uPhone}
                  onChange={(e) => setUPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="uBranch">Select Branch *</label>
                <select
                  id="uBranch"
                  value={uBranch}
                  onChange={(e) => setUBranch(e.target.value)}
                  required
                >
                  <option value="Branch 01 - Saibrakatte">Branch 01 — Saibrakatte</option>
                  <option value="Branch 02 - Kokkarne">Branch 02 — Kokkarne</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="uGoal">Program</label>
                <select id="uGoal" value={uGoal} onChange={(e) => setUGoal(e.target.value)}>
                  <option value="Gym Membership">Gym Membership</option>
                  <option value="Personal Training">Personal Training</option>
                  <option value="Weight Loss / Muscle Gain">Weight Loss / Muscle Gain</option>
                  <option value="Diet Consultation">Diet Consultation</option>
                  <option value="Bodybuilding Coaching">Bodybuilding Coaching</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="uMsg">Your Message</label>
              <textarea
                id="uMsg"
                rows={3}
                placeholder="Any questions about timings, fees, or coaching..."
                value={uMsg}
                onChange={(e) => setUMsg(e.target.value)}
              ></textarea>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              WhatsApp Us
            </a>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              {!logoError ? (
                <img
                  src={LOGO_SRC}
                  alt="XFITNESS"
                  className="f-logo"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="nav-brand-text mb-3">
                  <span className="accent">X</span>FITNESS
                </div>
              )}
              <p className="f-desc">
                Udupi&apos;s Premier Unisex Gym. Transforming lives through structured strength
                coaching and clinical nutrition since March 2019.
              </p>
            </div>

            <div>
              <div className="f-title">Quick Links</div>
              <ul className="f-list">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#owner">Head Coach</a>
                </li>
                <li>
                  <a href="#services">Programs</a>
                </li>
                <li>
                  <a href="#transformations">Transformations</a>
                </li>
                <li>
                  <a href="#calculator">Macro Calculator</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="f-title">Our Branches</div>
              <ul className="f-list">
                <li>
                  <a href="#saibrakatte-gallery">01. Saibrakatte, Udupi</a>
                </li>
                <li>
                  <a href="#kokkarne-gallery">02. Kokkarne, Pejamangoor</a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/abhishek__kannada/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @abhishek__kannada
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="f-title">Gym Hours</div>
              <ul className="f-list">
                <li>Morning: 5:30 AM – 2:30 PM</li>
                <li>Evening: 3:30 PM – 10:30 PM</li>
                <li className="text-white font-semibold mt-1.5">
                  <a href="tel:+918762980051">Call: +91 87629 80051</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-copy">
            <span>&copy; 2026 XFITNESS. All Rights Reserved.</span>
            <span>Saibrakatte &amp; Kokkarne, Udupi, Karnataka</span>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM STICKY BAR */}
      <div className="mobile-sticky">
        <a href="tel:+918762980051" className="ms-call">
          Call 87629 80051
        </a>
        <a href="#contact" className="ms-join">
          Join Now
        </a>
      </div>

      {/* LIGHTBOX MODAL */}
      <div
        className={`lightbox ${lbOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
        onTouchStart={(e) => setTouchStartX(e.changedTouches[0].screenX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 45) {
            if (diff > 0) nextLightbox();
            else prevLightbox();
          }
          setTouchStartX(null);
        }}
      >
        <button className="lb-btn lb-close" aria-label="Close" onClick={closeLightbox}>
          &#x2715;
        </button>
        {lbGroup.length > 1 && (
          <button
            className="lb-btn lb-prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
          >
            &#8249;
          </button>
        )}
        {lbGroup[lbIndex] && (
          <img
            src={lbGroup[lbIndex].src}
            alt={lbGroup[lbIndex].alt}
            className="lb-img"
            referrerPolicy="no-referrer"
          />
        )}
        {lbGroup.length > 1 && (
          <button
            className="lb-btn lb-next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
          >
            &#8250;
          </button>
        )}
        <div className="lb-counter">
          {lbIndex + 1} / {lbGroup.length || 1}
        </div>
      </div>
    </>
  );
}
