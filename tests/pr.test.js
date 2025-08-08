const t = require("ava");
const fs = require("fs-extra");
const path = require("path");

const requiredEnvVars = ["PR_AUTHOR", "PR_AUTHOR_ID"];

function getContributorData(contributor) {
    try {
        const data = fs.readJsonSync(path.join(path.resolve("contributors"), `${contributor}.json`));
        return data;
    } catch (error) {
        throw new Error(`Failed to read JSON for ${contributor}: ${error.message}`);
    }
}

t("Users can only update their own contribution", (t) => {
    if (requiredEnvVars.every((v) => process.env[v])) {
        const changedFiles = JSON.parse(process.env.CHANGED_FILES);
        const deletedFiles = JSON.parse(process.env.DELETED_FILES);
        const prAuthor = process.env.PR_AUTHOR.toLowerCase();
        const prAuthorId = process.env.PR_AUTHOR_ID;

        const changedJSONFiles = changedFiles
            .filter((file) => file.startsWith("contributors/"))
            .map((file) => path.basename(file));
        const deletedJSONFiles = deletedFiles
            .filter((file) => file.name.startsWith("contributors/"))
            .map((file) => path.basename(file.name));

        if (!changedJSONFiles && !deletedFiles) return t.pass();
        if (process.env.PR_LABELS && process.env.PR_LABELS.includes("ci: bypass-owner-check")) return t.pass();

        changedJSONFiles.forEach((file) => {
            const contributor = file.replace(/\.json$/, "");
            const data = getContributorData(contributor);

            t.true(
                contributor === prAuthor || trusted.includes(prAuthorId),
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
                contributor === prAuthor || trusted.includes(prAuthorId),
                `${file}: ${prAuthor} is not authorized to delete ${contributor}.json`
            );
            
        });
    }

    t.pass();
});