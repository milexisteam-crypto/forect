import { exec } from "child_process"
import fs from "fs"
const version = fs.readFileSync("./version", "utf-8")
let packagejson = JSON.parse(fs.readFileSync("./package.json"))
packagejson.version = version
fs.writeFileSync("./package.json", JSON.stringify(packagejson, null, 2))
exec("git add .", (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error);
    return;
  }

  if (stderr) {
    console.error("stderr:", stderr);
    return;
  }

  console.log("stdout:", stdout);
});

exec(`git commit -m"${version}"`, (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error);
    return;
  }

  if (stderr) {
    console.error("stderr:", stderr);
    return;
  }

  console.log("stdout:", stdout);
});
exec(`npm publish --tag ${fs.readFileSync("./tag")}`, (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error);
    return;
  }

  if (stderr) {
    console.error("stderr:", stderr);
    return;
  }

  console.log("stdout:", stdout);
});
