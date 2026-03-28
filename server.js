'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// ── Default list of known tannaim ────────────────────────────────────────────
const DEFAULT_TANNAIM = [
  {
    id: 'beit-hillel',
    name_he: 'בית הלל',
    name_en: 'Beit Hillel',
    search_he: ['בית הלל'],
    search_en: ['Beit Hillel', 'Beth Hillel', 'House of Hillel'],
    generation: 1,
    notes: 'School of Hillel'
  },
  {
    id: 'beit-shammai',
    name_he: 'בית שמאי',
    name_en: 'Beit Shammai',
    search_he: ['בית שמאי'],
    search_en: ['Beit Shammai', 'Beth Shammai', 'House of Shammai'],
    generation: 1,
    notes: 'School of Shammai'
  },
  {
    id: 'hillel',
    name_he: 'הלל',
    name_en: 'Hillel',
    search_he: ['הלל'],
    search_en: ['Hillel'],
    generation: 1,
    notes: 'Hillel the Elder'
  },
  {
    id: 'shammai',
    name_he: 'שמאי',
    name_en: 'Shammai',
    search_he: ['שמאי'],
    search_en: ['Shammai'],
    generation: 1,
    notes: 'Shammai the Elder'
  },
  {
    id: 'chachamim',
    name_he: 'חכמים',
    name_en: 'Chachamim',
    search_he: ['חכמים', 'וחכמים'],
    search_en: ['the Sages', 'the sages', 'the Rabbis', 'Sages'],
    generation: 0,
    notes: 'The Sages (collective)'
  },
  {
    id: 'rabban-gamliel',
    name_he: 'רבן גמליאל',
    name_en: 'Rabban Gamliel',
    search_he: ['רבן גמליאל'],
    search_en: ['Rabban Gamliel', 'Rabban Gamliel'],
    generation: 2,
    notes: ''
  },
  {
    id: 'ryb-zakkai',
    name_he: 'רבן יוחנן בן זכאי',
    name_en: 'Rabban Yochanan ben Zakkai',
    search_he: ['רבן יוחנן בן זכאי'],
    search_en: ['Rabban Yochanan ben Zakkai', 'Rabban Johanan ben Zakkai'],
    generation: 2,
    notes: ''
  },
  {
    id: 'r-eliezer',
    name_he: 'רבי אליעזר',
    name_en: 'Rabbi Eliezer',
    search_he: ['רבי אליעזר', "ר' אליעזר"],
    search_en: ['Rabbi Eliezer', 'R. Eliezer'],
    generation: 3,
    notes: 'Rabbi Eliezer ben Hyrcanus'
  },
  {
    id: 'r-yehoshua',
    name_he: 'רבי יהושע',
    name_en: 'Rabbi Yehoshua',
    search_he: ['רבי יהושע', "ר' יהושע"],
    search_en: ['Rabbi Yehoshua', 'R. Yehoshua', 'Rabbi Joshua'],
    generation: 3,
    notes: 'Rabbi Yehoshua ben Chanania'
  },
  {
    id: 'r-akiva',
    name_he: 'רבי עקיבא',
    name_en: 'Rabbi Akiva',
    search_he: ['רבי עקיבא', "ר' עקיבא", 'רבי עקיבה'],
    search_en: ['Rabbi Akiva', 'R. Akiva', 'Rabbi Aqiva', 'Rabbi Akiba'],
    generation: 3,
    notes: ''
  },
  {
    id: 'r-tarfon',
    name_he: 'רבי טרפון',
    name_en: 'Rabbi Tarfon',
    search_he: ['רבי טרפון', "ר' טרפון"],
    search_en: ['Rabbi Tarfon', 'R. Tarfon'],
    generation: 3,
    notes: ''
  },
  {
    id: 'r-yishmael',
    name_he: 'רבי ישמעאל',
    name_en: 'Rabbi Yishmael',
    search_he: ['רבי ישמעאל', "ר' ישמעאל"],
    search_en: ['Rabbi Yishmael', 'R. Yishmael', 'Rabbi Ishmael'],
    generation: 3,
    notes: ''
  },
  {
    id: 'r-elazar-azaryah',
    name_he: 'רבי אלעזר בן עזריה',
    name_en: 'Rabbi Elazar ben Azaryah',
    search_he: ['רבי אלעזר בן עזריה'],
    search_en: ['Rabbi Elazar ben Azaryah', 'Rabbi Eleazar ben Azariah'],
    generation: 3,
    notes: ''
  },
  {
    id: 'r-meir',
    name_he: 'רבי מאיר',
    name_en: 'Rabbi Meir',
    search_he: ['רבי מאיר', "ר' מאיר"],
    search_en: ['Rabbi Meir', 'R. Meir'],
    generation: 4,
    notes: ''
  },
  {
    id: 'r-yehuda',
    name_he: 'רבי יהודה',
    name_en: 'Rabbi Yehuda',
    search_he: ['רבי יהודה', "ר' יהודה"],
    search_en: ['Rabbi Yehuda', 'R. Yehuda', 'Rabbi Judah'],
    generation: 4,
    notes: 'Rabbi Yehuda bar Ilai'
  },
  {
    id: 'r-yose',
    name_he: 'רבי יוסי',
    name_en: 'Rabbi Yose',
    search_he: ['רבי יוסי', "ר' יוסי", 'רבי יוסה'],
    search_en: ['Rabbi Yose', 'R. Yose', 'Rabbi Yosi'],
    generation: 4,
    notes: 'Rabbi Yose ben Chalafta'
  },
  {
    id: 'r-shimon',
    name_he: 'רבי שמעון',
    name_en: 'Rabbi Shimon',
    search_he: ['רבי שמעון', "ר' שמעון"],
    search_en: ['Rabbi Shimon', 'R. Shimon', 'Rabbi Simeon'],
    generation: 4,
    notes: 'Rabbi Shimon bar Yochai'
  },
  {
    id: 'r-natan',
    name_he: 'רבי נתן',
    name_en: 'Rabbi Natan',
    search_he: ['רבי נתן', "ר' נתן"],
    search_en: ['Rabbi Natan', 'R. Natan', 'Rabbi Nathan'],
    generation: 4,
    notes: ''
  },
  {
    id: 'r-elazar',
    name_he: 'רבי אלעזר',
    name_en: 'Rabbi Elazar',
    search_he: ['רבי אלעזר', "ר' אלעזר"],
    search_en: ['Rabbi Elazar', 'R. Elazar', 'Rabbi Eleazar'],
    generation: 4,
    notes: 'Rabbi Elazar ben Shamua'
  },
  {
    id: 'r-yehuda-hanasi',
    name_he: 'רבי יהודה הנשיא',
    name_en: 'Rabbi Yehuda HaNasi',
    search_he: ['רבי יהודה הנשיא'],
    search_en: ['Rabbi Yehuda HaNasi', 'Rabbi Judah the Prince', 'Rabbi Judah HaNasi'],
    generation: 5,
    notes: 'Compiler of the Mishnah'
  },
  {
    id: 'r-shimon-ben-gamliel',
    name_he: 'רבן שמעון בן גמליאל',
    name_en: 'Rabban Shimon ben Gamliel',
    search_he: ['רבן שמעון בן גמליאל'],
    search_en: ['Rabban Shimon ben Gamliel', 'Rabban Simeon ben Gamaliel'],
    generation: 4,
    notes: ''
  },
  {
    id: 'r-chiya',
    name_he: 'רבי חייא',
    name_en: 'Rabbi Chiya',
    search_he: ['רבי חייא', "ר' חייא"],
    search_en: ['Rabbi Chiya', 'R. Chiya', 'Rabbi Hiyya'],
    generation: 5,
    notes: ''
  }
];

