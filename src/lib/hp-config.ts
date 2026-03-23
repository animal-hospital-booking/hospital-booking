// HP template configuration
// Each hospital's data is defined here (later: move to Supabase for admin editing)

export interface StaffMember {
  name: string;
  role: string;
  image?: string;
  message: string;
  specialties?: string[];
}

export interface Service {
  name: string;
  description: string;
  icon: string;
  animals?: string[];
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
  category: "お知らせ" | "休診" | "キャンペーン" | "ブログ";
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Testimonial {
  name: string;
  pet: string;
  text: string;
  rating: number;
}

export interface GalleryItem {
  label: string;
  description: string;
}

export interface HpConfig {
  // 基本情報
  hospitalName: string;
  catchphrase: string;
  subcatchphrase?: string;
  description: string;
  philosophy?: string;
  logoUrl?: string;
  heroImageUrl?: string;

  // 連絡先
  phone: string;
  email?: string;
  address: string;
  googleMapsEmbedUrl?: string;
  parking?: string;

  // 診療時間
  hours: {
    days: string;
    morning: string;
    afternoon: string;
  }[];
  closedDays: string;
  emergencyNote?: string;

  // スタッフ
  staff: StaffMember[];

  // 診療案内
  services: Service[];
  targetAnimals: string[];

  // お知らせ
  news: NewsItem[];

  // 数字で見る当院
  stats: Stat[];

  // 飼い主さまの声
  testimonials: Testimonial[];

  // 院内紹介
  gallery: GalleryItem[];

  // 当院の特徴
  features: { title: string; description: string; icon: string }[];

  // SNS
  lineUrl?: string;
  instagramUrl?: string;

