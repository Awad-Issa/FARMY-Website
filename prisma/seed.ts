import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: { username: adminUsername, passwordHash },
  });

  const categories = [
    {
      name: "الأغنام",
      slug: "sheep",
      image: "/images/categories/sheep.svg",
      description: "مستلزمات وتجهيزات متخصصة لمربي الأغنام بجودة عالية وقابلية للتخصيص.",
      active: true,
    },
    {
      name: "الأبقار",
      slug: "cattle",
      image: "/images/categories/cattle.svg",
      description: "حلول عملية لمزارع الأبقار تشمل التعريف والتجهيزات والمستلزمات اليومية.",
      active: true,
    },
    {
      name: "الماعز",
      slug: "goats",
      image: "/images/categories/goats.svg",
      description: "منتجات مخصصة لمربي الماعز — قريباً.",
      active: false,
    },
    {
      name: "المستلزمات البيطرية",
      slug: "veterinary",
      image: "/images/categories/veterinary.svg",
      description: "مستلزمات بيطرية وصحية للثروة الحيوانية — قريباً.",
      active: false,
    },
    {
      name: "التكنولوجيا الزراعية",
      slug: "agtech",
      image: "/images/categories/agtech.svg",
      description: "حلول تقنية ذكية للمزارع الحديثة — قريباً.",
      active: false,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const sheepCategory = await prisma.category.findUnique({
    where: { slug: "sheep" },
  });
  const cattleCategory = await prisma.category.findUnique({
    where: { slug: "cattle" },
  });

  if (sheepCategory) {
    const sheepProducts = [
      {
        name: "علامة أذن للأغنام",
        slug: "sheep-ear-tag",
        shortDescription: "علامات أذن متينة للأغنام مع إمكانية الطباعة حسب الطلب.",
        description:
          "علامات أذن عالية الجودة مصممة لمربي الأغنام، تتحمل الظروف الميدانية وتوفر تعريفاً واضحاً للقطيع. متوفرة بعدة ألوان مع خيار طباعة اسم المزرعة أو الرقم التسلسلي.",
        image: "/images/products/sheep-ear-tag.svg",
        minOrderQuantity: 100,
        estimatedDeliveryDays: 5,
        colors: [
          { name: "أصفر", colorCode: "#EAB308" },
          { name: "أزرق", colorCode: "#2563EB" },
          { name: "أحمر", colorCode: "#DC2626" },
        ],
      },
      {
        name: "حبل رقبة للأغنام",
        slug: "sheep-neck-rope",
        shortDescription: "حبال رقبة متينة ومريحة للاستخدام اليومي في المزارع.",
        description:
          "حبال رقبة مصنوعة من مواد عالية المتانة، مناسبة للاستخدام اليومي في مزارع الأغنام. متوفرة بمقاسات مختلفة مع إمكانية التخصيص.",
        image: "/images/products/sheep-neck-rope.svg",
        minOrderQuantity: 50,
        estimatedDeliveryDays: 3,
        colors: [
          { name: "بني", colorCode: "#92400E" },
          { name: "أسود", colorCode: "#171717" },
        ],
      },
    ];

    for (const product of sheepProducts) {
      const { colors, ...data } = product;
      await prisma.product.upsert({
        where: { slug: data.slug },
        update: {
          ...data,
          categoryId: sheepCategory.id,
          colors: { deleteMany: {}, create: colors },
        },
        create: {
          ...data,
          categoryId: sheepCategory.id,
          colors: { create: colors },
        },
      });
    }
  }

  if (cattleCategory) {
    const cattleProducts = [
      {
        name: "علامة أذن للأبقار",
        slug: "cattle-ear-tag",
        shortDescription: "علامات أذن للأبقار بتصميم متين ومقاوم للظروف الجوية.",
        description:
          "علامات أذن مصممة خصيصاً للأبقار، توفر تعريفاً دائماً وسهل القراءة. تدعم الطباعة المخصصة وتتوفر بألوان متعددة تناسب أنظمة الترميز في المزارع.",
        image: "/images/products/cattle-ear-tag.svg",
        minOrderQuantity: 100,
        estimatedDeliveryDays: 7,
        colors: [
          { name: "أخضر", colorCode: "#16A34A" },
          { name: "برتقالي", colorCode: "#EA580C" },
          { name: "أبيض", colorCode: "#F5F5F5" },
        ],
      },
      {
        name: "سلسلة رقبة للأبقار",
        slug: "cattle-neck-chain",
        shortDescription: "سلاسل رقبة قوية للأبقار مع مشابك آمنة.",
        description:
          "سلاسل رقبة مصنوعة من مواد مقاومة للصدأ والتآكل، مناسبة للاستخدام في مزارع الأبقار. تتميز بمشابك آمنة وسهلة الاستخدام.",
        image: "/images/products/cattle-neck-chain.svg",
        minOrderQuantity: 25,
        estimatedDeliveryDays: 5,
        colors: [{ name: "فضي", colorCode: "#9CA3AF" }],
      },
    ];

    for (const product of cattleProducts) {
      const { colors, ...data } = product;
      await prisma.product.upsert({
        where: { slug: data.slug },
        update: {
          ...data,
          categoryId: cattleCategory.id,
          colors: { deleteMany: {}, create: colors },
        },
        create: {
          ...data,
          categoryId: cattleCategory.id,
          colors: { create: colors },
        },
      });
    }
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