// ── Database (JSON file) ─────────────────────────────────────────────────────
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Failed to load database, starting fresh:', e.message);
  }
  return { tannaim: DEFAULT_TANNAIM, arguments: [], nextArgumentId: 1 };
}

function saveDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

let db = loadDb();
// Merge any new default tannaim that may have been added
const existingIds = new Set(db.tannaim.map(t => t.id));
for (const t of DEFAULT_TANNAIM) {
  if (!existingIds.has(t.id)) {
    db.tannaim.push(t);
  }
}
saveDb(db);

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Tanna routes ─────────────────────────────────────────────────────────────
app.get('/api/tannaim', (req, res) => {
  res.json(db.tannaim);
});

app.post('/api/tannaim', (req, res) => {
  const { id, name_he, name_en, search_he, search_en, generation, notes } = req.body;
  if (!id || !name_he || !name_en) {
    return res.status(400).json({ error: 'id, name_he and name_en are required' });
  }
  if (db.tannaim.find(t => t.id === id)) {
    return res.status(409).json({ error: 'Tanna with this id already exists' });
  }
  const tanna = {
    id,
    name_he,
    name_en,
    search_he: search_he || [name_he],
    search_en: search_en || [name_en],
    generation: generation || 0,
    notes: notes || ''
  };
  db.tannaim.push(tanna);
  saveDb(db);
  res.status(201).json(tanna);
});

