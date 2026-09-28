import { useRef, useState } from "react";
import { identity } from "../data/profile";

/* ---------- Part catalogues ---------- */

const SKIN = "#ffd84d";
const SEAM = "rgba(0, 0, 0, 0.28)";
const WHITE = "#f0efe9";
const INK = "#171720";

const BATTALION = {
  "501": "#2c5aa8",
  shock: "#c1272d",
  gree: "#3e5e3a",
  "332": "#d9622b",
} as const;

const HEADGEAR = [
  { id: "hair", label: "Padawan Hair" },
  { id: "bun", label: "Twin Buns" },
  { id: "jedi", label: "Jedi Hood" },
  { id: "sith", label: "Sith Hood" },
  { id: "mando", label: "Mando Helm" },
  { id: "trooper", label: "Trooper Helm" },
  { id: "pilot", label: "Pilot Helm" },
  { id: "clone-501", label: "501st Helm" },
  { id: "clone-shock", label: "Shock Helm" },
  { id: "clone-gree", label: "Gree Helm" },
  { id: "clone-332", label: "332nd Helm" },
  { id: "yoda-head", label: "Master Ears" },
  { id: "wookiee-head", label: "Wookiee Fur" },
  { id: "grievous-head", label: "Droid Skull" },
] as const;

const FACES = [
  { id: "smile", label: "Classic Smile" },
  { id: "grin", label: "Big Grin" },
  { id: "stern", label: "Determined" },
  { id: "wink", label: "Wink" },
  { id: "teeth-smile", label: "Toothy Smile" },
  { id: "angry-shout", label: "Angry Shout" },
  { id: "angry-teeth", label: "Gritting Teeth" },
  { id: "sad", label: "Sad Frown" },
  { id: "nervous", label: "Nervous" },
  { id: "crying", label: "Crying" },
  { id: "shocked", label: "Shocked" },
  { id: "sleepy", label: "Sleepy" },
  { id: "neutral", label: "Unimpressed" },
  { id: "raised-brow", label: "Raised Brow" },
  { id: "maul-tattoos", label: "Sith Tattoos" },
] as const;

const TORSOS = [
  { id: "jedi", label: "Jedi Robes", color: "#c9b38a" },
  { id: "sith", label: "Sith Suit", color: "#2b2733" },
  { id: "beskar", label: "Beskar Armor", color: "#8aa39b" },
  { id: "trooper", label: "Trooper Plate", color: WHITE },
  { id: "pilot", label: "Pilot Suit", color: "#e8762c" },
  { id: "royal", label: "Royal Garb", color: "#7a4988" },
  { id: "droid", label: "Droid Plating", color: "#9aa0a8" },
  { id: "clone-501", label: "501st Armor", color: WHITE },
  { id: "clone-shock", label: "Shock Armor", color: WHITE },
  { id: "clone-gree", label: "Gree Armor", color: WHITE },
  { id: "clone-332", label: "332nd Armor", color: WHITE },
  { id: "han-vest", label: "Smuggler Vest", color: "#f0f0f0" },
  { id: "maul-robes", label: "Dathomir Robes", color: "#111116" },
  { id: "yoda-robes", label: "Master Tunic", color: "#b8a483" },
  { id: "wookiee-torso", label: "Wookiee Body", color: "#4f3521" },
  { id: "grievous-torso", label: "General Shell", color: "#d2d2d6" },
] as const;

const LEGS = [
  { id: "tan", label: "Desert Tan", color: "#c9b38a" },
  { id: "black", label: "Shadow Black", color: "#2b2733" },
  { id: "beskar", label: "Beskar Green", color: "#5f7a5a" },
  { id: "white", label: "Trooper White", color: WHITE },
  { id: "pilot", label: "Pilot Orange", color: "#e8762c" },
  { id: "brown", label: "Smuggler Brown", color: "#6e4a2f" },
  { id: "gray", label: "Droid Gray", color: "#9aa0a8" },
  { id: "clone-501", label: "501st Legs", color: WHITE },
  { id: "clone-shock", label: "Shock Legs", color: WHITE },
  { id: "clone-camo", label: "Camo Legs", color: "#3e5e3a" },
  { id: "clone-332", label: "332nd Legs", color: WHITE },
  { id: "han-legs", label: "Corellian Pants", color: "#192436" },
  { id: "maul-legs", label: "Sith Wraps", color: "#111116" },
  { id: "yoda-short", label: "Short Legs", color: "#c9b38a" },
  { id: "wookiee-legs", label: "Wookiee Legs", color: "#4f3521" },
  { id: "grievous-legs", label: "Clawed Talons", color: "#9aa0a8" },
] as const;

const GEAR = [
  { id: "saber-blue", label: "Blue Saber", color: "#4bd5ee" },
  { id: "saber-green", label: "Green Saber", color: "#6fe86f" },
  { id: "saber-red", label: "Red Saber", color: "#ff5252" },
  { id: "saber-purple", label: "Purple Saber", color: "#b06fe8" },
  { id: "saber-maul", label: "Sith Saberstaff", color: "#ff5252" },
  { id: "blaster", label: "Blaster", color: "#33333d" },
  { id: "rifle", label: "DC-15 Rifle", color: "#22222a" },
  { id: "bowcaster", label: "Bowcaster", color: "#22222a" },
  { id: "spanner", label: "Hydrospanner", color: "#9a9aa5" },
  { id: "none", label: "Unarmed", color: "" },
] as const;

type HeadgearId = (typeof HEADGEAR)[number]["id"];
type FaceId = (typeof FACES)[number]["id"];
type TorsoId = (typeof TORSOS)[number]["id"];
type LegsId = (typeof LEGS)[number]["id"];
type GearId = (typeof GEAR)[number]["id"];

interface FigConfig {
  headgear: HeadgearId;
  face: FaceId;
  torso: TorsoId;
  legs: LegsId;
  gear: GearId;
}

const FACE_HIDDEN: readonly HeadgearId[] = [
  "mando",
  "trooper",
  "clone-501",
  "clone-shock",
  "clone-gree",
  "clone-332",
];

