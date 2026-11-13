// Тексты, картинки и ссылка для связи.
// { name: "Название", image: "assets/products/foto.jpg", description: "Текст" }
// Ссылку contact.href замените на Telegram, WhatsApp или tel:+7...

const SITE = {
  avatar: "assets/santa.svg",
  contact: {
    label: "Написать / Заказать",
    href: "https://t.me/username",
  },
  spices: [
    {
      name: "Курица мечты",
      image: "assets/products/spice-kurica-mechty.jpg",
      description: "Приправа «Курица мечты» для курицы и индейки. 200 г.",
    },
    {
      name: "Царское барбекю",
      image: "assets/products/spice-carskoe-barbekyu.jpg",
      description: "Приправа «Царское барбекю» для гриля и запекания. 200 г.",
    },
    {
      name: "Румяный свин",
      image: "assets/products/spice-rumyanyj-svin.jpg",
      description: "Приправа «Румяный свин» для свинины. 200 г.",
    },
    {
      name: "Ужин капитана",
      image: "assets/products/spice-uzhin-kapitana.jpg",
      description: "Приправа «Ужин капитана» для рыбы. 200 г.",
    },
    {
      name: "Солнце специй",
      image: "assets/products/spice-solnce-specij.jpg",
      description: "Универсальная приправа «Солнце специй». 200 г.",
    },
    {
      name: "Канадский гриль",
      image: "assets/products/spice-kanadskij-gril.jpg",
      description: "Приправа «Канадский гриль» для гриля и запекания. 200 г.",
    },
    {
      name: "Ну что за мясо!",
      image: "assets/products/spice-nu-chto-za-myaso.jpg",
      description: "Приправа «Ну что за мясо!» для свинины, баранины и говядины. 200 г.",
    },
    {
      name: "Секрет рыбака",
      image: "assets/products/spice-sekret-rybaka.jpg",
      description: "Приправа «Секрет рыбака» для рыбы и морепродуктов. 200 г.",
    },
    {
      name: "Восторг итальянца",
      image: "assets/products/spice-vostorg-italyanca.jpg",
      description: "Приправа «Восторг итальянца» для курицы и овощей. 200 г.",
    },
    {
      name: "Шеф-говядина",
      image: "assets/products/spice-shef-govyadina.jpg",
      description: "Приправа «Шеф-говядина» для говядины и стейков. 200 г.",
    },
    {
      name: "Мастер-микс",
      image: "assets/products/spice-master-miks.jpg",
      description: "Универсальная приправа «Мастер-микс». 200 г.",
    },
    {
      name: "Острота юга",
      image: "assets/products/spice-ostrota-yuga.jpg",
      description: "Универсальная приправа «Острота юга». 200 г.",
    },
    {
      name: "Жгучий Тибет",
      image: "assets/products/spice-zhguchij-tibet.jpg",
      description: "Универсальная приправа «Жгучий Тибет». 200 г.",
    },
    {
      name: "Овощной шарм",
      image: "assets/products/spice-ovoshhnoj-sharm.jpg",
      description: "Универсальная приправа «Овощной шарм». 200 г.",
    },
  ],
  tinctures: [
    {
      name: "Ананас",
      image: "assets/products/tincture-ananas.jpg",
      description: "Настойка «Ананас» со специями. 23%, 0.5 л.",
    },
    {
      name: "Малина",
      image: "assets/products/tincture-malina.jpg",
      description: "Настойка «Малина». 23%, 0.5 л.",
    },
    {
      name: "Мандарин",
      image: "assets/products/tincture-mandarin.jpg",
      description: "Настойка «Мандарин». 23%, 0.5 л.",
    },
    {
      name: "Вишня",
      image: "assets/products/tincture-vishnya.jpg",
      description: "Настойка «Вишня». 23%, 0.5 л.",
    },
    {
      name: "Ягодная",
      image: "assets/products/tincture-yagodnaya.jpg",
      description: "Настойка «Ягодная». 23%, 0.5 л.",
    },
    {
      name: "Смородина",
      image: "assets/products/tincture-smorodina.jpg",
      description: "Настойка «Смородина». 23%, 0.5 л.",
    },
    {
      name: "Ягодная с мятой",
      image: "assets/products/tincture-yagodnaya-myata.jpg",
      description: "Настойка «Ягодная» с мятой. 23%, 0.5 л.",
    },
    {
      name: "Абрикос",
      image: "assets/products/tincture-abrikos.jpg",
      description: "Настойка «Абрикос» со специями. 23%, 0.5 л.",
    },
  ],
  faq: [
    {
      q: "Как сделать заказ?",
      a: "Нажмите «Написать / Заказать» и отправьте, какие приправы или настойки выбрали. Это черновой ответ, его можно заменить.",
    },
    {
      q: "Как доставляете подарки?",
      a: "Черновик. Здесь будут города, сроки и способ, которым подарок доезжает до человека.",
    },
    {
      q: "Можно ли заказать несколько вкусов?",
      a: "Да. В банке один вид приправы, в бутылке один вид настойки, а в заказе их может быть несколько. Напишите, какие именно.",
    },
    {
      q: "Что внутри банки приправ?",
      a: "Банка 200 г. Вкусы: курица мечты, царское барбекю, румяный свин, ужин капитана, солнце специй, канадский гриль, ну что за мясо!, секрет рыбака, восторг итальянца, шеф-говядина, мастер-микс, острота юга, жгучий Тибет и овощной шарм.",
    },
    {
      q: "Что внутри бутылки настойки?",
      a: "Бутылка 0.5 л, крепость 23%. Вкусы: ананас, малина, мандарин, вишня, ягодная, смородина, ягодная с мятой и абрикос.",
    },
  ],
};