app.put('/api/tannaim/:id', (req, res) => {
  const idx = db.tannaim.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Tanna not found' });
  db.tannaim[idx] = { ...db.tannaim[idx], ...req.body, id: req.params.id };
  saveDb(db);
  res.json(db.tannaim[idx]);
});

// ── Argument routes ───────────────────────────────────────────────────────────
app.get('/api/arguments', (req, res) => {
  let results = db.arguments;
  if (req.query.masechet) {
    results = results.filter(a => a.masechet_en === req.query.masechet);
  }
  if (req.query.tanna) {
    results = results.filter(a => a.tannaim_ids.includes(req.query.tanna));
  }
  if (req.query.tanna_pair) {
    const pair = req.query.tanna_pair.split(',');
    results = results.filter(a => pair.every(id => a.tannaim_ids.includes(id)));
  }
  res.json(results);
});

app.post('/api/arguments', (req, res) => {
  const { masechet_en, masechet_he, chapter, mishna, tannaim_ids, ref, description, label, text_he, text_en } = req.body;
  if (!masechet_en || !chapter || !mishna || !tannaim_ids || !ref) {
    return res.status(400).json({ error: 'masechet_en, chapter, mishna, tannaim_ids and ref are required' });
  }
  if (!Array.isArray(tannaim_ids) || tannaim_ids.length < 2) {
    return res.status(400).json({ error: 'tannaim_ids must be an array with at least 2 tannaim' });
  }
  const arg = {
    id: db.nextArgumentId++,
    masechet_en,
    masechet_he: masechet_he || '',
    chapter: Number(chapter),
    mishna: Number(mishna),
    tannaim_ids,
    ref,
    description: description || '',
    label: label || '',
    text_he: text_he || '',
    text_en: text_en || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  db.arguments.push(arg);
  saveDb(db);
  res.status(201).json(arg);
});

app.put('/api/arguments/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = db.arguments.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Argument not found' });
  db.arguments[idx] = { ...db.arguments[idx], ...req.body, id, updated_at: new Date().toISOString() };
  saveDb(db);
  res.json(db.arguments[idx]);
});

app.delete('/api/arguments/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = db.arguments.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Argument not found' });
  db.arguments.splice(idx, 1);
  saveDb(db);
  res.json({ success: true });
});

// ── Pairs route ───────────────────────────────────────────────────────────────
app.get('/api/pairs', (req, res) => {
  const pairMap = {};
  for (const arg of db.arguments) {
    const sorted = [...arg.tannaim_ids].sort();
    // Generate all 2-tanna combos from the argument
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const key = `${sorted[i]}|${sorted[j]}`;
        if (!pairMap[key]) {
          pairMap[key] = { tanna1: sorted[i], tanna2: sorted[j], count: 0, argument_ids: [] };
        }
        pairMap[key].count++;
        pairMap[key].argument_ids.push(arg.id);
      }
    }
    // Also record the full group if >2 tannaim
    if (sorted.length > 2) {
      const key = sorted.join('|');
      if (!pairMap[key]) {
        pairMap[key] = { group: sorted, count: 0, argument_ids: [] };
      }
      pairMap[key].count++;
      pairMap[key].argument_ids.push(arg.id);
    }
  }
  const pairs = Object.values(pairMap).sort((a, b) => b.count - a.count);
  res.json(pairs);
});