const HEAD_OVERRIDDEN: readonly HeadgearId[] = ["yoda-head", "wookiee-head", "grievous-head"];
const ARMS_OVERRIDDEN: readonly TorsoId[] = ["grievous-torso"];
const LEGS_OVERRIDDEN: readonly LegsId[] = ["yoda-short", "grievous-legs"];

const CATEGORIES = [
  { id: "headgear", label: "Head" },
  { id: "face", label: "Face" },
  { id: "torso", label: "Torso" },
  { id: "legs", label: "Legs" },
  { id: "gear", label: "Gear" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

/* ------------------------------------------------------------------
   Minifig geometry (viewBox 0 0 200 230) — real minifigure proportions:
   stud y50 · head y58–94 · torso y100–155 · hips y155–167 · legs y167–217
   ------------------------------------------------------------------ */

function FacePaint({ face }: { face: FaceId }) {
  const cInk = "#3a2c1a";
  const cWhite = "#ffffff";
  const cWater = "#7abce6";

  let leftEye = <circle cx="91" cy="74" r="2.7" fill={cInk} />;
  let rightEye = <circle cx="109" cy="74" r="2.7" fill={cInk} />;
  let brows: React.ReactNode = null;
  let mouth: React.ReactNode = null;
  let extra: React.ReactNode = null;

  switch (face) {
    case "smile":
      mouth = <path d="M90 81 Q100 88 110 81" stroke={cInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      break;
    case "grin":
      mouth = <path d="M88 81 Q100 92 112 81 Z" fill={cInk} />;
      break;
    case "stern":
      brows = (
        <>
          <path d="M85 67.5 L96 70" stroke={cInk} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M115 67.5 L104 70" stroke={cInk} strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
      mouth = <path d="M90 81 Q100 88 110 81" stroke={cInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      break;
    case "wink":
      leftEye = <path d="M86.5 74 L95.5 74" stroke={cInk} strokeWidth="2.4" strokeLinecap="round" />;
      mouth = <path d="M90 81 Q100 88 110 81" stroke={cInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      break;
    case "teeth-smile":
      mouth = (
        <g>
          <path d="M88 81 Q100 90 112 81 Z" fill={cWhite} stroke={cInk} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M89 81 Q100 84 111 81" stroke={cInk} strokeWidth="1" fill="none" />
        </g>
      );
      break;
    case "angry-shout":
      brows = (
        <>
          <path d="M84 66 L96 71" stroke={cInk} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M116 66 L104 71" stroke={cInk} strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
      mouth = (
        <g>
          <path d="M88 80 Q100 77 112 80 L110 87 Q100 92 90 87 Z" fill={cInk} />
          <path d="M89 80.5 Q100 78 111 80.5" stroke={cWhite} strokeWidth="2.5" fill="none" />
        </g>
      );
      break;
    case "angry-teeth":
      brows = (
        <>
          <path d="M84 66 L96 71" stroke={cInk} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M116 66 L104 71" stroke={cInk} strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
      mouth = (
        <g>
          <rect x="88" y="79" width="24" height="6" rx="1" fill={cWhite} stroke={cInk} strokeWidth="1.5" />
          <path d="M94 79 V85 M100 79 V85 M106 79 V85 M88 82 H112" stroke={cInk} strokeWidth="1" />
        </g>
      );
      break;
    case "sad":
      brows = (
        <>
          <path d="M86 70 L94 67" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
          <path d="M114 70 L106 67" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
        </>
      );
      mouth = <path d="M90 86 Q100 79 110 86" stroke={cInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      break;
    case "nervous":
      brows = (
        <>
          <path d="M86 70 L94 67" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
          <path d="M114 70 L106 67" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
        </>
      );
      mouth = <path d="M92 84 Q100 81 108 84" stroke={cInk} strokeWidth="2" fill="none" strokeLinecap="round" />;
      extra = <path d="M82 67 Q79 73 82 76 Q85 73 82 67 Z" fill={cWater} />;
      break;
    case "crying":
      brows = (
        <>
          <path d="M86 70 L94 67" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
          <path d="M114 70 L106 67" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
        </>
      );
      mouth = <path d="M88 85 Q100 76 112 85 Q100 91 88 85 Z" fill={cInk} />;
      extra = <path d="M90 77 Q87 83 90 86 Q93 83 90 77 Z" fill={cWater} />;
      break;
    case "shocked":
      brows = (
        <>
          <path d="M86 67 Q91 65 96 67" stroke={cInk} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M114 67 Q109 65 104 67" stroke={cInk} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
      mouth = <ellipse cx="100" cy="85" rx="4.5" ry="6.5" fill={cInk} />;
      break;
    case "sleepy":
      leftEye = <path d="M87 75 Q91 73 95 75" stroke={cInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      rightEye = <path d="M105 75 Q109 73 113 75" stroke={cInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      mouth = <path d="M94 82 Q100 84 106 82" stroke={cInk} strokeWidth="1.8" fill="none" strokeLinecap="round" />;
      break;
    case "neutral":
      mouth = <path d="M92 82 H108" stroke={cInk} strokeWidth="2.2" strokeLinecap="round" />;
      break;
    case "raised-brow":
      brows = (
        <>
          <path d="M85 68 L95 68" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
          <path d="M115 65 L105 67" stroke={cInk} strokeWidth="2" strokeLinecap="round" />
        </>
      );
      mouth = <path d="M92 83 Q100 84 108 81" stroke={cInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      break;
    case "maul-tattoos":
      // Override the yellow skin with red for Maul's face, then draw black tattoos and yellow/red eyes
      leftEye = (
        <g>
          <rect x="79" y="57" width="42" height="38" rx="9" fill="#d02b2b" />
          <path d="M100 58 Q95 70 85 70 Q90 85 100 95 Q110 85 115 70 Q105 70 100 58 Z" fill="#111" />
          <path d="M79 66 Q88 66 88 58 M121 66 Q112 66 112 58 M79 84 Q88 84 88 94 M121 84 Q112 84 112 94" fill="none" stroke="#111" strokeWidth="3" />
          <circle cx="91" cy="74" r="3.5" fill="#f4d03f" />
          <circle cx="91" cy="74" r="1.5" fill="#d35400" />
        </g>
      );
      rightEye = (
        <g>
          <circle cx="109" cy="74" r="3.5" fill="#f4d03f" />
          <circle cx="109" cy="74" r="1.5" fill="#d35400" />
        </g>
      );
      mouth = (
        <path d="M92 84 Q100 86 108 84" stroke="#111" strokeWidth="2" fill="none" />
      );
      break;
  }

  return (
    <>
      {leftEye}
      {rightEye}
      {brows}
      {mouth}
      {extra}
    </>
  );
}

function CapePaint({ headgear }: { headgear: HeadgearId }) {
  if (headgear !== "jedi" && headgear !== "sith") return null;
  const color = headgear === "jedi" ? "#6e5233" : "#141119";
  return <path d="M76 100 Q58 130 62 164 L138 164 Q142 130 124 100 Z" fill={color} />;
}

/** Phase-II clone helmet with crest fin, brow visor, cheek lines and battalion markings. */
function CloneHelm({ accent }: { accent: string }) {
  return (
    <>
      <rect x="96" y="45" width="8" height="10" rx="3" fill={WHITE} />
      <rect x="77" y="51" width="46" height="45" rx="13" fill={WHITE} />
      <rect x="92" y="51" width="4" height="12" fill={accent} />
      <rect x="104" y="51" width="4" height="12" fill={accent} />
      <path d="M82 70 Q100 61 118 70 L118 75 Q100 67 82 75 Z" fill={INK} />
      <path d="M98 72 L98 88 Q98 91 100 91 Q102 91 102 88 L102 72" fill={INK} />
      <path d="M84 79 L91 87" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M116 79 L109 87" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="78" y="75" width="5" height="11" rx="1.5" fill={accent} />
      <rect x="117" y="75" width="5" height="11" rx="1.5" fill={accent} />
      <path d="M87 92 H95 M105 92 H113" stroke={INK} strokeWidth="2" />
    </>
  );
}

function HeadgearPaint({ headgear }: { headgear: HeadgearId }) {
  switch (headgear) {
    case "hair":
      return (
        <path
          d="M78 72 Q76 50 100 49 Q124 50 122 72 L122 64 Q120 57 106 57 L102 63 L96 57 Q80 57 78 64 Z"
          fill="#5b3a1e"
        />
      );
    case "bun":
      return (
        <>
          <path d="M78 72 Q76 50 100 49 Q124 50 122 72 L122 63 Q118 56 100 56 Q82 56 78 63 Z" fill="#2b2118" />
          <circle cx="75" cy="70" r="8.5" fill="#2b2118" />
          <circle cx="125" cy="70" r="8.5" fill="#2b2118" />
        </>
      );
    case "jedi":
      return <path d="M74 102 Q62 58 100 50 Q138 58 126 102 Q122 84 100 82 Q78 84 74 102 Z" fill="#8a6d45" />;
    case "sith":
      return <path d="M74 102 Q62 58 100 50 Q138 58 126 102 Q122 84 100 82 Q78 84 74 102 Z" fill="#1d1a26" />;
    case "mando":
      return (
        <>
          <rect x="77" y="53" width="46" height="43" rx="10" fill="#8aa39b" />
          <rect x="97" y="68" width="6" height="26" rx="2" fill={INK} />
          <rect x="83" y="68" width="34" height="7" rx="3" fill={INK} />
          <rect x="121" y="52" width="4" height="16" rx="2" fill="#55625d" />
          <rect x="119" y="50" width="10" height="4" rx="2" fill="#55625d" />
        </>
      );
    case "trooper":
      return (
        <>
          <rect x="77" y="52" width="46" height="45" rx="12" fill={WHITE} />
          <path d="M83 73 Q100 82 117 73" stroke={INK} strokeWidth="4" fill="none" />
          <rect x="92" y="85" width="16" height="6" rx="2" fill={INK} opacity="0.8" />
          <circle cx="82" cy="86" r="2.5" fill={INK} opacity="0.6" />
          <circle cx="118" cy="86" r="2.5" fill={INK} opacity="0.6" />
        </>
      );
    case "pilot":
      return (
        <>
          <rect x="77" y="52" width="46" height="34" rx="11" fill="#e8762c" />
          <rect x="95" y="52" width="10" height="34" fill={WHITE} />
          <rect x="74" y="66" width="8" height="14" rx="3" fill="#5a5566" />
          <rect x="118" y="66" width="8" height="14" rx="3" fill="#5a5566" />
          <circle cx="88" cy="60" r="2" fill="#5a5566" />
          <circle cx="112" cy="60" r="2" fill="#5a5566" />
        </>
      );
    case "clone-501":
      return <CloneHelm accent={BATTALION["501"]} />;
    case "clone-shock":
      return <CloneHelm accent={BATTALION.shock} />;
    case "clone-gree":
      return <CloneHelm accent={BATTALION.gree} />;
    case "clone-332":
      return <CloneHelm accent={BATTALION["332"]} />;
    case "yoda-head":
      return (
        <g>
          {/* left ear */}
          <path d="M80 70 L50 65 L80 80 Z" fill="#739b56" />
          {/* right ear */}
          <path d="M120 70 L150 65 L120 80 Z" fill="#739b56" />
          {/* head */}
          <rect x="76" y="55" width="48" height="40" rx="10" fill="#739b56" />
          {/* eyes */}
          <circle cx="90" cy="76" r="3.5" fill="#3a2c1a" />
          <circle cx="110" cy="76" r="3.5" fill="#3a2c1a" />
          <circle cx="89" cy="75" r="1.5" fill="#fff" />
          <circle cx="109" cy="75" r="1.5" fill="#fff" />
          {/* wrinkles/brows */}
          <path d="M82 70 Q90 68 98 72 M118 70 Q110 68 102 72 M90 62 Q100 65 110 62 M93 66 L107 66 M100 75 V80" fill="none" stroke="#507338" strokeWidth="2" strokeLinecap="round" />
          {/* mouth */}
          <path d="M93 88 Q100 90 107 88" stroke="#3a2c1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case "wookiee-head":
      return (
        <g>
          <path d="M75 100 Q70 70 85 55 Q100 45 115 55 Q130 70 125 100 Q130 115 125 125 Q100 135 75 125 Q70 115 75 100 Z" fill="#6a4c33" />
          <path d="M85 55 Q100 45 115 55 Q125 70 120 100 Q100 110 80 100 Q75 70 85 55 Z" fill="#886141" />
          {/* eyes */}
          <circle cx="92" cy="74" r="3" fill="#111" />
          <circle cx="108" cy="74" r="3" fill="#111" />
          <circle cx="91" cy="73" r="1" fill="#fff" />
          <circle cx="107" cy="73" r="1" fill="#fff" />
          {/* nose/snout */}
          <ellipse cx="100" cy="84" rx="4" ry="2.5" fill="#111" />
          {/* mouth/teeth */}
          <path d="M93 92 Q100 95 107 92" stroke="#111" strokeWidth="2.5" fill="none" />
          <path d="M94 92 L95 94 M97 93 L98 95 M103 93 L102 95 M106 92 L105 94" stroke="#fff" strokeWidth="1" fill="none" />
          {/* fur lines */}
          <path d="M100 50 L100 60 M90 55 L93 63 M110 55 L107 63 M80 80 L85 90 M120 80 L115 90 M78 110 L83 118 M122 110 L117 118" stroke="#4f3521" strokeWidth="2" strokeLinecap="round" />
        </g>
      );
    case "grievous-head":
      return (
        <g>
          {/* neck pipe */}
          <rect x="94" y="80" width="12" height="20" fill="#7a7a85" />
          <path d="M94 85 H106 M94 90 H106 M94 95 H106" stroke="#50505c" strokeWidth="2" />
          {/* skull base */}
          <path d="M85 90 Q85 45 100 45 Q115 45 115 90 Q115 110 100 110 Q85 110 85 90 Z" fill="#d2d2d6" />
          {/* side panels */}
          <path d="M85 70 Q70 80 80 100" stroke="#d2d2d6" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M115 70 Q130 80 120 100" stroke="#d2d2d6" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* eyes */}
          <path d="M90 70 Q95 65 98 70 L95 72 Z" fill="#e6a100" />
          <path d="M110 70 Q105 65 102 70 L105 72 Z" fill="#e6a100" />
          <circle cx="94.5" cy="69" r="1" fill="#111" />
          <circle cx="105.5" cy="69" r="1" fill="#111" />
          {/* face markings */}
          <path d="M90 70 Q95 65 98 70 M110 70 Q105 65 102 70" fill="none" stroke="#222" strokeWidth="1.5" />
          <path d="M96 75 L96 95 M100 75 L100 95 M104 75 L104 95" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
  }
}

/** Clone armor torso print: chest seam, battalion bands, ab plates, utility belt. */
function CloneTorso({ accent, camo }: { accent: string; camo?: boolean }) {
  return (
    <>
      <path d="M80 103 Q100 110 120 103" stroke="#242430" strokeWidth="2" fill="none" />
      <path d="M74 100 L83 111" stroke={accent} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M126 100 L117 111" stroke={accent} strokeWidth="4.5" strokeLinecap="round" />
      <rect x="85" y="112" width="30" height="5" rx="2" fill={accent} />
      {camo ? (
        <>
          <rect x="86" y="104" width="28" height="44" rx="2" fill="#3e5e3a" />
          <ellipse cx="93" cy="115" rx="5" ry="3" fill="#2f4a2c" />
          <ellipse cx="106" cy="124" rx="6" ry="3.5" fill="#6b8a52" />
          <ellipse cx="95" cy="136" rx="5.5" ry="3" fill="#2f4a2c" />
          <ellipse cx="108" cy="142" rx="5" ry="3" fill="#6b8a52" />
        </>
      ) : (
        <>
          <rect x="87" y="122" width="26" height="3.5" rx="1.5" fill="#242430" opacity="0.7" />
          <rect x="87" y="129" width="26" height="3.5" rx="1.5" fill="#242430" opacity="0.7" />
        </>
      )}
      <rect x="72" y="140" width="56" height="8" fill="#242430" />
      <rect x="94" y="141" width="12" height="6" rx="1" fill={accent} />
    </>
  );
}

function TorsoDeco({ torso }: { torso: TorsoId }) {
  switch (torso) {
    case "jedi":
      return (
        <>
          <path d="M100 100 L88 140 M100 100 L112 140" stroke="#8a7650" strokeWidth="3" fill="none" />
          <path d="M94 100 L84 140 M106 100 L116 140" stroke="#b09b74" strokeWidth="2" fill="none" />
          <rect x="73" y="140" width="54" height="9" fill="#6e4a2f" />
          <rect x="95" y="141.5" width="10" height="6" rx="1" fill="#c9b38a" />
        </>
      );
    case "sith":
      return (
        <>
          <rect x="87" y="106" width="26" height="19" rx="2" fill="#3a3a44" />
          {[0, 1, 2].map((c) =>
            [0, 1].map((r) => (
              <rect key={`${c}-${r}`} x={90 + c * 7.5} y={109 + r * 7} width="5" height="4.5" rx="1" fill="#b8b8c0" />
            )),
          )}
          <rect x="73" y="140" width="54" height="9" fill="#111016" />
          <rect x="94" y="141" width="12" height="7" rx="1" fill="#b8b8c0" />
        </>
      );
    case "beskar":
      return (
        <>
          <rect x="79" y="104" width="17" height="11" rx="2" fill="#c8d4cf" />
          <rect x="104" y="104" width="17" height="11" rx="2" fill="#c8d4cf" />
          <path d="M100 120 L107 127 L100 134 L93 127 Z" fill="#c8d4cf" />
          <rect x="72" y="140" width="56" height="9" fill="#33403a" />
          <rect x="95" y="141.5" width="10" height="6" rx="1" fill="#c8d4cf" />
        </>
      );
    case "trooper":
      return (
        <>
          <path d="M80 103 Q100 110 120 103" stroke="#242430" strokeWidth="2.5" fill="none" />
          <rect x="86" y="112" width="28" height="3.5" rx="1.5" fill="#242430" opacity="0.75" />
          <rect x="86" y="120" width="28" height="3.5" rx="1.5" fill="#242430" opacity="0.75" />
          <rect x="86" y="128" width="28" height="3.5" rx="1.5" fill="#242430" opacity="0.75" />
          <rect x="72" y="140" width="56" height="8" fill="#242430" />
          <rect x="80" y="141.5" width="8" height="5" rx="1" fill={WHITE} />
          <rect x="96" y="141.5" width="8" height="5" rx="1" fill={WHITE} />
          <rect x="112" y="141.5" width="8" height="5" rx="1" fill={WHITE} />
        </>
      );
    case "pilot":
      return (
        <>
          <path d="M85 100 L88 155 M115 100 L112 155" stroke={WHITE} strokeWidth="5" fill="none" />
          <rect x="90" y="110" width="20" height="15" rx="2" fill="#5a5566" />
          <path d="M95 125 Q91 138 96 150 M105 125 Q109 138 104 150" stroke="#5a5566" strokeWidth="2.5" fill="none" />
        </>
      );
    case "royal":
      return (
        <>
          <path d="M88 100 Q100 112 112 100" stroke="#ffd84d" strokeWidth="2.5" fill="none" />
          <circle cx="100" cy="112" r="2.5" fill="#ffd84d" />
          <rect x="73" y="140" width="54" height="9" fill="#4d2c5a" />
          <rect x="95" y="141.5" width="10" height="6" rx="1" fill="#c0c0cc" />
        </>
      );
    case "droid":
      return (
        <>
          <circle cx="100" cy="115" r="9" stroke="#5a5566" strokeWidth="2.5" fill="none" />
          <circle cx="100" cy="115" r="3.5" stroke="#5a5566" strokeWidth="2" fill="none" />
          <path d="M87 132 H113 M87 139 H113" stroke="#5a5566" strokeWidth="2.5" />
          <rect x="72" y="146" width="56" height="3" fill="#5a5566" opacity="0.6" />
        </>
      );
    case "clone-501":
      return <CloneTorso accent={BATTALION["501"]} />;
    case "clone-shock":
      return <CloneTorso accent={BATTALION.shock} />;
    case "clone-gree":
      return <CloneTorso accent={BATTALION.gree} camo />;
    case "clone-332":
      return <CloneTorso accent={BATTALION["332"]} />;
    case "han-vest":
      return (
        <>
          <path d="M85 100 L100 120 L115 100" fill="#f0f0f0" stroke="#c9b38a" strokeWidth="2" />
          <path d="M74 100 L88 155 L67 155 Z" fill="#111116" />
          <path d="M126 100 L112 155 L133 155 Z" fill="#111116" />
          <rect x="75" y="115" width="10" height="15" rx="1" fill="#222" />
          <rect x="115" y="115" width="10" height="15" rx="1" fill="#222" />
          <rect x="75" y="135" width="12" height="15" rx="1" fill="#222" />
          <rect x="113" y="135" width="12" height="15" rx="1" fill="#222" />
          <rect x="72" y="146" width="56" height="9" fill="#4a2e15" />
          <rect x="95" y="146" width="10" height="9" fill="#c0c0cc" />
        </>
      );
    case "maul-robes":
      return (
        <>
          <path d="M85 100 L100 135 L115 100" fill="#222" stroke="#111" strokeWidth="2" />
          <path d="M85 100 L100 120 L115 100" fill="#111" />
          <path d="M92 100 L100 110 L108 100" fill="#222" />
          <rect x="73" y="135" width="54" height="15" fill="#222" />
          <rect x="73" y="138" width="54" height="3" fill="#111" />
          <rect x="73" y="145" width="54" height="3" fill="#111" />
          <rect x="70" y="150" width="60" height="5" fill="#111" />
        </>
      );
    case "yoda-robes":
      return (
        <>
          <path d="M85 100 L100 130 L115 100" fill="#739b56" />
          <path d="M74 100 L88 155 L67 155 Z" fill="#b8a483" />
          <path d="M126 100 L112 155 L133 155 Z" fill="#b8a483" />
          <path d="M83 100 L100 135 L105 130 Z" fill="#938166" />
          <rect x="72" y="146" width="56" height="6" fill="#4a2e15" />
          <rect x="95" y="146" width="10" height="6" fill="#c0c0cc" />
        </>
      );
    case "wookiee-torso":
      return (
        <>
          <path d="M74 100 L126 100 L133 155 L67 155 Z" fill="#4f3521" />
          <path d="M75 100 L125 155 L115 155 L67 107 Z" fill="#222" />
          {/* silver bandolier boxes */}
          <rect x="80" y="108" width="6" height="8" fill="#c0c0cc" transform="rotate(45 83 112)" />
          <rect x="90" y="118" width="6" height="8" fill="#c0c0cc" transform="rotate(45 93 122)" />
          <rect x="100" y="128" width="6" height="8" fill="#c0c0cc" transform="rotate(45 103 132)" />
          <rect x="110" y="138" width="6" height="8" fill="#c0c0cc" transform="rotate(45 113 142)" />
        </>
      );
    case "grievous-torso":
      return (
        <g>
          {/* spine/core */}
          <rect x="94" y="95" width="12" height="60" fill="#7a7a85" />
          <path d="M94 105 H106 M94 115 H106 M94 125 H106 M94 135 H106 M94 145 H106" stroke="#50505c" strokeWidth="2" />
          {/* white chest armor plates */}
          <path d="M85 100 Q100 120 115 100 Q115 140 100 135 Q85 140 85 100 Z" fill="#d2d2d6" />
          <path d="M85 100 Q100 115 115 100" stroke="#222" strokeWidth="1.5" fill="none" />
          <path d="M92 107 Q100 125 108 107" stroke="#222" strokeWidth="1.5" fill="none" />
          <path d="M95 130 L100 125 L105 130" stroke="#222" strokeWidth="1.5" fill="none" />
          {/* 2 droid arms (folded default) */}
          <path d="M88 105 L60 125 L75 160" stroke="#7a7a85" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M112 105 L140 125 L125 160" stroke="#7a7a85" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* shoulder joints */}
          <circle cx="85" cy="105" r="5" fill="#d2d2d6" />
          <circle cx="115" cy="105" r="5" fill="#d2d2d6" />
        </g>
      );
  }
}

/** Battalion markings / camo on the leg assembly. */
function LegsDeco({ legs }: { legs: LegsId }) {
  const accentOf: Partial<Record<LegsId, string>> = {
    "clone-501": BATTALION["501"],
    "clone-shock": BATTALION.shock,
    "clone-332": BATTALION["332"],
  };
  const accent = accentOf[legs];
  if (accent) {
    return (
      <>
        <rect x="70" y="172" width="9" height="18" rx="2" fill={accent} />
        <rect x="121" y="172" width="9" height="18" rx="2" fill={accent} />
        <rect x="70" y="194" width="23" height="6" rx="2" fill={accent} />
        <rect x="107" y="194" width="23" height="6" rx="2" fill={accent} />
      </>
    );
  }
  if (legs === "clone-camo") {
    return (
      <>
        <ellipse cx="78" cy="178" rx="6" ry="3.5" fill="#2f4a2c" />
        <ellipse cx="92" cy="192" rx="5" ry="3" fill="#6b8a52" />
        <ellipse cx="82" cy="206" rx="6" ry="3.5" fill="#2f4a2c" />
        <ellipse cx="114" cy="176" rx="5.5" ry="3" fill="#6b8a52" />
        <ellipse cx="122" cy="196" rx="6" ry="3.5" fill="#2f4a2c" />
        <ellipse cx="110" cy="208" rx="5" ry="3" fill="#6b8a52" />
      </>
    );
  }
  if (legs === "han-legs") {
    return (
      <>
        <rect x="67" y="167" width="5" height="50" fill="#a03030" opacity="0.8" />
        <rect x="127" y="167" width="5" height="50" fill="#a03030" opacity="0.8" />
        <path d="M110 155 L125 185 L120 195 L115 195 L110 185 Z" fill="#4a2e15" />
        <rect x="120" y="185" width="8" height="10" rx="1" fill="#111116" />
        <rect x="108" y="155" width="20" height="4" fill="#4a2e15" />
      </>
    );
  }
  if (legs === "maul-legs") {
    return (
      <>
        <rect x="75" y="155" width="50" height="20" fill="#111" />
        <path d="M72 155 L90 190 L85 155 Z M128 155 L110 190 L115 155 Z" fill="#222" />
        <rect x="70" y="195" width="20" height="4" fill="#222" />
        <rect x="110" y="195" width="20" height="4" fill="#222" />
      </>
    );
  }
  if (legs === "yoda-short") {
    return (
      <g>
        <rect x="70" y="155" width="60" height="11" rx="2" fill="#c9b38a" />
        <rect x="72" y="166" width="26" height="28" rx="2" fill="#c9b38a" />
        <rect x="102" y="166" width="26" height="28" rx="2" fill="#c9b38a" />
        <path d="M70 165 H130" stroke={SEAM} strokeWidth="1.5" />
        <path d="M98 166 V194" stroke={SEAM} strokeWidth="2.5" />
      </g>
    );
  }
  if (legs === "wookiee-legs") {
    return (
      <g>
        <rect x="68" y="195" width="25" height="22" rx="2" fill="#382415" />
        <rect x="107" y="195" width="25" height="22" rx="2" fill="#382415" />
        <path d="M75 167 L78 180 M85 167 L83 185 M115 167 L117 185 M125 167 L122 180" stroke="#382415" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }
  if (legs === "grievous-legs") {
    return (
      <g>
        {/* pelvis */}
        <path d="M90 155 L110 155 L105 170 L95 170 Z" fill="#d2d2d6" />
        {/* legs */}
        <path d="M96 165 L80 195 L70 215" stroke="#7a7a85" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M104 165 L120 195 L130 215" stroke="#7a7a85" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* claws */}
        <path d="M70 215 L55 220 M70 215 L85 220" stroke="#9aa0a8" strokeWidth="4" strokeLinecap="round" />
        <path d="M130 215 L115 220 M130 215 L145 220" stroke="#9aa0a8" strokeWidth="4" strokeLinecap="round" />
      </g>
    );
  }
  return null;
}

/** Bent arm + C-clamp hand, one side. mirror=-1 for the left arm. */
function Arm({ color, mirror }: { color: string; mirror: 1 | -1 }) {
  const t = mirror === 1 ? "" : "translate(200 0) scale(-1 1)";
  return (
    <g transform={t}>
      <rect x="119" y="100" width="17" height="30" rx="8" fill={color} transform="rotate(-20 127 104)" />
      <rect x="129" y="124" width="14" height="26" rx="7" fill={color} transform="rotate(6 136 128)" />
      <rect x="132" y="146" width="9" height="7" rx="2" fill={SKIN} />
      <path d="M141.5 156 A6.5 6.5 0 1 1 131.5 156" stroke={SKIN} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function GearPaint({ gear }: { gear: GearId }) {
  if (gear.startsWith("saber")) {
    const color = GEAR.find((g) => g.id === gear)!.color;
    const isMaul = gear === "saber-maul";
    const h = 96;
    const offset = 0;
    
    return (
      <g>
        {isMaul && (
          <>
            <rect x="132.5" y="128" width="8" height="22" rx="2" fill="#c8c8d0" />
            <rect x="132.5" y="128" width="8" height="4" fill="#3a3a44" />
            <rect x="134.5" y="32" width="4.5" height="96" rx="2.2" fill={color} />
            <rect x="131.5" y="29" width="10.5" height="102" rx="5" fill={color} opacity="0.3" />
          </>
        )}
        <rect x="132.5" y="150" width="8" height="22" rx="2" fill="#c8c8d0" />
        <rect x="132.5" y="150" width="8" height="4" fill="#3a3a44" />
        <rect x="132.5" y="166" width="8" height="4" fill="#3a3a44" />
        <rect x="134.5" y={172 + offset} width="4.5" height={h} rx="2.2" fill={color} />
        <rect x="131.5" y={169 + offset} width="10.5" height={h + 6} rx="5" fill={color} opacity="0.3" />
      </g>
    );
  }
  if (gear === "bowcaster") {
    return (
      <g>
        <rect x="133" y="130" width="8" height="42" rx="2" fill="#222" />
        <rect x="131" y="145" width="12" height="15" fill="#111" />
        <path d="M125 145 Q137 140 149 145" fill="none" stroke="#222" strokeWidth="3" />
        <circle cx="125" cy="145" r="3" fill="#222" />
        <circle cx="149" cy="145" r="3" fill="#222" />
        <circle cx="137" cy="140" r="4" fill="#ff5252" />
      </g>
    );
  }
  if (gear === "blaster") {
    return (
      <>
        <rect x="130" y="156" width="28" height="6" rx="2" fill="#33333d" />
        <rect x="133" y="150" width="9" height="6" rx="2" fill="#33333d" />
        <rect x="134" y="161" width="7" height="11" rx="2" fill="#33333d" />
      </>
    );
  }
  if (gear === "rifle") {
    return (
      <>
        <rect x="108" y="154" width="52" height="5.5" rx="2" fill="#22222a" />
        <rect x="126" y="148" width="12" height="6" rx="2" fill="#22222a" />
        <rect x="150" y="151" width="4" height="4" fill="#22222a" />
        <path d="M108 154 L100 168 L107 168 L115 159.5 Z" fill="#22222a" />
        <rect x="133" y="159" width="8" height="13" rx="2" fill="#22222a" />
      </>
    );
  }
  if (gear === "spanner") {
    return (
      <>
        <rect x="133.5" y="126" width="6" height="38" rx="3" fill="#9a9aa5" />
        <path d="M129 118 L144 118 L141 128 L132 128 Z" fill="#9a9aa5" />
        <rect x="129" y="112" width="4" height="8" rx="2" fill="#9a9aa5" />
        <rect x="140" y="112" width="4" height="8" rx="2" fill="#9a9aa5" />
      </>
    );
  }
  return null;
}

function Minifig({ cfg, svgRef }: { cfg: FigConfig; svgRef?: React.Ref<SVGSVGElement> }) {
  const torso = TORSOS.find((t) => t.id === cfg.torso)!;
  const legs = LEGS.find((l) => l.id === cfg.legs)!;
  const faceHidden = FACE_HIDDEN.includes(cfg.headgear);
  const headOverridden = HEAD_OVERRIDDEN.includes(cfg.headgear);
  const armsOverridden = ARMS_OVERRIDDEN.includes(cfg.torso);
  const legsOverridden = LEGS_OVERRIDDEN.includes(cfg.legs);

  return (
    <svg ref={svgRef} viewBox="0 0 200 230" className="factory__fig" role="img" aria-label="Character preview">
      <CapePaint headgear={cfg.headgear} />

      {/* legs assembly */}
      {!legsOverridden ? (
        <>
          <rect x="67" y="155" width="66" height="13" rx="2" fill={legs.color} />
          <rect x="68" y="167" width="64" height="50" rx="3" fill={legs.color} />
          <LegsDeco legs={cfg.legs} />
          <path d="M67 166 H133" stroke={SEAM} strokeWidth="1.5" />
          <path d="M93 167 L93 181 Q93 184 96 184 L104 184 Q107 184 107 181 L107 167" stroke={SEAM} strokeWidth="2" fill="none" />
          <path d="M100 184 L100 217" stroke={SEAM} strokeWidth="2.5" />
          <path d="M68 205 H93 M107 205 H132" stroke={SEAM} strokeWidth="1.2" />
        </>
      ) : (
        <LegsDeco legs={cfg.legs} />
      )}

      {/* torso */}
      <path d="M74 100 L126 100 L133 155 L67 155 Z" fill={torso.color} />
      <TorsoDeco torso={cfg.torso} />

      {/* arms + hands */}
      {!armsOverridden && (
        <>
          <Arm color={torso.color} mirror={1} />
          <Arm color={torso.color} mirror={-1} />
        </>
      )}

      {/* head assembly */}
      {!headOverridden && (
        <>
          <rect x="92" y="94" width="16" height="7" fill={SKIN} />
          <rect x="91" y="50" width="18" height="9" rx="2.5" fill={SKIN} />
          <rect x="80" y="58" width="40" height="36" rx="9" fill={SKIN} />
          {!faceHidden && <FacePaint face={cfg.face} />}
        </>
      )}
      
      <HeadgearPaint headgear={cfg.headgear} />
      <GearPaint gear={cfg.gear} />
    </svg>
  );
}

/* ---------- Swatch previews (tightly cropped per part) ---------- */

const GEAR_VIEWBOX: Record<string, string> = {
  rifle: "94 140 72 36",
  blaster: "124 144 40 32",
  spanner: "122 106 28 62",
  none: "126 93 36 36",
};

function Swatch({ kind, id }: { kind: CategoryId; id: string }) {
  switch (kind) {
    case "headgear":
      return (
        <svg viewBox="58 40 84 68" className="factory__swatch-svg">
          {!HEAD_OVERRIDDEN.includes(id as HeadgearId) && (
            <>
              <rect x="91" y="50" width="18" height="9" rx="2.5" fill={SKIN} />
              <rect x="80" y="58" width="40" height="36" rx="9" fill={SKIN} />
              {!FACE_HIDDEN.includes(id as HeadgearId) && <FacePaint face="smile" />}
            </>
          )}
          <HeadgearPaint headgear={id as HeadgearId} />
        </svg>
      );
    case "face":
      return (
        <svg viewBox="75 53 50 46" className="factory__swatch-svg">
          <rect x="80" y="58" width="40" height="36" rx="9" fill={SKIN} />
          <FacePaint face={id as FaceId} />
        </svg>
      );
    case "torso": {
      const t = TORSOS.find((x) => x.id === id)!;
      return (
        <svg viewBox="61 96 78 63" className="factory__swatch-svg">
          <path d="M74 100 L126 100 L133 155 L67 155 Z" fill={t.color} />
          <TorsoDeco torso={id as TorsoId} />
        </svg>
      );
    }
    case "legs": {
      const l = LEGS.find((x) => x.id === id)!;
      const over = LEGS_OVERRIDDEN.includes(id as LegsId);
      return (
        <svg viewBox="61 151 78 70" className="factory__swatch-svg">
          {!over ? (
            <>
              <rect x="67" y="155" width="66" height="13" rx="2" fill={l.color} />
              <rect x="68" y="167" width="64" height="50" rx="3" fill={l.color} />
              <LegsDeco legs={id as LegsId} />
              <path d="M67 166 H133" stroke={SEAM} strokeWidth="1.5" />
              <path d="M93 167 L93 181 Q93 184 96 184 L104 184 Q107 184 107 181 L107 167" stroke={SEAM} strokeWidth="2" fill="none" />
              <path d="M100 184 L100 217" stroke={SEAM} strokeWidth="2.5" />
            </>
          ) : (
            <LegsDeco legs={id as LegsId} />
          )}
        </svg>
      );
    }
    case "gear":
      return (
        <svg viewBox={GEAR_VIEWBOX[id] ?? "122 46 44 130"} className="factory__swatch-svg">
          <GearPaint gear={id as GearId} />
          {id === "none" && (
            <circle cx="144" cy="111" r="14" fill="none" stroke="#5a5566" strokeWidth="3" strokeDasharray="4 4" />
          )}
        </svg>
      );
  }
}

/* ---------- The station ---------- */

const CATALOG: Record<CategoryId, readonly { id: string; label: string }[]> = {
  headgear: HEADGEAR,
  face: FACES,
  torso: TORSOS,
  legs: LEGS,
  gear: GEAR,
};

export function LegoStation() {
  const [name, setName] = useState("");
  const [tab, setTab] = useState<CategoryId>("headgear");
  const [cfg, setCfg] = useState<FigConfig>({
    headgear: "jedi",
    face: "smile",
    torso: "jedi",
    legs: "tan",
    gear: "saber-blue",
  });
  const svgRef = useRef<SVGSVGElement>(null);

  const displayName = name.trim() || "Unnamed Explorer";

  const setPart = (kind: CategoryId, id: string) => setCfg({ ...cfg, [kind]: id });

  const shuffle = () => {
    const pick = <T extends readonly { id: string }[]>(a: T) => a[Math.floor(Math.random() * a.length)].id;
    setCfg({
      headgear: pick(HEADGEAR) as HeadgearId,
      face: pick(FACES) as FaceId,
      torso: pick(TORSOS) as TorsoId,
      legs: pick(LEGS) as LegsId,
      gear: pick(GEAR) as GearId,
    });
  };

  const partLabel = (kind: CategoryId, id: string) => CATALOG[kind].find((p) => p.id === id)?.label ?? id;

  const savePng = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml" }));
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 480;
      canvas.height = 640;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const grad = ctx.createLinearGradient(0, 0, 0, 640);
      grad.addColorStop(0, "#171423");
      grad.addColorStop(1, "#0d0b15");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 480, 640);
      ctx.fillStyle = "rgba(252, 255, 235, 0.8)";
      for (let i = 0; i < 90; i++) {
        ctx.globalAlpha = 0.2 + Math.random() * 0.7;
        ctx.fillRect(Math.random() * 480, Math.random() * 640, 1.6, 1.6);
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#fecdaa";
      ctx.lineWidth = 3;
      ctx.strokeRect(14, 14, 452, 612);
      ctx.drawImage(img, 75, 75, 330, 380);
      ctx.fillStyle = "#fecdaa";
      ctx.font = "700 32px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText(displayName, 240, 530);
      ctx.fillStyle = "#c9c4bb";
      ctx.font = "15px Georgia, serif";
      ctx.fillText("Character Station · Yessica Sule Observatory", 240, 562);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.download = `${displayName.replace(/[^\w\- ]+/g, "").trim().toLowerCase() || "character"}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = url;
  };

  const send = () => {
    const code = btoa(JSON.stringify({ name: displayName, ...cfg }));
    const subject = `New character for the Observatory: ${displayName}`;
    const body = [
      `Name:      ${displayName}`,
      `Headgear:  ${partLabel("headgear", cfg.headgear)}`,
      `Face:      ${partLabel("face", cfg.face)}`,
      `Torso:     ${partLabel("torso", cfg.torso)}`,
      `Legs:      ${partLabel("legs", cfg.legs)}`,
      `Gear:      ${partLabel("gear", cfg.gear)}`,
      "",
      `Config: ${code}`,
    ].join("\n");
    window.location.href = `mailto:${identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="factory" aria-label="Character Station">
      <div className="factory__brand">
        <span className="factory__brand-title">CHARACTER STATION</span>
      </div>

      <div className="factory__body">
        <div className="factory__stage">
          <div className="factory__pedestal">
            <Minifig cfg={cfg} svgRef={svgRef} />
            <div className="factory__disc" aria-hidden="true" />
          </div>
          <input
            className="factory__name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={26}
            placeholder="Name your character"
            aria-label="Character name"
            autoComplete="off"
          />
        </div>

        <div className="factory__parts">
          <div className="factory__tabs" role="tablist" aria-label="Part categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={tab === c.id}
                className={`factory__tab${tab === c.id ? " factory__tab--on" : ""}`}
                onClick={() => setTab(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="factory__grid" role="tabpanel">
            {CATALOG[tab].map((p) => (
              <button
                key={p.id}
                type="button"
                className={`factory__part${cfg[tab] === p.id ? " factory__part--on" : ""}`}
                aria-pressed={cfg[tab] === p.id}
                onClick={() => setPart(tab, p.id)}
                title={p.label}
              >
                <Swatch kind={tab} id={p.id} />
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="factory__bar">
        <button type="button" className="btn btn--small" onClick={shuffle}>
          ⟳ Shuffle
        </button>
        <button type="button" className="btn btn--small" onClick={savePng}>
          ↓ Save PNG
        </button>
        <button type="button" className="btn btn--small btn--primary" onClick={send}>
          ✉ Send to Yessica
        </button>
      </div>
    </div>
  );
}
