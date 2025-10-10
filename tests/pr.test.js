const fs = require('fs-extra');
const path = require('path');
const test = require('ava');

const trustedPath = path.join(__dirname, '../util/trusted.json');
const trusted = JSON.parse(fs.readFileSync(trustedPath, 'utf8'));

const prAuthor = process.env.PR_AUTHOR;
const prAuthorId = Number(process.env.PR_AUTHOR_ID);

const isTrusted = trusted.some(
  entry =>
    entry.username === prAuthor ||
    entry.id === prAuthorId
);

const changedFiles = JSON.parse(process.env.CHANGED_FILES);
const deletedFiles = JSON.parse(process.env.DELETED_FILES);

const changedJSONFiles = changedFiles
    .filter((file) => file.startsWith("contributors/"))
    .map((file) => path.basename(file));
const deletedJSONFiles = deletedFiles
    .filter((file) => file.name.startsWith("contributors/"))
    .map((file) => path.basename(file.name));

test.before(t => {
  if (!changedJSONFiles && !deletedFiles){
    t.fail(': no file changes');
    t.log(': no file changes');
    console.log(': no file changes');
    return;
  }
   if (isTrusted) {
      console.log(`Skipping test: ${prAuthor} is trusted`); 
      t.log(`Skipping test: ${prAuthor} is trusted`); 
     t.pass();
     return;
    }
});

function getContributorData(contributor) {
    try {
        const data = fs.readJsonSync(path.join(path.resolve("contributors"), `${contributor}.json`));
        return data;
    } catch (error) {
        throw new Error(`Failed to read JSON for ${contributor}: ${error.message}`);
    }
}

test("Users can only update their own contribution", (t) => {

    changedJSONFiles.forEach((file) => {
        const contributor = file.replace(/\.json$/, "");
        const data = getContributorData(contributor);

        t.true(
            contributor === prAuthor,
            `${file}: ${prAuthor} is not authorized to update ${contributor}.json`
        );
            
    });

    deletedJSONFiles.forEach((file) => {
      const contributor = file.replace(/\.json$/, "");
      const data = JSON.parse(
          deletedFiles
              .find((f) => f.name === `contributors/${file}`)
              .data.split("\n")
              .filter((line) => line.startsWith("-") && !line.startsWith("---"))
              .map((line) => line.substring(1))
              .join("\n")
      );

      t.true(
          contributor === prAuthor,
          `${file}: ${prAuthor} is not authorized to delete ${contributor}.json`
      );
      
  });

t.pass();
});

test("JSON files should only be in contributors", (t) => {
  let isNot=false;
  changedFiles.forEach((file)=>{
    if (!file.startsWith("contributors/")){
      isNot=true;
    }
  });
  t.false(isNot, "JSON files should not be in the root directory");
});