// ── Stats route ───────────────────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
  const masekhtot = [...new Set(db.arguments.map(a => a.masechet_en))];
  const tannaCounts = {};
  for (const arg of db.arguments) {
    for (const tid of arg.tannaim_ids) {
      tannaCounts[tid] = (tannaCounts[tid] || 0) + 1;
    }
  }
  res.json({
    total_arguments: db.arguments.length,
    total_tannaim: db.tannaim.length,
    masekhtot_covered: masekhtot.length,
    masekhtot,
    tanna_counts: tannaCounts
  });
});

// ── Sefaria proxy ─────────────────────────────────────────────────────────────
// Proxy Sefaria text API so the browser does not need direct internet access.
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'tannaim-app/1.0' } }, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Sample fallback data (Mishnah Berakhot ch.1, a few mishnayot) shown when
// the Sefaria network is unavailable.
const SAMPLE_DATA = {
  Mishnah_Berakhot: {
    heTitle: 'משנה ברכות',
    title: 'Mishnah Berakhot',
    he: [
      [
        'מֵאֵימָתַי קוֹרִין אֶת שְׁמַע בְּעַרְבִית? מִשָּׁעָה שֶׁהַכֹּהֲנִים נִכְנָסִין לֶאֱכֹל בִּתְרוּמָתָן, עַד סוֹף הָאַשְׁמוּרָה הָרִאשׁוֹנָה, דִּבְרֵי רַבִּי אֱלִיעֶזֶר. וַחֲכָמִים אוֹמְרִים: עַד חֲצוֹת. רַבָּן גַּמְלִיאֵל אוֹמֵר: עַד שֶׁיַּעֲלֶה עַמּוּד הַשַּׁחַר.',
        'הָיָה עוֹמֵד בִּתְפִלָּה וְנִזְכַּר שֶׁהוּא בַּעַל קֶרִי — לֹא יַפְסִיק, אֶלָּא יְקַצֵּר. יָרַד לִטְבֹּל — אִם יָכוֹל לַעֲלוֹת וּלְהִתְכַּסּוֹת וְלִקְרוֹת עַד שֶׁלֹּא תָּנֵץ הַחַמָּה — יַעֲלֶה וְיִתְכַּסֶּה וְיִקְרָא. וְאִם לָאו — יִתְכַּסֶּה בַּמַּיִם וְיִקְרָא.',
        'בֵּית שַׁמַּאי אוֹמְרִים: בָּעֶרֶב כָּל אָדָם יַטּוּ וְיִקְרְאוּ, וּבַבֹּקֶר יַעַמְדוּ, שֶׁנֶּאֱמַר: "וּבְשָׁכְבְּךָ וּבְקוּמֶךָ". בֵּית הִלֵּל אוֹמְרִים: כָּל אָדָם קוֹרֵא כְּדַרְכּוֹ, שֶׁנֶּאֱמַר: "וּבְלֶכְתְּךָ בַדֶּרֶךְ".',
        'בֵּית שַׁמַּאי אוֹמְרִים: בַּעֲרָבִים אָסוּר לְאָדָם לְהִתְפַּלֵּל עַד שֶׁיֵּצֵא מִלִּבּוֹ הֶחָמֵץ. בֵּית הִלֵּל מַתִּירִין.',
        'מִי שֶׁמֵּתוֹ מוּטָל לְפָנָיו פָּטוּר מִקְּרִיאַת שְׁמַע וּמִן הַתְּפִלָּה וּמִן הַתְּפִלִּין. נוֹשְׂאֵי הַמִּטָּה וְחִלּוּפֵיהֶן — אֵלּוּ שֶׁלִּפְנֵי הַמִּטָּה וְאֵלּוּ שֶׁלְּאַחַר הַמִּטָּה, בִּזְמַן שֶׁהַמִּטָּה צְרִיכָה לָהֶן — פְּטוּרִים. רַבִּי יְהוּדָה אוֹמֵר: אֵלּוּ שֶׁלְּאַחַר הַמִּטָּה — חַיָּבִין, מִפְּנֵי שֶׁאֵינָן צְרִיכִין.'
      ],
      [
        'הָיָה קוֹרֵא בַּתּוֹרָה וְהִגִּיעַ זְמַן הַמִּקְרָא — אִם כִּוֵּן לִבּוֹ יָצָא. רַבִּי מֵאִיר אוֹמֵר: אַף בִּסְכָּנָה אַל יַפְסִיק. רַבִּי יְהוּדָה אוֹמֵר: יַפְסִיק.',
        'פּוֹעֲלִים קוֹרִין בְּרֹאשׁ הָאִילָן אוֹ בְּרֹאשׁ הַנְּדַבָּה, מַה שֶּׁאֵינָן רַשָּׁאִין לַעֲשׂוֹת כֵּן בִּתְפִלָּה.',
        'הַחַתָּן פָּטוּר מִקְּרִיאַת שְׁמַע בַּלַּיְלָה הָרִאשׁוֹן עַד מוֹצָאֵי שַׁבָּת, אִם לֹא עָשָׂה מַעֲשֶׂה. מַעֲשֶׂה בְרַבָּן גַּמְלִיאֵל שֶׁקָּרָא בַּלַּיְלָה הָרִאשׁוֹן שֶׁנָּשָׂא. אָמְרוּ לוֹ תַּלְמִידָיו: לֹא לִמַּדְתָּנוּ, רַבֵּנוּ, שֶׁחָתָן פָּטוּר מִקְּרִיאַת שְׁמַע בַּלַּיְלָה הָרִאשׁוֹן? אָמַר לָהֶם: אֵינִי שׁוֹמֵעַ לָכֶם לְבַטֵּל הֵימֶנִּי הַמַּלְכוּת שָׁמַיִם אֲפִלּוּ שָׁעָה אַחַת.',
        'רָחַץ רַבָּן גַּמְלִיאֵל בַּלַּיְלָה הָרִאשׁוֹן שֶׁמֵּתָה אִשְׁתּוֹ. אָמְרוּ לוֹ תַּלְמִידָיו: לֹא לִמַּדְתָּנוּ, רַבֵּנוּ, שֶׁהָאָבֵל אָסוּר לִרְחֹץ? אָמַר לָהֶם: אֵינִי כִשְׁאָר כָּל הָאָדָם, קְפֵדָנִי אָנִי.'
      ],
      [
        'תְּפִלַּת הַשַּׁחַר — עַד חֲצוֹת. רַבִּי יְהוּדָה אוֹמֵר: עַד אַרְבַּע שָׁעוֹת. תְּפִלַּת הַמּוּסָף — כָּל הַיּוֹם. רַבִּי יְהוּדָה אוֹמֵר: עַד שֶׁבַע שָׁעוֹת.',
        'רַבִּי נְחֶמְיָה אוֹמֵר: עַד שְׁלֹשׁ שָׁעוֹת. רַבִּי עֲקִיבָא אוֹמֵר: עַד אַרְבַּע שָׁעוֹת.',
        'אֵין עוֹמְדִין לְהִתְפַּלֵּל אֶלָּא מִתּוֹךְ כֹּבֶד רֹאשׁ. חֲסִידִים הָרִאשׁוֹנִים הָיוּ שׁוֹהִין שָׁעָה אַחַת וּמִתְפַּלְּלִין, כְּדֵי שֶׁיְּכַוְּנוּ לִבָּם לַמָּקוֹם.',
        'רַבִּי אֱלִיעֶזֶר אוֹמֵר: הָעוֹשֶׂה תְּפִלָּתוֹ קֶבַע — אֵין תְּפִלָּתוֹ תַּחֲנוּנִים. רַבִּי יְהוֹשֻׁעַ אוֹמֵר: הַמְהַלֵּךְ בִּמְקוֹם סַכָּנָה, מִתְפַּלֵּל תְּפִלָּה קְצָרָה.',
        'רַבִּי אֱלִיעֶזֶר אוֹמֵר: אַל תַּעַשׂ תְּפִלָּתְךָ קֶבַע, אֶלָּא רַחֲמִים וְתַחֲנוּנִים לִפְנֵי הַמָּקוֹם, שֶׁנֶּאֱמַר: "כִּי חַנּוּן וְרַחוּם הוּא".'
      ]
    ],
    en: [
      [
        'From when may one recite the Shema in the evening? From the time when the priests enter to eat their teruma until the end of the first watch, these are the words of Rabbi Eliezer. And the Sages say: Until midnight. Rabban Gamliel says: Until dawn.',
        'One who was standing in prayer and remembered that he was ritually impure — he should not interrupt, but rather abbreviate the prayer.',
        'Beit Shammai say: In the evening everyone should recline and recite [the Shema], and in the morning everyone should stand, as it is stated: "when you lie down and when you rise." Beit Hillel say: Everyone recites in their own manner, as it is stated: "when you walk along the way."',
        'Beit Shammai say: In the evenings a person is forbidden to pray until the leaven has departed from his heart. Beit Hillel permit it.',
        'One whose deceased relative lies before him is exempt from reciting the Shema, from prayer, and from tefillin. The pallbearers and their replacements — those before the bier and those after the bier — when the bier requires them, are exempt. Rabbi Yehuda says: those after the bier are obligated, as they are not needed.'
      ],
      [
        'If one was reading the Torah and the time to recite [the Shema] arrived — if he directed his heart, he has fulfilled his obligation. Rabbi Meir says: Even in a time of danger he should not interrupt. Rabbi Yehuda says: He should interrupt.',
        'Laborers may recite [the Shema] at the top of a tree or at the top of a scaffold, something they are not permitted to do while praying.',
        'The groom is exempt from reciting the Shema on the first night [of his marriage] until after the Shabbat following the wedding, if he has not yet consummated the marriage.',
        'Rabban Gamliel bathed on the first night after his wife died. His students said to him: Have you not taught us that a mourner is forbidden to bathe? He said to them: I am not like other people — I am delicate.'
      ],
      [
        'The morning prayer may be recited until midday. Rabbi Yehuda says: Until four hours. The Musaf prayer may be recited all day. Rabbi Yehuda says: Until seven hours.',
        'Rabbi Nechemia says: Until three hours. Rabbi Akiva says: Until four hours.',
        'One may only stand to pray from a state of solemn reverence. The early pious ones would wait one hour and then pray, in order to direct their hearts toward God.',
        'Rabbi Eliezer says: One who makes his prayer fixed — his prayer is not supplication. Rabbi Yehoshua says: One who walks in a dangerous place recites an abbreviated prayer.',
        'Rabbi Eliezer says: Do not make your prayer fixed, but rather a plea for mercy and supplication before God, as it is stated: "For He is gracious and merciful."'
      ]
    ]
  }
};

app.get('/api/sefaria/:ref(*)', async (req, res) => {
  const ref = req.params.ref;
  // Security: only allow alphanumeric, underscores, hyphens, dots
  if (!/^[\w._-]+$/.test(ref)) {
    return res.status(400).json({ error: 'Invalid reference' });
  }

  // Check if we have local sample data
  const sampleKey = ref.split('.')[0]; // e.g. "Mishnah_Berakhot"
  const hasSample = Object.prototype.hasOwnProperty.call(SAMPLE_DATA, sampleKey);

  const url = `https://www.sefaria.org/api/texts/${ref}?lang=bi&commentary=0&context=0`;
  try {
    const body = await httpsGet(url);
    const data = JSON.parse(body);
    res.json(data);
  } catch (e) {
    console.warn(`Sefaria proxy failed for ${ref}: ${e.message}. Using sample data if available.`);
    if (hasSample) {
      res.json(SAMPLE_DATA[sampleKey]);
    } else {
      res.status(502).json({ error: 'Could not reach Sefaria API and no sample data available', detail: e.message });
    }
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Tannaim app running at http://localhost:${PORT}`);
});