  // 予約システムURL
  bookingUrl: string;
}

// サンプルデータ（デモ用）
export const hpConfig: HpConfig = {
  hospitalName: process.env.NEXT_PUBLIC_HOSPITAL_NAME || "さくら動物病院",
  catchphrase: "家族の一員である\n動物たちに、\n心のこもった医療を。",
  subcatchphrase: "Compassionate care for your beloved family",
  description:
    "さくら動物病院は、飼い主さまと動物たちに寄り添い、丁寧な診療を心がけています。予防医療から専門的な治療まで、幅広く対応いたします。",
  philosophy:
    "「動物たちの声に耳を傾ける」を理念に、2010年の開業以来、地域の皆さまに愛される動物病院を目指してまいりました。最新の医療設備と温かいスタッフのもと、一頭一頭に最適な治療をご提供します。",
  heroImageUrl: "/hp/hero.jpg",

  phone: "03-1234-5678",
  email: "info@sakura-ah.example.com",
  address: "東京都世田谷区〇〇1-2-3 さくらビル1F",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.7!2d139.65!3d35.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDM5JzAwLjAiTiAxMznCsDM5JzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1",
  parking: "専用駐車場3台あり（病院前）",

  hours: [
    { days: "月・火・水・金", morning: "9:00〜12:00", afternoon: "16:00〜19:00" },
    { days: "土・日", morning: "9:00〜12:00", afternoon: "16:00〜18:00" },
    { days: "木・祝", morning: "休診", afternoon: "休診" },
  ],
  closedDays: "木曜・祝日",
  emergencyNote: "急患の場合はお電話ください",

  staff: [
    {
      name: "田中 太郎",
      role: "院長 / 獣医師",
      message:
        "動物たちの小さな変化も見逃さない診療を心がけています。お気軽にご相談ください。",
      specialties: ["外科", "整形外科", "循環器科"],
    },
    {
      name: "佐藤 花子",
      role: "獣医師",
      message:
        "皮膚科・歯科を専門としています。日頃のケアについてもアドバイスいたします。",
      specialties: ["皮膚科", "歯科"],
    },
    {
      name: "鈴木 美咲",
      role: "動物看護師",
      message:
        "動物たちが少しでもリラックスできるよう、優しい対応を大切にしています。",
    },
  ],

  services: [
    {
      name: "一般診療",
      description:
        "内科・外科の幅広い診療に対応しています。体調不良や怪我など、まずはお気軽にご相談ください。",
      icon: "stethoscope",
    },
    {
      name: "予防医療",
      description:
        "ワクチン接種、フィラリア予防、ノミ・ダニ予防など。大切な家族を病気から守ります。",
      icon: "syringe",
    },
    {
      name: "健康診断",
      description:
        "血液検査、レントゲン、エコーなど。定期的な健康チェックで病気の早期発見を。",
      icon: "microscope",
    },
    {
      name: "歯科",
      description:
        "歯石除去、歯周病治療、デンタルケア指導。お口の健康は全身の健康につながります。",
      icon: "tooth",
    },
    {
      name: "皮膚科",
      description:
        "アレルギー、皮膚炎、脱毛など。原因を特定し、適切な治療を行います。",
      icon: "paw",
    },
    {
      name: "避妊・去勢手術",
      description:
        "安全な麻酔管理のもと、日帰りまたは1泊入院で対応いたします。",
      icon: "scissors",
    },
  ],
  targetAnimals: ["犬", "猫", "うさぎ", "ハムスター", "フェレット"],

  news: [
    {
      id: "1",
      date: "2026-03-20",
      title: "4月の休診日のお知らせ",
      content: "4月29日（水・祝）は休診とさせていただきます。",
      category: "休診",
    },
    {
      id: "2",
      date: "2026-03-15",
      title: "春の健康診断キャンペーン実施中",
      content:
        "4月1日〜5月31日まで、健康診断パックを20%OFFでご提供いたします。この機会にぜひご利用ください。",
      category: "キャンペーン",
    },
    {
      id: "3",
      date: "2026-03-01",
      title: "Web予約を開始しました",
      content:
        "LINEからの24時間Web予約が可能になりました。お電話が繋がりにくい時間帯もスムーズにご予約いただけます。",
      category: "お知らせ",
    },
  ],

  stats: [
    { value: "15", label: "開業", suffix: "年以上" },
    { value: "10,000", label: "年間診療数", suffix: "件以上" },
    { value: "98", label: "飼い主さま満足度", suffix: "%" },
    { value: "3", label: "獣医師", suffix: "名在籍" },
  ],

  testimonials: [
    {
      name: "M.K さま",
      pet: "トイプードル / 5歳",
      text: "先生がとても丁寧に説明してくださるので安心です。受付の方も優しく、うちの子も落ち着いて診察を受けています。",
      rating: 5,
    },
    {
      name: "S.T さま",
      pet: "スコティッシュフォールド / 3歳",
      text: "Web予約ができるようになって本当に便利になりました。以前は電話がなかなか繋がらず大変でしたが、今はストレスなく予約できます。",
      rating: 5,
    },
    {
      name: "Y.N さま",
      pet: "ミニチュアダックス / 8歳",
      text: "うちの子の皮膚トラブルで何軒か病院を回りましたが、こちらでようやく改善しました。専門的な知識に感謝しています。",
      rating: 5,
    },
  ],

  gallery: [
    { label: "受付", description: "明るく開放的な受付でお迎えいたします" },
    { label: "診察室", description: "落ち着いた雰囲気の清潔な診察室" },
    { label: "手術室", description: "最新設備を備えた手術室で安全な手術を" },
    { label: "待合室", description: "ゆったりとお待ちいただける空間" },
    { label: "検査室", description: "院内で迅速な検査結果をお伝えします" },
    { label: "入院室", description: "24時間体制で大切なペットを見守ります" },
  ],

  features: [
    {
      title: "丁寧なカウンセリング",
      description: "飼い主さまのお話をじっくり伺い、動物たちの状態を詳しくご説明します。納得いただいたうえで治療方針を決定します。",
      icon: "chat",
    },
    {
      title: "最新の医療設備",
      description: "デジタルレントゲン、超音波診断装置、血液検査機器など、最新の医療設備を導入。院内で迅速に検査結果をお伝えします。",
      icon: "hospital",
    },
    {
      title: "Web予約で待ち時間ゼロ",
      description: "LINEから24時間いつでもご予約可能。予約制で待ち時間を最小限に抑え、飼い主さまと動物たちの負担を減らします。",
      icon: "device",
    },
  ],

  lineUrl: "https://line.me/R/ti/p/@844jztca",
  instagramUrl: undefined,
  bookingUrl: "/",
};
