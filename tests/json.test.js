const fs = require('fs-extra');
const path = require('path');
const test = require('ava');


const trustedPath = path.join(__dirname, '../util/trusted.json');
const trusted = JSON.parse(fs.readFileSync(trustedPath, 'utf8'));

const prAuthor = process.env.PR_AUTHOR;
const prAuthorId = Number(process.env.PR_AUTHOR_ID) ;

const isTrusted = trusted.some(
  entry =>
    entry.username === prAuthor ||
    entry.id === prAuthorId
);

const changedFiles = JSON.parse(process.env.CHANGED_FILES);

const ignoredRootJSONFiles = ["package-lock.json", "package.json"];

const requiredFields = {
    owner: "object",
    description: "string"
};

const optionalFields = {
    use_github_avatar: "boolean",
    custom_avatar_url: "string",
    display_float_text: "string",
    my_top_resources: "object",
    social: "object"
};

const requiredOwnerFields = {
    name: "string"
};

const optionalOwnerFields = {
    email: "string",
    github: "string"
};

const optionalRedirectConfigFields = {
    custom_paths: "object",
    redirect_paths: "boolean"
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const contributorsPath = path.resolve("contributors");

function findDuplicateKeys(jsonString) {
    const duplicateKeys = new Set();
    const keyStack = [];

    const keyRegex = /"(.*?)"\s*:/g;

    let i = 0;
    while (i < jsonString.length) {
        const char = jsonString[i];

        if (char === "{") {
            keyStack.push({});
            i++;
            continue;
        }

        if (char === "}") {
            keyStack.pop();
            i++;
            continue;
        }

        keyRegex.lastIndex = i;
        const match = keyRegex.exec(jsonString);
        if (match && match.index === i && keyStack.length > 0) {
            const key = match[1];
            const currentScope = keyStack[keyStack.length - 1];

            if (currentScope[key]) {
                duplicateKeys.add(key);
            } else {
                currentScope[key] = true;
            }

            i = keyRegex.lastIndex;
        } else {
            i++;
        }
    }

    return [...duplicateKeys];
}

async function validateFields(t, obj, fields, file, prefix = "") {
    for (const key of Object.keys(fields)) {
        const fieldPath = prefix ? `${prefix}.${key}` : key;

        if (obj.hasOwnProperty(key)) {
            t.is(typeof obj[key], fields[key], `${file}: Field ${fieldPath} should be of type ${fields[key]}`);
        } else if (fields === requiredFields || fields === requiredOwnerFields) {
            t.true(false, `${file}: Missing required field: ${fieldPath}`);
        }
    }
}

async function validateFileName(t, file) {
    if(file === '__TEMPLATE__')
        return;
    t.true(file.endsWith(".json"), `${file}: File does not have .json extension`);
    t.true(file === file.toLowerCase(), `${file}: File name should be all lowercase`);
    t.false(file.includes("--"), `${file}: File name should not contain consecutive hyphens`);

    const contributor = file.replace(/\.json$/, "");

}

async function processFile(file, t) {
    // const filePath = path.join(contributorsPath, file);
    const data = await fs.readJson(file);

    // validateFileName(t, file);

    // Check for duplicate keys
    const rawData = await fs.readFile(file, "utf8");
    const duplicateKeys = findDuplicateKeys(rawData);
    t.true(!duplicateKeys.length, `${file}: Duplicate keys found: ${duplicateKeys.join(", ")}`);

    // Validate fields
    validateFields(t, data, requiredFields, file);
    validateFields(t, data.owner, requiredOwnerFields, file, "owner");
    validateFields(t, data.owner, optionalOwnerFields, file, "owner");
    validateFields(t, data, optionalFields, file);

    // name validation
    t.true(data.owner.name.length > 0 && data.owner.name.length <= 32, `${file}: Owner name should be between 1 and 32 characters long`);

    // email validation
    if (data.owner.email) {
        t.regex(data.owner.email, emailRegex, `${file}: Owner email should be a valid email address`);
        t.false(
            data.owner.email.endsWith("@users.noreply.github.com"),
            `${file}: Owner email should not be a GitHub no-reply email`
        );
    }

    //github validation
    if (data.owner.github) {
        t.true(data.owner.github.length > 0 && data.owner.github.length <= 32, `${file}: Owner GitHub username should be between 1 and 32 characters long`);
        t.regex(data.owner.github, /^[a-zA-Z0-9-]+$/, `${file}: Owner GitHub username should only contain alphanumeric characters and hyphens`);
    }

    // social validation
    if (data.social) {
        t.true(Object.keys(data.social) <= 5, `${file}: Maximum of 5 social links allowed`);
        for (const key of Object.keys(data.social)) {
            t.true(typeof data.social[key] === "string", `${file}: social.${key} should be a string`);
            t.true(data.social[key].startsWith("http"), `${file}: social.${key} should be a valid URL`);
        }
    }

    //my_top_resources validation
    if (data.my_top_resources) {
        t.true(Object.keys(data.my_top_resources).length <= 5, `${file}: Maximum of 5 my_top_resources allowed`);
        for (const key of Object.keys(data.my_top_resources)) {
            t.true(typeof data.my_top_resources[key] === "string", `${file}: my_top_resources.${key} should be a string`);
            t.true(data.my_top_resources[key].startsWith("http"), `${file}: my_top_resources.${key} should be a valid URL`);
        }
    }

    // use_github_avatar validation
    if (!data.use_github_avatar) {
        t.true(data.custom_avatar_url && data.custom_avatar_url.length > 0, `${file}: custom_avatar_url should be provided when use_github_avatar is false`);
        t.true(data.custom_avatar_url.startsWith("http"), `${file}: custom_avatar_url should be a valid URL`);
    }
    
    // display float text validation
    if(data.display_float_text){
        t.true(data.display_float_text.length > 0 && data.display_float_text <= 16, `${file}: Display float text should have between 1 and 16 entries`);
    }
}

const profanityWords = fs.readFileSync(
  path.join(__dirname, '../util/profanity_wordlist.txt'),
  'utf8'
).split('\n').map(w => w.trim()).filter(Boolean);

function containsProfanity(str) {
  if (!str || typeof str !== 'string') return false;
  return profanityWords.some(word =>
    str.toLowerCase().includes(word.toLowerCase())
  );
}


// global before test
test.before(t => {
  if(!changedFiles){
    console.log(`no changed File`);
    t.log(`n changed File`);
    t.fail(': no File Changes/Modification');
    return;
  }
  if (isTrusted) {
    console.log(`Skipping test: ${prAuthor} is trusted`);
    t.log(`Skipping test: ${prAuthor} is trusted`);
    t.pass();
    return;
 }
});

test("All files should be valid JSON", async (t) => {
    await Promise.all(
        changedFiles.map((file) => {
            return t.notThrows(() => fs.readJson(file), `${file}: Invalid JSON file`);
        })
    );
});

test("All files should have valid file names", async (t) => {
    await Promise.all(changedFiles.map((file) => validateFileName(t, path.basename(file))));
});

test("All files should have valid required and optional fields", async (t) => {
    await Promise.all(changedFiles.map((file) => processFile(file, t)));
});


test('No profanity in contributor JSON', async t => {
  if(process.env.PR_LABELS && process.env.PR_LABELS.includes("false-positive"))
  {
    t.pass();
  }
  for (const file of changedFiles) {
    // const filePath = path.join(contributorsPath, file);
    const data = await fs.readJson(file);

    // Check all string fields in root and owner
    for (const key of Object.keys(data)) {
      if (typeof data[key] === 'string' && containsProfanity(data[key])) {
        t.fail(`${file}: Profanity found in field ${key}`);
      }
    }
    if (data.owner) {
      for (const key of Object.keys(data.owner)) {
        if (typeof data.owner[key] === 'string' && containsProfanity(data.owner[key])) {
          t.fail(`${file}: Profanity found in owner.${key}`);
        }
      }
    }
    // Check socials and my_top_resources
    ['social', 'my_top_resources'].forEach(field => {
      if (data[field]) {
        for (const key of Object.keys(data[field])) {
          if (typeof data[field][key] === 'string' && containsProfanity(data[field][key])) {
            t.fail(`${file}: Profanity found in ${field}.${key}`);
          }
        }
      }
    });
    t.pass();
  }
});
